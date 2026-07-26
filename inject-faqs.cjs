const fs = require('fs');
const path = require('path');

const faqTools = {
  url: {
    q1: "How does a URL QR Code work?", a1: "It stores your website address and automatically opens it in the user's browser when scanned.",
    q2: "Can I track how many people scan my URL QR code?", a2: "Yes, our system provides full analytics including scan counts, geographic locations, and devices used.",
    q3: "Does a URL QR Code ever expire?", a3: "No, static URL QR codes last forever. Dynamic ones last as long as the destination link is active.",
    q4: "Can I change the URL later?", a4: "Yes, if you use a Dynamic QR Code, you can update the destination URL anytime without reprinting the QR.",
    q5: "Why isn't my URL QR Code scanning?", a5: "Ensure the URL is correct, the QR code has enough contrast, and the size is large enough for the scanner."
  },
  wifi: {
    q1: "Is my WiFi password secure in the QR code?", a1: "The password is only stored inside the QR code pattern itself. It is not transmitted to our servers.",
    q2: "Can I create a QR code for a hidden network?", a2: "Yes, our generator supports hidden networks. Just ensure you enter the SSID exactly as it is.",
    q3: "Does it work on both iOS and Android?", a3: "Yes, both modern iOS and Android devices natively support connecting to WiFi via QR codes without extra apps.",
    q4: "What happens if I change my WiFi password?", a4: "You will need to generate a new WiFi QR Code, as the old one contains the previous password.",
    q5: "Can I use WEP encryption?", a5: "Yes, you can choose between WPA/WPA2, WEP, or no encryption when generating the code."
  },
  vcard: {
    q1: "What information can a vCard QR Code hold?", a1: "It can hold your name, phone number, email address, company, and job title.",
    q2: "Will this automatically save to their contacts?", a2: "Yes, scanning the vCard QR code prompts the smartphone to instantly save the details to their address book.",
    q3: "Do I need a special app to scan it?", a3: "No, native camera apps on iOS and Android can read vCard QR codes perfectly.",
    q4: "Is there a limit to how much text I can add?", a4: "Technically yes. Keep the information concise to ensure the QR code pattern doesn't become too dense and hard to scan.",
    q5: "Can I add a profile picture?", a5: "This specific basic vCard generator handles text. For photos, you would need a dynamic vCard Plus landing page."
  },
  text: {
    q1: "How much text can I put in a QR code?", a1: "A standard text QR code can hold up to 4,000 alphanumeric characters, though staying under 300 is recommended for easy scanning.",
    q2: "Does it need an internet connection to read?", a2: "No, a Text QR code is completely offline. The text is embedded directly into the code.",
    q3: "Can I use emojis?", a3: "Yes, modern smartphones can read and display emojis stored within a Text QR code.",
    q4: "Can I edit the text after printing?", a4: "No, static Text QR codes cannot be edited once generated because the data is hard-coded into the pixels.",
    q5: "What is this typically used for?", a5: "It is often used for serial numbers, offline coupons, secret messages, or inventory tracking."
  },
  email: {
    q1: "Does this send the email automatically?", a1: "No, it opens the user's default email app and pre-fills the recipient, subject, and body. The user must press send.",
    q2: "Can I leave the subject or body blank?", a2: "Yes, you can generate a QR code with just the recipient email address if you prefer.",
    q3: "Will it work with Gmail or Outlook?", a3: "Yes, the phone's operating system decides which email app to open based on the user's default settings.",
    q4: "Can I send to multiple email addresses?", a4: "You can try separating emails with a comma, but support varies by the email client used by the scanner.",
    q5: "Is my email address safe from spam bots?", a5: "Yes, the email address is hidden inside the QR image, making it difficult for automated web scrapers to harvest it."
  },
  sms: {
    q1: "How does the SMS QR Code work?", a1: "When scanned, it opens the user's text messaging app with a pre-filled phone number and message.",
    q2: "Does it automatically send the text?", a2: "No, the user always has the final choice to press the 'Send' button.",
    q3: "Are there any carrier charges?", a3: "Standard SMS rates apply to the person sending the text, depending on their mobile carrier plan.",
    q4: "Can I use international numbers?", a4: "Yes, always include the country code (e.g., +1 for US) for the best reliability.",
    q5: "Why would I use this?", a5: "It's great for SMS opt-in marketing, customer support, or quick registrations."
  },
  location: {
    q1: "Does it open Google Maps or Apple Maps?", a1: "It opens the default mapping application on the user's device, which is usually Apple Maps on iOS and Google Maps on Android.",
    q2: "How accurate is the location?", a2: "It uses exact GPS coordinates (Latitude and Longitude), making it pinpoint accurate.",
    q3: "Can I generate a QR for a building without an address?", a3: "Yes, because it relies on GPS coordinates, you can map specific outdoor trails, park benches, or remote areas.",
    q4: "Does it require internet?", a4: "The QR code itself doesn't, but the user's phone needs an internet connection to load the map interface.",
    q5: "Can I add a location name?", a5: "Standard geo-URI QR codes only pass coordinates. The map app determines the label based on those coordinates."
  },
  phone: {
    q1: "Does it call the number automatically?", a1: "No, for security reasons, the phone will display the number and ask the user to confirm the call.",
    q2: "Should I include the country code?", a2: "Yes, we strongly recommend including the country code (e.g., +44, +1) to ensure it works internationally.",
    q3: "Can I use it for emergency numbers?", a3: "Technically yes, but it is not recommended as dialing manually is faster and more reliable in an emergency.",
    q4: "Can it dial extensions?", a4: "Support for extensions (using commas for pauses) depends entirely on the scanner's phone operating system.",
    q5: "Is it completely free to generate?", a5: "Yes, our phone QR code generator is 100% free with no scanning limits."
  },
  event: {
    q1: "Will this sync with Google Calendar or Apple Calendar?", a1: "Yes, it generates a standard iCalendar (vEvent) format that works natively with all major calendar apps.",
    q2: "Can I set the timezone?", a2: "The generator uses UTC time formatting to ensure the event automatically adjusts to the scanner's local timezone.",
    q3: "Can I add a description to the event?", a3: "This basic generator handles Title, Location, and Time. Advanced descriptions require a dynamic event page.",
    q4: "What if the event gets canceled?", a4: "Since this is a static QR code, you cannot update it. You would need to notify attendees manually.",
    q5: "Do attendees need a special app?", a5: "No, iOS and Android cameras instantly recognize event codes and offer to 'Add to Calendar'."
  },
  whatsapp: {
    q1: "Do I need WhatsApp Business for this to work?", a1: "No, this works with both standard WhatsApp and WhatsApp Business accounts.",
    q2: "Can I pre-fill a message?", a2: "Yes, you can write a custom message that will be automatically typed in the user's chat box when they scan.",
    q3: "What if the user doesn't have WhatsApp installed?", a3: "The link will take them to a browser page prompting them to download the app or use WhatsApp Web.",
    q4: "Is my phone number visible?", a4: "Yes, the phone number is embedded in the QR code and will be visible when the chat opens.",
    q5: "Can I use this for a WhatsApp Group?", a5: "To invite to a group, you should use the 'URL QR Code' generator and paste your WhatsApp Group Invite Link."
  },
  youtube: {
    q1: "Does it open the YouTube app or the browser?", a1: "If the user has the YouTube app installed, their phone will automatically launch the app to play the video.",
    q2: "Can I link to a specific timestamp?", a2: "Yes, if you paste a YouTube URL that includes a timestamp parameter (e.g., ?t=1m30s), it will start playing there.",
    q3: "Can I link to a channel instead of a video?", a3: "Absolutely, just paste the URL of the YouTube channel instead of a specific video.",
    q4: "Will this bypass YouTube ads?", a4: "No, the QR code simply acts as a link. Standard YouTube advertisements will still play.",
    q5: "Why not use a standard URL QR code?", a5: "A YouTube-specific generator ensures the formatting is optimized for triggering the native mobile app correctly."
  },
  instagram: {
    q1: "Does it open the Instagram app directly?", a1: "Yes, on mobile devices, it utilizes deep linking to launch the native Instagram app straight to your profile.",
    q2: "Do I need to include the @ symbol?", a2: "You can, but our generator will automatically format it correctly whether you include the @ symbol or not.",
    q3: "Can I link to a specific post instead of a profile?", a3: "For specific posts, it's better to use the 'URL QR Code' option and paste the exact post link.",
    q4: "Is there a limit to scans?", a4: "No, this is a static QR code with unlimited lifetime scans.",
    q5: "Can I track how many followers I get from the QR code?", a5: "You cannot track followers directly through the QR code, but you can track total scans using our analytics dashboard."
  },
  crypto: {
    q1: "Which cryptocurrencies are supported?", a1: "We currently support standard URI formats for Bitcoin, Ethereum, Litecoin, Bitcoin Cash, and Dash.",
    q2: "Can I specify a payment amount?", a2: "Yes, you can input a specific amount. When scanned, the user's wallet will pre-fill the transaction value.",
    q3: "Is it safe to put my wallet address in a QR code?", a3: "Yes, sharing a public wallet address is completely safe and is the standard method for receiving crypto.",
    q4: "What happens if someone scans it without a crypto wallet?", a4: "Their phone will likely just display the raw text of the address, as it won't have an app to process the URI.",
    q5: "Can I update the address later?", a5: "No, Crypto URI QR codes are static. If you change wallets, you must generate a new QR code."
  },
  appstore: {
    q1: "Can one QR code route to both iOS and Android?", a1: "Our basic generator creates a direct link. For multi-routing (one code for both stores), you need a dynamic App Store QR.",
    q2: "Does it open the native App Store?", a2: "Yes, the operating system recognizes the URL and will launch the Apple App Store or Google Play Store directly.",
    q3: "Can I link to an app that isn't mine?", a3: "Yes, you can create a QR code for any app URL that exists in the stores.",
    q4: "What if the app is regionally restricted?", a4: "The QR code will still direct them to the store, but the store will display an error if the app is unavailable in their country.",
    q5: "Is it better to link to my website or the app store?", a5: "If your primary goal is downloads, link directly to the App Store to reduce friction."
  },
  facebook: {
    q1: "Will it open the Facebook mobile app?", a1: "Yes, scanning this QR code triggers deep-linking to open the native Facebook app directly to your profile or page.",
    q2: "Can I use it for a Facebook Group?", a2: "Yes, just enter the exact URL of your Facebook Group.",
    q3: "Do they need a Facebook account to see it?", a3: "Public business pages can usually be viewed without logging in, but personal profiles require an account.",
    q4: "Can I track the scans?", a4: "If you create an account with us and generate a Dynamic QR code, you can track every scan.",
    q5: "Why did it open in the browser instead of the app?", a5: "This happens if the user doesn't have the Facebook app installed or has specific deep-link settings disabled on their phone."
  },
  twitter: {
    q1: "Does this work with the new 'X' branding?", a1: "Yes, the QR code uses the standard twitter.com architecture which is fully compatible with the X app infrastructure.",
    q2: "Can I link to a specific tweet?", a2: "For specific tweets, use the 'URL QR Code' generator. This tool is optimized for Profile handles.",
    q3: "Do I need to include the @ symbol?", a3: "Our engine will automatically strip the @ symbol and format the deep-link perfectly.",
    q4: "Will it force them to follow me?", a4: "No, it directs them to your profile where they can choose to hit the follow button.",
    q5: "Is this a static or dynamic code?", a5: "By default, this generates a free static code that lasts forever without limits."
  },
  tiktok: {
    q1: "Will it launch the TikTok app directly?", a1: "Yes, modern smartphones will recognize the link and prompt the user to open the TikTok app directly to your profile.",
    q2: "Can I link to a specific TikTok video?", a2: "Use our 'URL' tool for specific videos. This specific TikTok tool is designed for profile usernames.",
    q3: "Do they need the app installed?", a3: "If they don't have the app, the link will gracefully fall back to the TikTok mobile web browser experience.",
    q4: "How long does the QR code last?", a4: "Our static QR codes have no expiration date and will work forever.",
    q5: "Can I customize the QR code with the TikTok logo?", a5: "Absolutely, you can upload the TikTok logo or any custom image into the center of the code in the design tab."
  },
  linkedin: {
    q1: "Can I use this for my Company Page?", a1: "Yes, just ensure you input the correct LinkedIn URL format for your company page.",
    q2: "Will it automatically send a connection request?", a2: "No, it opens your profile. The user must manually click 'Connect' or 'Follow'.",
    q3: "Is it safe to put on a printed resume?", a3: "Yes, placing a LinkedIn QR code on a physical resume is highly recommended to bridge offline to online.",
    q4: "Why does it look so dense?", a4: "LinkedIn URLs can sometimes be long. You can use our dynamic QR option to shorten the URL and make the code cleaner.",
    q5: "Does it work for LinkedIn Learning courses?", a5: "For courses or specific articles, we recommend using the standard URL QR Code generator."
  },
  telegram: {
    q1: "Does it open the Telegram app?", a1: "Yes, it uses the standard t.me format which deep-links directly into the Telegram app on mobile and desktop.",
    q2: "Can I link to a Telegram Channel or Group?", a2: "Yes, just enter the public username of your channel or group.",
    q3: "What if it's a private group?", a3: "For private groups, you need to use the specific invite link generated by Telegram inside the 'URL' QR tool.",
    q4: "Will my phone number be exposed?", a4: "Not if you use your Telegram Username. Telegram allows you to share your profile without revealing your phone number.",
    q5: "Can I pre-fill a message in Telegram?", a5: "The standard Telegram username deep-link only opens the chat. Pre-filling messages requires a different API format."
  },
  snapchat: {
    q1: "Is this different from a Snapcode?", a1: "Yes, a Snapcode is Snapchat's proprietary ghost logo code. This creates a standard, universally scannable QR code that links to your profile.",
    q2: "Can iOS and Android cameras read it?", a2: "Yes, standard smartphone cameras will read this QR code and prompt to open the Snapchat app.",
    q3: "Do I need to include the snapchat.com part?", a3: "No, just enter your exact Snapchat username and our system formats it correctly.",
    q4: "Can I use it for a Snapchat lens?", a4: "To link directly to a Lens, you should copy the specific Lens URL and use our URL QR code generator.",
    q5: "Why use a QR code instead of a Snapcode?", a5: "Standard QR codes can be customized with your own brand colors, logos, and frame designs."
  },
  discord: {
    q1: "Can I link directly to a voice channel?", a1: "If the Discord invite code was specifically generated for a voice channel, the QR code will direct them there.",
    q2: "What happens if the invite link expires?", a2: "The QR code will still scan, but Discord will show an 'Invite Invalid' error. Always generate permanent invite links for printed QR codes.",
    q3: "Does it open the Discord mobile app?", a3: "Yes, if the user has Discord installed on their device, it will launch the app directly.",
    q4: "Can I link to a specific user profile?", a4: "Discord doesn't natively support web-based deep-linking to user profiles easily. It's best used for Server Invites.",
    q5: "Do I paste the whole URL or just the code?", a5: "You can do either. Our engine is smart enough to extract the code if you paste the full discord.gg URL."
  },
  spotify: {
    q1: "Can I link to a specific song?", a1: "Yes, you can link to an artist profile, album, playlist, or a specific track.",
    q2: "Does it autoplay the music?", a2: "No, the Spotify app will open and display the track/album, but the user must press play.",
    q3: "Is this a Spotify Code?", a3: "No, Spotify Codes are proprietary soundwave graphics. This generates a standard, universally readable QR code.",
    q4: "Will it work if they only use the free version of Spotify?", a4: "Yes, though free users may experience Spotify's standard limitations (like shuffle play) depending on the content.",
    q5: "Can I use Apple Music links here?", a5: "This specific tool is optimized for Spotify URLs. For Apple Music, please use the standard URL QR Code option."
  },
  paypal: {
    q1: "Is this secure?", a1: "Yes, the QR code simply directs the user to PayPal's secure servers. No payment processing happens on our end.",
    q2: "Do I need a PayPal Business account?", a2: "No, this works with any standard PayPal.me link for personal or business accounts.",
    q3: "Can I leave the amount blank?", a3: "Yes, if you leave the amount blank, the user will be prompted to enter the amount they wish to pay themselves.",
    q4: "What currency does it use?", a4: "The currency is determined by your PayPal account settings and the payer's native currency conversion.",
    q5: "What if they don't have the PayPal app?", a5: "The link will safely fall back to the PayPal mobile web browser checkout experience."
  },
  venmo: {
    q1: "Does it open the Venmo app directly?", a1: "Yes, when scanned on a mobile device, it will deep-link directly into the Venmo application.",
    q2: "Can I specify an amount?", a2: "Currently, Venmo's public URL structure is best optimized for linking to profiles. The user will enter the amount.",
    q3: "Is this available outside the US?", a3: "Venmo is currently only available for use within the United States.",
    q4: "Do I need the @ symbol?", a4: "You can include it or leave it out; our system will automatically format the username correctly.",
    q5: "Can I track who paid me?", a5: "You will track all actual payments and payer details directly inside your Venmo app, as usual."
  }
};

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = fs.readdirSync(localesDir);

langs.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Inject faqTools object
    data.faqTools = faqTools;
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Injected FAQ tools for ${lang}`);
  }
});
console.log('Done injecting 120 FAQs to all 30 languages!');
