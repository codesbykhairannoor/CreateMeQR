const fs = require('fs');
const path = require('path');

const featTools = {
  url: {
    t1: "Instant Global Routing", d1: "Route users to your website in milliseconds without hitting our servers. Your destination loads perfectly on any connection.",
    t2: "UTM Tag Ready", d2: "Append analytics trackers directly to your URL before generating the code to measure exact campaign performance.",
    t3: "Print-Perfect Fidelity", d3: "Download in high-resolution vector formats to ensure your URL code never blurs on billboards or business cards."
  },
  wifi: {
    t1: "Hidden Network Support", d1: "Generate functional codes even for SSIDs that don't broadcast, keeping your enterprise networks secure.",
    t2: "WPA3 Encryption Ready", d2: "Fully compatible with modern WPA, WPA2, and WPA3 security protocols. No plain-text passwords exposed.",
    t3: "Zero Configuration Login", d3: "Guests simply point their camera to connect. No typing complex hexadecimal passwords or struggling with typos."
  },
  vcard: {
    t1: "Native Contact API", d1: "Triggers the native iOS and Android contact-save dialog immediately upon scanning. Zero friction networking.",
    t2: "Extended Metadata", d2: "Include company details, job titles, multiple phone numbers, and social URLs natively inside the barcode data.",
    t3: "Offline Operation", d3: "The entire contact card is encoded inside the pixels. Exchange details seamlessly even without internet access."
  },
  text: {
    t1: "Maximum Character Density", d1: "Encode thousands of alphanumeric characters directly into the image using optimal error-correction compression.",
    t2: "Air-Gapped Data Transfer", d2: "Move secure text snippets between disconnected devices instantly through optical scanning.",
    t3: "Multi-Byte Support", d3: "Fully supports Unicode and Emojis natively, allowing you to encode any language or symbol safely."
  },
  email: {
    t1: "Pre-filled Subject & Body", d1: "Draft an entire email inside the QR code. When scanned, it opens their mail client ready to send.",
    t2: "Spam Bot Protection", d2: "By keeping your email hidden in a printed or digital QR code, web scrapers cannot harvest your address.",
    t3: "Universal Client Support", d3: "Works seamlessly across Apple Mail, Gmail, Outlook, and all native mail handlers on mobile devices."
  },
  phone: {
    t1: "One-Tap Calling", d1: "Immediately launches the native phone dialer with your number pre-filled. Removes the barrier to contact.",
    t2: "International Formatting", d2: "Encode standard E.164 formats to ensure the call connects seamlessly regardless of the scanner's country.",
    t3: "Emergency & Support Ready", d3: "Ideal for help desks, emergency contacts, or real estate signs where instant voice connection is critical."
  },
  sms: {
    t1: "Automated SMS Drafts", d1: "Encodes both the destination phone number and a pre-written message, requiring just one tap to send.",
    t2: "Opt-In Campaign Friendly", d2: "Perfect for marketing opt-ins. Users scan and send a keyword text to your shortcode instantly.",
    t3: "Cross-Platform SMS API", d3: "Triggers iMessage on iOS and standard Messages on Android using universal deep-linking protocols."
  },
  location: {
    t1: "Pinpoint GPS Accuracy", d1: "Encode precise latitude and longitude coordinates to guide users exactly to your hidden or off-grid location.",
    t2: "Native Map Integration", d2: "Automatically opens Apple Maps, Google Maps, or Waze based on the user's default OS preferences.",
    t3: "Zero Ambiguity Navigation", d3: "Eliminate the confusion of sharing textual addresses. Just scan and start the GPS route immediately."
  },
  event: {
    t1: "iCal & Google Calendar Sync", d1: "Encodes the VEVENT format, allowing scanners to instantly add the event to their digital calendar.",
    t2: "Complete Schedule Data", d2: "Embed start times, end times, timezones, descriptions, and locations all directly into the code.",
    t3: "No App Required", d3: "Unlike proprietary ticketing systems, this uses native calendar protocols that work on every smartphone."
  },
  whatsapp: {
    t1: "Deep-Link Chat Routing", d1: "Bypasses the browser and opens the native WhatsApp application directly to your chat window.",
    t2: "Pre-populated Messages", d2: "Start the conversation for them by encoding a custom greeting that appears in their text box.",
    t3: "WhatsApp Business Ready", d3: "Perfect for customer support or sales lines, turning offline traffic into instant messenger leads."
  },
  youtube: {
    t1: "Instant Video Playback", d1: "Encodes YouTube specific intent URLs that force the native app to open and start playing the video.",
    t2: "Playlist & Channel Support", d2: "Link directly to specific timestamps, full playlists, or your channel subscription page easily.",
    t3: "Bypass Browser Logins", d3: "Keeps users in the app where they are already logged in, ensuring they can easily like and subscribe."
  },
  instagram: {
    t1: "Native App Deep-Linking", d1: "Forces the Instagram app to open directly to your profile, bypassing frustrating mobile web login screens.",
    t2: "Reels & Post Routing", d2: "Generate codes that link specifically to a single viral Reel or promotional post for offline campaigns.",
    t3: "Maximize Conversions", d3: "By keeping users inside the authenticated app environment, your follow conversion rate skyrockets."
  },
  crypto: {
    t1: "Flawless Address Encoding", d1: "Eliminates the risk of mistyping long alphanumeric wallet addresses. Scan and send with 100% accuracy.",
    t2: "Multi-Currency Ready", d2: "Generate valid payment request codes for Bitcoin, Ethereum, and other major blockchain protocols.",
    t3: "Amount Specification", d3: "Encode specific payment amounts into the URI so the sender's wallet app is pre-filled and ready."
  },
  appstore: {
    t1: "Smart OS Detection", d1: "Link to both iOS and Android apps. The user's device handles the routing to the correct store automatically.",
    t2: "Frictionless App Installs", d2: "Remove the need for users to manually search for your app by name, avoiding competitor knock-offs.",
    t3: "Direct Store Deep-Links", d3: "Bypasses standard web browsers and forces the App Store or Google Play Store native applications to open."
  },
  facebook: {
    t1: "Page & Profile Routing", d1: "Links directly to your Facebook Page, Group, or personal Profile inside the native Facebook app.",
    t2: "Bypass Web Authentication", d2: "Prevents users from abandoning the process due to mobile browser login prompts.",
    t3: "Offline to Online Growth", d3: "The perfect bridge to turn physical store foot traffic into active Facebook followers and group members."
  },
  twitter: {
    t1: "Pre-written Tweet Drafts", d1: "Encode a full tweet complete with hashtags and mentions. The user just taps 'Post' upon scanning.",
    t2: "Instant Profile Follows", d2: "Generate a link that opens directly to your X profile inside the app, primed for a quick follow.",
    t3: "Hashtag Campaign Ready", d3: "Perfect for events. Create a code that opens the X search tab pre-filled with your event's specific hashtag."
  },
  tiktok: {
    t1: "Viral Deep-Linking", d1: "Bypass the mobile web and force the TikTok app to open directly to your sound, effect, or profile.",
    t2: "Sound & Trend Linking", d2: "Drive offline traffic directly to a specific audio track so users can instantly create videos with your sound.",
    t3: "Maximize Engagement", d3: "Ensure users interact in the app where they are logged in, maximizing likes, saves, and comments."
  },
  linkedin: {
    t1: "Professional Networking", d1: "Link directly to your LinkedIn profile to instantly connect at conferences and networking events.",
    t2: "Company Page Routing", d2: "Direct job seekers and investors straight to your company's official LinkedIn page effortlessly.",
    t3: "In-App Experience", d3: "Forces the LinkedIn native app to open, ensuring the user is logged in and ready to hit 'Connect'."
  },
  telegram: {
    t1: "Instant Channel Joins", d1: "Encode a Telegram invite link that immediately prompts the user to join your private or public channel.",
    t2: "Direct Bot Interaction", d2: "Link directly to a Telegram Bot with a pre-set START payload to trigger automated workflows instantly.",
    t3: "Secure Chat Deep-Links", d3: "Route users to a secure 1-on-1 chat inside the encrypted Telegram application without saving phone numbers."
  },
  snapchat: {
    t1: "Lens & Filter Unlocking", d1: "Generate a code that instantly unlocks a custom AR Lens or geofilter inside the Snapchat app.",
    t2: "Instant Friending", d2: "Allow users to add you as a friend on Snapchat instantly without manually typing your username.",
    t3: "Discover Page Routing", d3: "Link directly to your public Discover show or Spotlight content within the native application environment."
  },
  discord: {
    t1: "One-Tap Server Joins", d1: "Encode a Discord invite link that bypasses the browser and directly opens the app to join your server.",
    t2: "Never Expires Option", d2: "Pair your permanent QR code with a non-expiring Discord invite link for a robust, long-term community funnel.",
    t3: "In-App Authentication", d3: "Keeps users inside the authenticated Discord environment, vastly improving the server join success rate."
  },
  spotify: {
    t1: "Instant Audio Playback", d1: "Link directly to a track, album, or playlist, prompting the Spotify app to open and start playing.",
    t2: "Podcast Deep-Linking", d2: "Drive offline listeners directly to your latest podcast episode within their preferred audio app.",
    t3: "Artist Profile Routing", d3: "Connect physical merch or concert posters directly to your Spotify Artist page to gain instant followers."
  },
  paypal: {
    t1: "One-Tap Payments", d1: "Encode your PayPal.Me link to open the PayPal app instantly, ready for the customer to send money.",
    t2: "Exact Amount Requests", d2: "Embed a specific currency amount in the code so the customer doesn't have to manually type the total.",
    t3: "Contactless Transactions", d3: "Perfect for farmers markets, donations, and tipping where physical card readers are unavailable."
  },
  venmo: {
    t1: "Instant Username Linking", d1: "Bypass search errors by linking directly to your Venmo profile inside the native payment application.",
    t2: "Pre-filled Payment Notes", d2: "Encode both the amount and a specific transaction note (like 'Table 4') for flawless accounting.",
    t3: "Zero Hardware Required", d3: "Accept secure mobile payments anywhere just by displaying this printed static code on your counter."
  }
};

const localesDir = path.join(__dirname, 'public', 'locales');
const translateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=';

async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  
  // Wait to avoid rate limits
  await new Promise(r => setTimeout(r, 500));
  
  try {
    const url = `${translateUrl}${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    console.error(`Translation failed for ${targetLang}:`, error);
    return text;
  }
}

async function injectFeatures() {
  const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());
  
  for (const lang of languages) {
    console.log(`\nProcessing language: ${lang}`);
    const filePath = path.join(localesDir, lang, 'translation.json');
    let data = {};
    
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`Failed to read ${filePath}`);
      continue;
    }
    
    if (!data.featTools) data.featTools = {};
    
    for (const [tool, features] of Object.entries(featTools)) {
      if (!data.featTools[tool]) data.featTools[tool] = {};
      
      console.log(`  Translating features for ${tool}...`);
      for (const [key, text] of Object.entries(features)) {
        if (!data.featTools[tool][key]) {
          const translated = await translateText(text, lang);
          data.featTools[tool][key] = translated;
        }
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${lang}/translation.json`);
  }
  
  console.log('\n🎉 Feature injection complete!');
}

injectFeatures();
