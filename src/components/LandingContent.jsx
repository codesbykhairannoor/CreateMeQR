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

// Top 10 new layouts
import LayoutPDF from './landing/LayoutPDF';
import LayoutGoogleForms from './landing/LayoutGoogleForms';
import LayoutGoogleReview from './landing/LayoutGoogleReview';
import LayoutImage from './landing/LayoutImage';
import LayoutLinkInBio from './landing/LayoutLinkInBio';
import LayoutVideo from './landing/LayoutVideo';
import LayoutAudio from './landing/LayoutAudio';
import LayoutAmazon from './landing/LayoutAmazon';
import LayoutBooking from './landing/LayoutBooking';
import LayoutFile from './landing/LayoutFile';

function LandingContent({ qrType = 'url' }) {
  let LayoutComponent = LayoutURL;

  switch (qrType) {
    case 'url': LayoutComponent = LayoutURL; break;
    case 'wifi': LayoutComponent = LayoutWiFi; break;
    case 'vcard': LayoutComponent = LayoutVCard; break;
    case 'text': LayoutComponent = LayoutText; break;
    case 'email': LayoutComponent = LayoutEmail; break;
    case 'sms': LayoutComponent = LayoutSMS; break;
    case 'location': LayoutComponent = LayoutLocation; break;
    case 'phone': LayoutComponent = LayoutPhone; break;
    case 'event': LayoutComponent = LayoutEvent; break;
    case 'whatsapp': LayoutComponent = LayoutWhatsApp; break;
    case 'youtube': LayoutComponent = LayoutYouTube; break;
    case 'instagram': LayoutComponent = LayoutInstagram; break;
    case 'crypto': LayoutComponent = LayoutCrypto; break;
    case 'appstore': LayoutComponent = LayoutAppStore; break;
    case 'facebook': LayoutComponent = LayoutFacebook; break;
    case 'twitter': LayoutComponent = LayoutTwitter; break;
    case 'tiktok': LayoutComponent = LayoutTikTok; break;
    case 'linkedin': LayoutComponent = LayoutLinkedIn; break;
    case 'telegram': LayoutComponent = LayoutTelegram; break;
    case 'snapchat': LayoutComponent = LayoutSnapchat; break;
    case 'discord': LayoutComponent = LayoutDiscord; break;
    case 'spotify': LayoutComponent = LayoutSpotify; break;
    case 'paypal': LayoutComponent = LayoutPaypal; break;
    case 'venmo': LayoutComponent = LayoutVenmo; break;
    
    // Top 10 new layouts
    case 'pdf': LayoutComponent = LayoutPDF; break;
    case 'gforms': LayoutComponent = LayoutGoogleForms; break;
    case 'greview': LayoutComponent = LayoutGoogleReview; break;
    case 'image': LayoutComponent = LayoutImage; break;
    case 'linkinbio': LayoutComponent = LayoutLinkInBio; break;
    case 'video': LayoutComponent = LayoutVideo; break;
    case 'audio': LayoutComponent = LayoutAudio; break;
    case 'amazon': LayoutComponent = LayoutAmazon; break;
    case 'booking': LayoutComponent = LayoutBooking; break;
    case 'file': LayoutComponent = LayoutFile; break;
    
    default: LayoutComponent = LayoutURL; break;
  }

  return (
    
      <LayoutComponent qrType={qrType} />
    
  );
}

export default LandingContent;
