const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

if (!enData.featTools) enData.featTools = {};
if (!enData.faqTools) enData.faqTools = {};

const top10Data = {
  pdf: {
    feats: {
      t1: "Instant Document Access", d1: "Upload and convert your PDFs into scannable QR codes that open instantly on any device.",
      t2: "Professional Menus & Docs", d2: "Perfect for restaurant menus, instruction manuals, or event schedules without printing costs.",
      t3: "Print-Ready Quality", d3: "Our vector QR codes ensure crisp, perfect scanning even when printed on large marketing materials."
    },
    faqs: {
      q1: "How large can the PDF file be?", a1: "For the fastest loading times, we recommend hosting your PDF on Google Drive or Dropbox and using our generator to link directly to it.",
      q2: "Can users download the PDF?", a2: "Yes, when they scan the code and open the link, their mobile browser will offer the standard option to download or save the file.",
      q3: "Do they need a special app to open it?", a3: "No. Both iOS and Android natively support viewing PDF documents directly within their default web browsers.",
      q4: "Can I update the PDF later?", a4: "If you host the PDF on your own server or cloud drive, you can replace the file at the same URL and the QR code will still work.",
      q5: "Is my document secure?", a5: "We only generate a link to where your document is hosted. The security of the document depends on your hosting provider (like Google Drive)."
    }
  },
  gforms: {
    feats: {
      t1: "Frictionless Feedback", d1: "Get more responses by letting customers scan and fill out surveys immediately on their phones.",
      t2: "Event Registration", d2: "Place QR codes on posters or digital screens for instant, hassle-free event sign-ups.",
      t3: "100% Mobile Optimized", d3: "Google Forms scale perfectly to mobile screens, and our QR codes bridge the gap perfectly."
    },
    faqs: {
      q1: "How do I get my Google Form URL?", a1: "In Google Forms, click 'Send', choose the link icon, copy the URL, and paste it into our generator.",
      q2: "Does the QR code expire when the form closes?", a2: "No, the QR code never expires. However, if you close the form, users will see Google's 'Form is no longer accepting responses' message.",
      q3: "Can I track how many people scanned it?", a3: "You can track the total number of form submissions directly within your Google Forms dashboard.",
      q4: "Is it free to make a Google Form QR?", a4: "Yes! Our generator is completely free and creates static links directly to your form without any hidden fees.",
      q5: "Does it work with Microsoft Forms too?", a5: "Absolutely! Just paste your Microsoft Forms link into our URL generator instead."
    }
  },
  greview: {
    feats: {
      t1: "Boost Local SEO", d1: "More positive Google Reviews directly improve your local search rankings and visibility.",
      t2: "One-Tap 5 Stars", d2: "Send customers directly to the review submission page, skipping the tedious search process.",
      t3: "Perfect for Counters", d3: "Print these codes on receipts, table tents, or checkout counters to capture feedback at peak satisfaction."
    },
    faqs: {
      q1: "Where do I find my Google Review link?", a1: "Go to your Google Business Profile, click 'Ask for reviews', and copy the short link provided by Google.",
      q2: "Can I pre-fill a 5-star rating?", a2: "Google's policies do not allow pre-filling star ratings. The link will open the review dialog for the user to rate honestly.",
      q3: "Does the user need a Google account?", a3: "Yes, Google requires users to be signed into a Google account to leave a public review.",
      q4: "Will this QR code show ads?", a4: "No. Our generator creates a clean, direct link to your Google Business page with no intermediate ads.",
      q5: "Can I use this for Yelp or TripAdvisor?", a5: "Yes, you can paste Yelp or TripAdvisor links directly into our URL QR code tool."
    }
  },
  image: {
    feats: {
      t1: "Visual Storytelling", d1: "Share portfolios, real estate photos, or event galleries with a single scan.",
      t2: "Lossless Quality", d2: "Link to high-resolution images hosted on your cloud without compressing them into the QR code.",
      t3: "Instant Gallery Access", d3: "Bypass typing long URLs and take users straight to your visual content."
    },
    faqs: {
      q1: "Do I upload the image directly?", a1: "To ensure maximum quality and speed, you should host your image on a service like Imgur or Google Drive and paste the link here.",
      q2: "What image formats are supported?", a2: "Since this links to a URL, it supports any web-standard format like JPG, PNG, WEBP, or GIF.",
      q3: "Can I link to an Instagram post instead?", a3: "Yes, for Instagram posts, we recommend using our dedicated Instagram QR Code tool for better icon integration.",
      q4: "Will the image open in full screen?", a4: "This depends on where it is hosted. Direct image links (ending in .jpg) usually open full screen in the mobile browser.",
      q5: "Is there a limit to how many images I can show?", a5: "You can link to a single image or an entire album gallery URL—it's entirely up to you."
    }
  },
  linkinbio: {
    feats: {
      t1: "Centralized Presence", d1: "Connect your physical audience to your Linktree, Bento, or custom landing page.",
      t2: "Maximize Conversions", d2: "Drive traffic from business cards directly to your digital storefront and socials.",
      t3: "Always Up To Date", d3: "Update your Link-in-bio page anytime without ever needing to reprint the QR code."
    },
    faqs: {
      q1: "Which Link-in-bio services work?", a1: "All of them! Linktree, Bento, Beacons, Carrd, or your own custom website will work perfectly.",
      q2: "Can I put this on my business card?", a2: "Yes! A Link-in-bio QR code is the modern replacement for cluttered business cards.",
      q3: "Does it work on Instagram?", a3: "While you can't scan a QR code inside the Instagram app easily, this is perfect for printing on physical media to drive traffic TO your Instagram bio.",
      q4: "Will the link ever expire?", a4: "No, our generated QR codes are static and will work forever as long as your Link-in-bio page exists.",
      q5: "Should I add a logo?", a5: "Adding your personal or brand logo to the center of the QR code drastically increases scan trust and click-through rates."
    }
  },
  video: {
    feats: {
      t1: "Engaging Content", d1: "Link to product demonstrations, real estate tours, or welcome videos instantly.",
      t2: "Platform Agnostic", d2: "Works seamlessly with Vimeo, Wistia, YouTube, or direct MP4 links.",
      t3: "High Retention", d3: "Video content delivered at the point of interest yields significantly higher engagement."
    },
    faqs: {
      q1: "Does the video play automatically?", a1: "Autoplay depends on the mobile browser's policies and the hosting platform, but the video will load instantly.",
      q2: "Can I link to a private video?", a2: "Yes, as long as the user scanning the code has the necessary permissions or the link includes an access token.",
      q3: "Is this different from the YouTube QR code?", a3: "This tool is generalized for any video platform (like Vimeo). The YouTube tool is optimized specifically for YouTube URLs.",
      q4: "Will it consume the user's mobile data?", a4: "Yes, streaming video consumes data. It's best practice to mention it's a video next to the printed QR code.",
      q5: "Can I use a direct MP4 link?", a5: "Yes, a direct MP4 URL will usually open the device's native media player."
    }
  },
  audio: {
    feats: {
      t1: "Immersive Audio", d1: "Share podcast episodes, music tracks, or audio guides for museums and real estate.",
      t2: "Broad Compatibility", d2: "Link to Spotify, Apple Podcasts, SoundCloud, or direct MP3 files.",
      t3: "Screen-Free Experience", d3: "Allow users to scan and listen while continuing to browse your physical space."
    },
    faqs: {
      q1: "Can I link to a Spotify playlist?", a1: "Yes, you can paste a Spotify playlist link. We also have a dedicated Spotify QR tool for better branding.",
      q2: "Does the audio play in the background?", a2: "Yes, most mobile browsers will continue playing audio even if the screen is locked.",
      q3: "Can I use this for museum tours?", a3: "Absolutely. Audio QR codes are the modern, hygienic replacement for physical audio guide devices.",
      q4: "What happens if I link an MP3 file?", a4: "Linking directly to an MP3 file will open a basic audio player natively in the user's browser.",
      q5: "Is it free for listeners?", a5: "Yes, scanning the code is free. Subscription requirements depend on where the audio is hosted (e.g., Apple Podcasts)."
    }
  },
  amazon: {
    feats: {
      t1: "Drive Retail Sales", d1: "Convert physical window shoppers into digital buyers with direct Amazon product links.",
      t2: "Affiliate Ready", d2: "Use your Amazon Associates affiliate links to earn commissions from physical scans.",
      t3: "Bypass Competitors", d3: "Send customers directly to your product listing, bypassing Amazon's search results."
    },
    faqs: {
      q1: "Can I use Amazon affiliate links?", a1: "Yes! Paste your short amzn.to link to track physical conversions and earn commissions.",
      q2: "Will it open the Amazon app?", a2: "Yes, most modern smartphones will intercept the Amazon link and open it directly in the native Amazon app.",
      q3: "Can I link to an Amazon storefront?", a3: "Absolutely, you can link to a specific product, a search result, or your entire Amazon brand store.",
      q4: "Does the code change if the price changes?", a4: "No, the QR code links to the ASIN/Product URL, which remains the same regardless of price changes.",
      q5: "Is it allowed by Amazon's TOS?", a5: "Yes, driving external traffic to Amazon listings is generally encouraged, especially for brand owners."
    }
  },
  booking: {
    feats: {
      t1: "Zero Friction Scheduling", d1: "Let clients book appointments, tables, or consultations right from your window display.",
      t2: "Calendar Integration", d2: "Works perfectly with Calendly, OpenTable, Acuity, and Microsoft Bookings.",
      t3: "24/7 Receptionist", d3: "Turn your static signage into an active booking agent that never sleeps."
    },
    faqs: {
      q1: "Which booking platforms are supported?", a1: "Any platform that gives you a public booking URL (Calendly, OpenTable, Eventbrite, etc.) will work.",
      q2: "Can I link to a specific date or time?", a2: "If your booking platform allows generating URLs for specific dates, yes, you can paste that exact URL.",
      q3: "Does it work for restaurant reservations?", a3: "Yes, linking directly to your Resy or OpenTable page is one of the most popular uses for this tool.",
      q4: "Will users get a calendar invite?", a4: "The calendar invite is handled entirely by your booking platform after they complete the form.",
      q5: "Do they need an app to book?", a5: "No, the booking page opens smoothly in their native mobile browser."
    }
  },
  file: {
    feats: {
      t1: "Secure File Sharing", d1: "Share Word documents, Excel spreadsheets, or ZIP archives effortlessly in meetings.",
      t2: "Direct Download Action", d2: "The link prompts an immediate, secure download to the user's device.",
      t3: "Cloud Drive Compatible", d3: "Paste links from Google Drive, Dropbox, or OneDrive for seamless cloud file sharing."
    },
    faqs: {
      q1: "What file types can I share?", a1: "You can share DOCX, XLSX, ZIP, and virtually any other file type hosted in the cloud.",
      q2: "Can I link to Google Drive?", a2: "Yes, just make sure your Google Drive link's permission is set to 'Anyone with the link'.",
      q3: "Is it safe to share files this way?", a3: "Yes, we only redirect to the secure URL you provide, maintaining the host's security protocols.",
      q4: "Can I password protect the file?", a4: "You can add a password directly on your cloud storage provider (like Dropbox).",
      q5: "Is there a download size limit?", a5: "The limit depends on your cloud provider; our QR code handles the redirection instantly regardless of size."
    }
  }
};

for (const [tool, data] of Object.entries(top10Data)) {
  if (!enData.featTools[tool]) {
    enData.featTools[tool] = data.feats;
  }
  if (!enData.faqTools[tool]) {
    enData.faqTools[tool] = data.faqs;
  }
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log("Injected top 10 feats and faqs into en/translation.json!");
