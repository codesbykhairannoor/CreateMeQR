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

  // Local file search in root directory for local dev
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
    // Silent in production
  }

  return null;
}

async function getGoogleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/firebase',
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

async function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on?.('data', (chunk) => {
      data += chunk;
    });
    req.on?.('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
    if (!req.on) {
      resolve({});
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
  // CORS preflight
  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      res.setHeader?.('Access-Control-Allow-Origin', '*');
      res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(204).end();
    }
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await parseRequestBody(req);
    const email = body.email;
    const origin = body.origin;

    if (!email || typeof email !== 'string') {
      return sendJson(res, 400, { error: 'Valid email is required' });
    }

    const serviceAccount = getServiceAccount();
    if (!serviceAccount) {
      console.error('[Reset Password] Service account not found');
      return sendJson(res, 500, { error: 'Firebase Admin credentials not found' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('[Reset Password] RESEND_API_KEY environment variable is not set');
      return sendJson(res, 500, { error: 'Email service is not configured' });
    }

    // 1. Get Google OAuth access token
    const accessToken = await getGoogleAccessToken(serviceAccount);

    // 2. Request password reset code from Firebase Identity Toolkit API
    const projectId = serviceAccount.project_id || 'thismyown';
    const oobRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:sendOobCode`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: email.trim(),
          returnOobLink: true,
        }),
      }
    );

    const oobData = await oobRes.json();
    if (!oobRes.ok || !oobData.oobCode) {
      console.error('[Reset Password] Failed to generate reset code:', oobData);
      const msg = oobData.error?.message;
      if (msg === 'RESET_PASSWORD_EXCEED_LIMIT') {
        return sendJson(res, 429, {
          error: 'Too many password reset requests. Please wait a few minutes before trying again.',
        });
      }
      if (!oobData.oobCode && !msg) {
        return sendJson(res, 404, {
          error: 'No account found with this email address.',
        });
      }
      return sendJson(res, oobRes.status || 400, {
        error: msg || 'Failed to generate reset code',
      });
    }

    const targetOrigin = origin ? origin.replace(/\/+$/, '') : 'https://createmy-qr.com';
    const apiKey =
      (oobData.oobLink && new URL(oobData.oobLink).searchParams.get('apiKey')) ||
      process.env.VITE_FIREBASE_API_KEY ||
      '';

    // Direct in-app link to CreateMy-QR with password reset params
    const directResetLink = `${targetOrigin}/?mode=resetPassword&oobCode=${oobData.oobCode}&apiKey=${apiKey}`;

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your CreateMy-QR password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 480px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); text-align: left;">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img src="https://createmy-qr.com/logoqr.png" alt="CreateMy-QR" width="36" height="36" style="display: block; width: 36px; height: 36px; border-radius: 8px; object-fit: contain;" />
                  </td>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 19px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px;">CreateMy<span style="color: #2563eb;">-QR</span></span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding-bottom: 16px;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a; line-height: 1.3;">Reset your password</h1>
            </td>
          </tr>

          <!-- Body Description -->
          <tr>
            <td style="padding-bottom: 28px; font-size: 14px; line-height: 1.6; color: #475569;">
              We received a request to reset the password for your CreateMy-QR account associated with <strong style="color: #0f172a;">${email.trim()}</strong>.
              <br><br>
              Click the button below to choose a new password:
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding-bottom: 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 10px; background-color: #0f172a;">
                    <a href="${directResetLink}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 10px; background-color: #0f172a; letter-spacing: -0.1px;">
                      Reset password
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Fallback Link -->
          <tr>
            <td style="padding-bottom: 24px; font-size: 12px; line-height: 1.5; color: #64748b;">
              If the button doesn't work, copy and paste this link into your browser:
              <br>
              <a href="${directResetLink}" target="_blank" style="color: #2563eb; word-break: break-all; text-decoration: underline;">
                ${directResetLink}
              </a>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 12px; line-height: 1.5; color: #94a3b8;">
              This link is valid for 1 hour. If you didn't request a password reset, you can safely ignore this email.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 3. Send email via Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'CreateMy-QR <onboarding@resend.dev>',
        to: [email.trim()],
        subject: 'Reset your CreateMy-QR password',
        html: emailHtml,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error('[Reset Password] Resend error:', resendData);
      return sendJson(res, 500, { error: 'Failed to send reset email' });
    }

    return sendJson(res, 200, { success: true, message: 'Password reset link sent' });
  } catch (err) {
    console.error('[Reset Password] Internal handler error:', err);
    return sendJson(res, 500, { error: err.message || 'Internal server error' });
  }
}
