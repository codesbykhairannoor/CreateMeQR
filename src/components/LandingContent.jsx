import React from 'react';
import LayoutURL from './landing/LayoutURL';
import LayoutWiFi from './landing/LayoutWiFi';
import LayoutVCard from './landing/LayoutVCard';
import LayoutText from './landing/LayoutText';
import LayoutEmail from './landing/LayoutEmail';
import LayoutSMS from './landing/LayoutSMS';
import LayoutLocation from './landing/LayoutLocation';
import LayoutPhone from './landing/LayoutPhone';
import LayoutEvent from './landing/LayoutEvent';
import LayoutWhatsApp from './landing/LayoutWhatsApp';
import LayoutYouTube from './landing/LayoutYouTube';
import LayoutInstagram from './landing/LayoutInstagram';
import LayoutCrypto from './landing/LayoutCrypto';
import LayoutAppStore from './landing/LayoutAppStore';
import LayoutFacebook from './landing/LayoutFacebook';
import LayoutTwitter from './landing/LayoutTwitter';
import LayoutTikTok from './landing/LayoutTikTok';
import LayoutLinkedIn from './landing/LayoutLinkedIn';
import LayoutTelegram from './landing/LayoutTelegram';
import LayoutSnapchat from './landing/LayoutSnapchat';
import LayoutDiscord from './landing/LayoutDiscord';
import LayoutSpotify from './landing/LayoutSpotify';
import LayoutPaypal from './landing/LayoutPaypal';
import LayoutVenmo from './landing/LayoutVenmo';

function LandingContent({ qrType = 'url' }) {
  // Return the specific, unique layout for each tool
  switch (qrType) {
    case 'url':
      return <LayoutURL qrType={qrType} />;
    case 'wifi':
      return <LayoutWiFi qrType={qrType} />;
    case 'vcard':
      return <LayoutVCard qrType={qrType} />;
    case 'text':
      return <LayoutText qrType={qrType} />;
    case 'email':
      return <LayoutEmail qrType={qrType} />;
    case 'sms':
      return <LayoutSMS qrType={qrType} />;
    case 'location':
      return <LayoutLocation qrType={qrType} />;
    case 'phone':
      return <LayoutPhone qrType={qrType} />;
    case 'event':
      return <LayoutEvent qrType={qrType} />;
    case 'whatsapp':
      return <LayoutWhatsApp qrType={qrType} />;
    case 'youtube':
      return <LayoutYouTube qrType={qrType} />;
    case 'instagram':
      return <LayoutInstagram qrType={qrType} />;
    case 'crypto':
      return <LayoutCrypto qrType={qrType} />;
    case 'appstore':
      return <LayoutAppStore qrType={qrType} />;
    case 'facebook':
      return <LayoutFacebook qrType={qrType} />;
    case 'twitter':
      return <LayoutTwitter qrType={qrType} />;
    case 'tiktok':
      return <LayoutTikTok qrType={qrType} />;
    case 'linkedin':
      return <LayoutLinkedIn qrType={qrType} />;
    case 'telegram':
      return <LayoutTelegram qrType={qrType} />;
    case 'snapchat':
      return <LayoutSnapchat qrType={qrType} />;
    case 'discord':
      return <LayoutDiscord qrType={qrType} />;
    case 'spotify':
      return <LayoutSpotify qrType={qrType} />;
    case 'paypal':
      return <LayoutPaypal qrType={qrType} />;
    case 'venmo':
      return <LayoutVenmo qrType={qrType} />;
    default:
      // Fallback
      return <LayoutURL qrType={qrType} />;
  }
}

export default LandingContent;
