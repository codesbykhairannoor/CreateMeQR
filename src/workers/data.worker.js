self.onmessage = (e) => {
  const { qrType, qrData } = e.data;
  let dataString = '';

  try {
    if (qrType === 'url') {
      dataString = qrData.url || 'https://createmy-qr.com';
    } else if (qrType === 'wifi') {
      const ssid = qrData.ssid || '';
      const pass = qrData.password || '';
      const enc = qrData.encryption || 'WPA';
      dataString = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    } else if (qrType === 'vcard') {
      const { firstName = '', lastName = '', phone = '', email = '' } = qrData;
      dataString = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\nTEL;TYPE=CELL:${phone}\nEMAIL;TYPE=WORK:${email}\nEND:VCARD`;
    } else if (qrType === 'text') {
      dataString = qrData.text || 'Hello World';
    } else if (qrType === 'email') {
      dataString = `MATMSG:TO:${qrData.emailTo || ''};SUB:${qrData.emailSubject || ''};BODY:${qrData.emailBody || ''};;`;
    } else if (qrType === 'phone') {
      dataString = `tel:${qrData.phoneNumber || ''}`;
    } else if (qrType === 'sms') {
      dataString = `smsto:${qrData.smsNumber || ''}:${qrData.smsMessage || ''}`;
    } else if (qrType === 'location') {
      dataString = `geo:${qrData.lat || '0'},${qrData.lng || '0'}`;
    } else if (qrType === 'event') {
      const formatTime = (t) => t ? t.replace(/[-:]/g, '') + '00Z' : '';
      dataString = `BEGIN:VEVENT\nSUMMARY:${qrData.eventTitle || ''}\nLOCATION:${qrData.eventLocation || ''}\nDTSTART:${formatTime(qrData.eventStart)}\nDTEND:${formatTime(qrData.eventEnd)}\nEND:VEVENT`;
    } else if (qrType === 'whatsapp') {
      const cleanNumber = (qrData.waNumber || '').replace(/[^0-9]/g, '');
      const encodedMsg = encodeURIComponent(qrData.waMessage || '');
      dataString = `https://wa.me/${cleanNumber}${encodedMsg ? '?text=' + encodedMsg : ''}`;
    } else if (qrType === 'youtube') {
      dataString = qrData.youtubeUrl || 'https://youtube.com/';
    } else if (qrType === 'instagram') {
      const cleanUsername = (qrData.igUsername || '').replace(/^@/, '');
      dataString = `https://instagram.com/${cleanUsername}`;
    } else if (qrType === 'appstore') {
      dataString = qrData.appStoreUrl || 'https://play.google.com/store';
    } else if (qrType === 'crypto') {
      const coinMap = {
        bitcoin: 'bitcoin',
        ethereum: 'ethereum',
        bitcoincash: 'bitcoincash',
        litecoin: 'litecoin',
        dash: 'dash'
      };
      const protocol = coinMap[qrData.cryptoCoin || 'bitcoin'];
      dataString = `${protocol}:${qrData.cryptoAddress || ''}${qrData.cryptoAmount ? '?amount=' + qrData.cryptoAmount : ''}`;
    } else if (qrType === 'facebook') {
      const u = (qrData.facebookInput || '').replace(/^@/, '').replace(/.*\//, '');
      dataString = `https://facebook.com/${u}`;
    } else if (qrType === 'twitter') {
      const u = (qrData.twitterInput || '').replace(/^@/, '').replace(/.*\//, '');
      dataString = `https://twitter.com/${u}`;
    } else if (qrType === 'tiktok') {
      const u = (qrData.tiktokInput || '').replace(/^@/, '').replace(/.*\//, '');
      dataString = `https://tiktok.com/@${u}`;
    } else if (qrType === 'linkedin') {
      const u = (qrData.linkedinInput || '').replace(/.*\//, '');
      dataString = `https://linkedin.com/in/${u}`;
    } else if (qrType === 'telegram') {
      const cleanUser = (qrData.telegramInput || '').replace(/^@/, '');
      dataString = `https://t.me/${cleanUser}`;
    } else if (qrType === 'snapchat') {
      const cleanUser = (qrData.snapchatInput || '').replace(/^@/, '');
      dataString = `https://snapchat.com/add/${cleanUser}`;
    } else if (qrType === 'discord') {
      dataString = qrData.discordInput || 'https://discord.com/';
    } else if (qrType === 'spotify') {
      dataString = qrData.spotifyInput || 'https://spotify.com/';
    } else if (qrType === 'paypal') {
      const cleanUser = (qrData.paypalInput || '').replace(/^@/, '');
      dataString = `https://paypal.me/${cleanUser}`;
    } else if (qrType === 'venmo') {
      const cleanUser = (qrData.venmoInput || '').replace(/^@/, '');
      dataString = `venmo://paycharge?txn=pay&recipients=${cleanUser}`;
    } else if (['pdf', 'gforms', 'greview', 'image', 'linkinbio', 'video', 'audio', 'amazon', 'booking', 'file'].includes(qrType)) {
      dataString = qrData[`${qrType}Input`] || 'https://createmy-qr.com';
    } else if (qrType === 'github') {
      const u = (qrData.githubInput || '').replace(/.*\//, '');
      dataString = `https://github.com/${u}`;
    } else if (qrType === 'twitch') {
      const u = (qrData.twitchInput || '').replace(/.*\//, '');
      dataString = `https://twitch.tv/${u}`;
    } else if (qrType === 'pinterest') {
      const u = (qrData.pinterestInput || '').replace(/.*\//, '');
      dataString = `https://pinterest.com/${u}`;
    } else if (qrType === 'viber') {
      const cleanNumber = (qrData.viberInput || '').replace(/[^0-9]/g, '');
      dataString = `viber://chat?number=${cleanNumber}`;
    } else if (qrType === 'line') {
      const u = (qrData.lineInput || '').replace(/^@/, '');
      dataString = `https://line.me/R/ti/p/~${u}`;
    } else if (qrType === 'skype') {
      dataString = `skype:${qrData.skypeInput || ''}?chat`;
    }

    self.postMessage({ success: true, dataString });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
