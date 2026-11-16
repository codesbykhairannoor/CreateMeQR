import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function base64url(obj) {
  const str = typeof obj === 'string' ? obj : JSON.stringify(obj);
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT env:', e);
    }
  }

  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    return {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.FIREBASE_PROJECT_ID || 'thismyown',
    };
  }

  try {
    const rootDir = process.cwd();
    const files = fs.readdirSync(rootDir);
    const candidate = files.find(
      (f) =>
        (f.includes('thismyown') || f.includes('firebase-adminsdk')) &&
        f.endsWith('.json')
    );
    if (candidate) {
      return JSON.parse(fs.readFileSync(path.join(rootDir, candidate), 'utf8'));
    }
  } catch (err) {
    // Ignore in production
  }

  return null;
}

async function getGoogleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/firebase',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const signInput = `${base64url(header)}.${base64url(claim)}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = signer
    .sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || tokenData.error || 'Failed to obtain Google access token');
  }

  return tokenData.access_token;
}

async function getRawBody(req) {
  if (typeof req.body === 'string') return req.body;
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body);
  }
  return new Promise((resolve) => {
    let data = '';
    req.on?.('data', (chunk) => {
      data += chunk;
    });
    req.on?.('end', () => {
      resolve(data);
    });
    if (!req.on) {
      resolve('');
    }
  });
}

function sendJson(res, statusCode, payload) {
  if (typeof res.status === 'function') {
    return res.status(statusCode).json(payload);
  }
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  return res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers?.['x-signature'] || '';
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && signature) {
      const hmac = crypto.createHmac('sha256', webhookSecret);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
        return sendJson(res, 401, { error: 'Invalid webhook signature' });
      }
    }

    const payload = JSON.parse(rawBody || '{}');
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const attributes = payload.data?.attributes || {};
    const userId = customData.user_id;
    const customerEmail = attributes.user_email || attributes.customer_email;
    const orderStatus = attributes.status;

    console.log(`[LemonSqueezy Webhook] Event: ${eventName}, User: ${userId || customerEmail}, Status: ${orderStatus}`);

    // Check if event signifies a successful payment or subscription activation
    const isSuccess =
      eventName === 'order_created' ||
      eventName === 'subscription_created' ||
      eventName === 'subscription_payment_success';

    if (isSuccess && (orderStatus === 'paid' || orderStatus === 'active' || !orderStatus)) {
      const serviceAccount = getServiceAccount();

      if (serviceAccount && userId) {
        const accessToken = await getGoogleAccessToken(serviceAccount);
        const projectId = serviceAccount.project_id || 'thismyown';

        // Update Firestore users/{userId} document
        const updateUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${userId}?updateMask.fieldPaths=plan&updateMask.fieldPaths=subscriptionStatus&updateMask.fieldPaths=suiteAccess`;

        await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            fields: {
              plan: { stringValue: 'pro' },
              subscriptionStatus: { stringValue: 'active' },
              suiteAccess: { stringValue: 'all_access' },
            },
          }),
        });

        console.log(`[LemonSqueezy Webhook] Successfully activated PRO status for user ${userId}`);
      }

      // Send thank you confirmation email via Resend if email is available
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey && customerEmail) {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to CreateMy-QR Pro Lifetime</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 36px; text-align: left;">
          <tr>
            <td style="padding-bottom: 20px;">
              <img src="https://createmy-qr.com/logoqr.png" alt="CreateMy-QR" width="36" height="36" style="border-radius: 8px;" />
              <span style="font-size: 20px; font-weight: 700; color: #0f172a; margin-left: 10px; vertical-align: middle;">CreateMy<span style="color: #2563eb;">-QR</span></span>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 0;">🎉 You are now a PRO Member!</h1>
              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                Thank you for purchasing the <strong>Founder Lifetime Pass</strong>. Your lifetime access is now fully activated across the Privacy Suite!
              </p>
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; color: #1e40af;">
                  ✨ Included in your All-In-One Privacy Suite:
                </p>
                <ul style="margin: 8px 0 0 16px; padding: 0; font-size: 13px; color: #1d4ed8; line-height: 1.6;">
                  <li><strong>CreateMy-QR</strong> — Custom Vector QR & Barcode Studio (Bulk & Print PDF)</li>
                  <li><strong>HelpMyIMG</strong> — In-Browser AI Image Studio (Unlimited 4K)</li>
                  <li><strong>HandleMyFile</strong> — Privacy-First PDF & Document Tools</li>
                  <li><strong>SolveMyMedia</strong> — Zero-Upload Video & Audio Compressor</li>
                </ul>
              </div>
              <p style="font-size: 14px; color: #475569;">
                All tools run 100% locally in your browser with zero server uploads. Your privacy is permanently protected.
              </p>
              <div style="padding-top: 16px;">
                <a href="https://createmy-qr.com" style="display: inline-block; padding: 12px 28px; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 10px;">
                  Open Studio &rarr;
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'CreateMy-QR <onboarding@resend.dev>',
            to: [customerEmail],
            subject: '🎉 Welcome to CreateMy-QR Pro (All-Access Lifetime Pass Active!)',
            html: emailHtml,
          }),
        }).catch((e) => console.error('[LemonSqueezy Webhook] Failed to send welcome email:', e));
      }
    }

    return sendJson(res, 200, { received: true, event: eventName });
  } catch (err) {
    console.error('[LemonSqueezy Webhook] Error:', err);
    return sendJson(res, 500, { error: err.message || 'Internal webhook error' });
  }
}
