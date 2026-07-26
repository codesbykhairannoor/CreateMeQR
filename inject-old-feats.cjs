const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const enPath = path.join(localesDir, 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const oldFeats = {
  url: {
    t1: "Instant Web Redirection", d1: "Send users straight to your website, landing page, or online store instantly with one scan.",
    t2: "Clean & Simple", d2: "We remove unnecessary tracking parameters, making the QR code look cleaner and scan faster.",
    t3: "Works Offline to Online", d3: "The perfect bridge to bring physical print materials into the digital world seamlessly."
  },
  wifi: {
    t1: "No More Typing Passwords", d1: "Guests simply point their camera and connect to your Wi-Fi instantly without asking for the password.",
    t2: "Secure Encryption", d2: "Supports all standard network security protocols including WPA2, WPA3, and WEP.",
    t3: "Hidden Network Support", d3: "Even if your network doesn't broadcast its name, the QR code connects users flawlessly."
  },
  vcard: {
    t1: "Digital Business Card", d1: "Share your name, phone, email, and company details instantly without paper business cards.",
    t2: "One-Tap Save to Contacts", d2: "Scanners are immediately prompted to save your details directly into their phone's address book.",
    t3: "Universal Compatibility", d3: "Uses the standard vCard format, recognized natively by both iOS and Android devices."
  },
  text: {
    t1: "Offline Message Sharing", d1: "Embed up to 4,000 characters of text directly into the QR code. No internet required to scan.",
    t2: "Perfect for Inventory", d2: "Ideal for serial numbers, warehouse codes, or offline instructions on product packaging.",
    t3: "Emoji Support", d3: "Modern smartphones fully support emojis embedded within the raw text of the code."
  },
  email: {
    t1: "Pre-filled Emails", d1: "Launch the user's default email app with the recipient, subject, and body already typed out.",
    t2: "Boost Support Queries", d2: "Make it effortless for customers to send support requests or feedback directly to your inbox.",
    t3: "Spam Bot Protection", d3: "Hide your email address from web scrapers while making it instantly accessible to real humans."
  },
  sms: {
    t1: "Ready-to-Send Texts", d1: "Open the messaging app with a pre-populated SMS and phone number. They just hit send.",
    t2: "SMS Opt-in Marketing", d2: "The fastest way to get customers to subscribe to your SMS alerts or promotional lists.",
    t3: "Customer Support", d3: "Let clients text you directly from a printed flyer or business card with zero friction."
  },
  location: {
    t1: "Pinpoint GPS Accuracy", d1: "Guide users to exact latitude and longitude coordinates, perfect for unmarked or remote locations.",
    t2: "Native Map Integration", d2: "Automatically opens Google Maps or Apple Maps depending on the user's smartphone ecosystem.",
    t3: "Event Wayfinding", d3: "Help attendees find specific entrances, parking lots, or outdoor meeting points easily."
  },
  phone: {
    t1: "Tap to Call", d1: "Eliminate dial errors. One scan brings up the phone dialer with your number ready to ring.",
    t2: "International Support", d2: "Includes country codes to ensure the call connects perfectly from anywhere in the world.",
    t3: "Sales & Support", d3: "Ideal for real estate signs, delivery vehicles, and restaurant takeout menus."
  },
  event: {
    t1: "Instant Calendar Sync", d1: "Embed event details so users can add it to their Google or Apple calendar with one tap.",
    t2: "Timezone Smart", d2: "Uses universal time formats to ensure the event saves correctly regardless of the scanner's timezone.",
    t3: "Boost Attendance", d3: "The easier it is to save the date, the higher your event turnout will be."
  },
  whatsapp: {
    t1: "Direct WhatsApp Chat", d1: "Start a conversation instantly on WhatsApp without needing to save the phone number first.",
    t2: "Pre-written Messages", d2: "Set a default message so customers can order or ask questions with zero typing required.",
    t3: "WhatsApp Web Fallback", d3: "If scanned on a desktop or device without the app, it smoothly redirects to WhatsApp Web."
  },
  youtube: {
    t1: "Launch the YouTube App", d1: "Deep-links directly into the native YouTube app on mobile devices for the best viewing experience.",
    t2: "Video or Channel", d2: "Link to a specific promotional video, or direct them straight to your main channel page.",
    t3: "Timestamp Support", d3: "Start the video at the exact moment you want them to see by appending a timestamp."
  },
  instagram: {
    t1: "Grow Your Followers", d1: "Send users directly to your Instagram profile in the native app, skipping the mobile web browser.",
    t2: "Profile Deep-linking", d2: "Bypass the login screens of the browser and take them straight to the follow button.",
    t3: "Brand Aesthetic", d3: "Customize the QR code with Instagram's signature gradient colors or your own brand logo."
  },
  crypto: {
    t1: "Seamless Crypto Payments", d1: "Share your Bitcoin, Ethereum, or Litecoin wallet address safely without risk of typos.",
    t2: "Request Specific Amounts", d2: "Embed a specific payment value so the transaction is pre-filled when their wallet app opens.",
    t3: "Error-Free Transfers", d3: "Crypto addresses are long and complex. QR codes are the only safe way to share them offline."
  },
  appstore: {
    t1: "Boost App Downloads", d1: "Direct users straight to your app's download page on the Apple App Store or Google Play Store.",
    t2: "Frictionless Install", d2: "Remove the need for users to manually search for your app name in the store.",
    t3: "Universal Access", d3: "Works globally, directing users to their localized version of the app marketplace."
  },
  facebook: {
    t1: "Connect on Facebook", d1: "Link directly to your Facebook Business Page or personal profile inside the native app.",
    t2: "Drive Engagement", d2: "Make it effortless for offline customers to leave reviews, like your page, or view updates.",
    t3: "Group Invites", d3: "Perfect for growing exclusive Facebook Communities from physical events or packaging."
  },
  twitter: {
    t1: "Grow Your X Audience", d1: "Direct users to your X (formerly Twitter) profile instantly inside the mobile application.",
    t2: "Join the Conversation", d2: "Encourage offline attendees or customers to tweet at your handle or follow your updates.",
    t3: "Deep-link Optimized", d3: "Bypasses the mobile web browser so users don't have to log in to follow you."
  },
  tiktok: {
    t1: "Viral Offline Marketing", d1: "Bridge the gap between physical marketing and your TikTok profile with a simple scan.",
    t2: "Native App Launch", d2: "Opens directly in the TikTok app, taking them straight to your feed of short-form videos.",
    t3: "Fallback Support", d3: "If they don't have TikTok installed, it elegantly opens the web version instead."
  },
  linkedin: {
    t1: "Professional Networking", d1: "The perfect addition to resumes, portfolios, and presentation slides to connect instantly.",
    t2: "Company Pages", d2: "Direct clients or potential hires straight to your LinkedIn Business profile.",
    t3: "Paperless Connections", d3: "Why hand out business cards when you can connect directly on the world's largest professional network?"
  },
  telegram: {
    t1: "Join the Channel", d1: "Send users directly to your Telegram Group or Channel using Telegram's native t.me deep links.",
    t2: "Private Messaging", d2: "Allow clients to message your Telegram username directly without exposing your phone number.",
    t3: "Cross-Platform", d3: "Works perfectly whether the user scans it with their phone or clicks it on a desktop."
  },
  snapchat: {
    t1: "Add Friends Instantly", d1: "Link directly to your Snapchat profile so users can add you with a single tap.",
    t2: "Universal QR Alternative", d2: "Unlike proprietary Snapcodes, this generates a standard QR code that any camera can read.",
    t3: "Custom Branding", d3: "Allows you to use your own brand colors and logo instead of the standard yellow ghost."
  },
  discord: {
    t1: "Grow Your Server", d1: "The fastest way to invite gamers, students, or communities to your Discord server from the real world.",
    t2: "Instant App Launch", d2: "Detects the Discord app and opens it directly to the server invitation screen.",
    t3: "Voice Channel Links", d3: "Link directly to specific text or voice channels if the invite was generated for them."
  },
  spotify: {
    t1: "Share Your Sound", d1: "Link to your latest album, podcast episode, or curated playlist directly on Spotify.",
    t2: "Universal Standard", d2: "Unlike Spotify Codes, standard QR codes can be customized and scanned by any camera.",
    t3: "Instant Playback", d3: "Opens the Spotify app directly, ready for the user to hit play and start listening."
  },
  paypal: {
    t1: "Cashless Payments", d1: "Accept payments anywhere instantly. Perfect for farmers markets, donations, or tips.",
    t2: "PayPal.me Integration", d2: "Uses your standard PayPal.me link to securely request money without exposing banking details.",
    t3: "Flexible Amounts", d3: "Leave the amount blank so the customer can type it in, or pre-fill a set price for products."
  },
  venmo: {
    t1: "Peer-to-Peer Payments", d1: "The fastest way to accept Venmo payments at yard sales, events, or for split bills.",
    t2: "Native Deep Link", d2: "Opens the Venmo app directly on their phone, skipping clumsy web browser logins.",
    t3: "Secure & Private", d3: "Your transactions are handled securely by Venmo, we never touch or see your money."
  }
};

enData.featTools = enData.featTools || {};

for (const [key, feats] of Object.entries(oldFeats)) {
  enData.featTools[key] = {
    ...enData.featTools[key],
    ...feats
  };
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log("Injected old featTools into en/translation.json!");
