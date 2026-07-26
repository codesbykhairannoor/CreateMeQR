const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const newTools = {
  pdf: {
    type: "PDF Document",
    feats: {
      t1: "Host Menus & Docs", d1: "Upload any PDF and instantly convert it into a scannable QR code for easy mobile viewing.",
      t2: "Save on Printing", d2: "Update your PDF anytime without reprinting the QR code. Perfect for seasonal menus and catalogs.",
      t3: "Mobile Optimized", d3: "Your PDFs are displayed in a blazing-fast, mobile-friendly viewer without requiring any app downloads."
    },
    faqs: {
      q1: "Can I update the PDF later?", a1: "Yes, our dynamic PDF QR codes allow you to replace the underlying file anytime while keeping the same printed code.",
      q2: "Is there a file size limit?", a2: "You can upload PDFs up to 20MB in size, which is plenty for high-resolution menus, brochures, and catalogs.",
      q3: "Do users need a PDF reader app?", a3: "No! The PDF will open natively inside their smartphone browser instantly after scanning.",
      q4: "Can I track how many people viewed my PDF?", a4: "Yes, you can track total scans, unique visitors, and even the geographic location of your audience.",
      q5: "Does it support multiple pages?", a5: "Absolutely. Multi-page documents will be displayed in a smooth scrollable format."
    }
  },
  gforms: {
    type: "Google Forms",
    feats: {
      t1: "Instant Survey Access", d1: "Connect your Google Forms directly to a QR code. Ideal for feedback, attendance, and registrations.",
      t2: "Boost Response Rates", d2: "Remove friction by letting respondents scan and fill out your form immediately from their own devices.",
      t3: "Seamless Integration", d3: "Works perfectly with Google Forms, Microsoft Forms, and any other survey tool you prefer."
    },
    faqs: {
      q1: "How do I link my Google Form?", a1: "Just click 'Send' on your Google Form, copy the sharing link, and paste it into our generator.",
      q2: "Can I use Microsoft Forms instead?", a2: "Yes! While optimized for Google Forms, this tool works flawlessly with any web-based survey or form.",
      q3: "Is it safe for capturing personal data?", a3: "Yes, the data goes directly to your Google account. We do not intercept or store any form responses.",
      q4: "Can I customize the QR code design?", a4: "Absolutely. Add your school or company logo and match the colors to your brand identity.",
      q5: "Do I need to update the QR code if I add new questions?", a5: "No. Any changes made directly in your Google Form will automatically reflect for anyone who scans the code."
    }
  },
  greview: {
    type: "Google Review",
    feats: {
      t1: "Skyrocket 5-Star Reviews", d1: "Send customers straight to your Google Business review page with a single scan. No searching required.",
      t2: "Pre-filled 5 Stars", d2: "Our optimized routing takes them to the exact pop-up window to leave a review instantly.",
      t3: "Local SEO Dominance", d3: "More authentic reviews mean higher rankings on Google Maps and local search results."
    },
    faqs: {
      q1: "How do I find my Google Review link?", a1: "Go to your Google Business Profile, click 'Ask for reviews', and copy the provided short URL.",
      q2: "Will it automatically give me 5 stars?", a2: "It opens the review window directly. Customers still choose the rating, but the convenience heavily encourages positive reviews.",
      q3: "Can I use this for Yelp or TripAdvisor?", a3: "Yes, you can paste a link to any review platform, though we highly recommend prioritizing Google.",
      q4: "Where should I place this QR code?", a4: "Place it on receipts, checkout counters, table tents, and exit doors for maximum visibility.",
      q5: "Do customers need a Google account?", a5: "Yes, Google requires users to be logged into a Google account to leave a verified review."
    }
  },
  image: {
    type: "Image Gallery",
    feats: {
      t1: "Stunning Visual Portfolios", d1: "Share high-quality images, real estate flyers, or digital invitations in a beautiful mobile gallery.",
      t2: "Pinch & Zoom Ready", d2: "Images open in an interactive viewer that supports standard gestures like pinch-to-zoom.",
      t3: "Instant Loading", d3: "We compress and deliver your images through a global CDN so they load instantly on any connection."
    },
    faqs: {
      q1: "What image formats are supported?", a1: "We support JPG, PNG, WEBP, and GIF formats for maximum compatibility.",
      q2: "Can I upload multiple images?", a2: "Currently, this generates a landing page for a single primary image or promotional flyer.",
      q3: "Will my images lose quality?", a3: "No, we preserve the visual fidelity while optimizing the delivery speed.",
      q4: "Can I change the image later?", a4: "Yes, with dynamic QR codes, you can swap the image anytime without changing the printed code.",
      q5: "Is it good for wedding invitations?", a5: "Perfectly! It's one of the most popular uses for sharing digital save-the-dates and venue maps."
    }
  },
  linkinbio: {
    type: "Link in Bio",
    feats: {
      t1: "One Scan, All Your Links", d1: "Create a beautiful micro-landing page housing all your social profiles, websites, and content.",
      t2: "Customizable Buttons", d2: "Design your link tree with custom colors, button styles, and your own profile picture.",
      t3: "Social Media Ready", d3: "Perfect for Instagram and TikTok creators wanting to bridge offline audiences to their digital world."
    },
    faqs: {
      q1: "How many links can I add?", a1: "You can add unlimited links, though we recommend 5-7 for the best user experience.",
      q2: "Can I customize the background?", a2: "Yes, you can choose solid colors, gradients, or upload your own background image.",
      q3: "Does it work like Linktree?", a3: "Exactly! It creates a mobile-optimized hub for all your important destinations.",
      q4: "Can I track which links are clicked?", a4: "Yes, detailed analytics will show you which specific links on your page get the most traffic.",
      q5: "Can I add social media icons?", a5: "Yes, we support native icons for all major platforms like Instagram, YouTube, and X."
    }
  },
  video: {
    type: "Video",
    feats: {
      t1: "Immersive Video Playback", d1: "Link directly to promotional videos, product tutorials, or virtual real-estate tours.",
      t2: "Auto-Play Support", d2: "Configure your landing page to start playing the video the moment the QR code is scanned.",
      t3: "Universal Compatibility", d3: "Works seamlessly with YouTube, Vimeo, TikTok, or direct MP4 files."
    },
    faqs: {
      q1: "Can I upload a video directly?", a1: "For the fastest loading speeds, we recommend pasting a link to a hosted video like YouTube or Vimeo.",
      q2: "Will the video play automatically?", a2: "You can enable autoplay, but note that many mobile browsers require the video to be muted for autoplay to work.",
      q3: "Can I use this for real estate?", a3: "Absolutely! It's highly effective for linking yard signs directly to virtual home tours.",
      q4: "Does it work with TikTok videos?", a4: "Yes, you can link directly to any TikTok video URL.",
      q5: "Are there ads on the video page?", a5: "Our landing page is ad-free, though platforms like YouTube may still show their own ads."
    }
  },
  audio: {
    type: "Audio / Podcast",
    feats: {
      t1: "Share Audio Experiences", d1: "Perfect for museum audio guides, indie music releases, and podcast episodes.",
      t2: "Custom Audio Player", d2: "Scanners are greeted with a sleek, interactive audio player that works on any smartphone.",
      t3: "Background Playback", d3: "Users can minimize their browser and continue listening while doing other things on their phone."
    },
    faqs: {
      q1: "What platforms are supported?", a1: "You can link to Spotify, Apple Podcasts, SoundCloud, or direct MP3 files.",
      q2: "Can I use it for museum tours?", a2: "Yes! Placing audio QR codes next to exhibits is a modern, hygienic alternative to traditional audio guides.",
      q3: "Does it play in the background?", a3: "Yes, the audio player supports background playback on both iOS and Android devices.",
      q4: "Can I add album artwork?", a4: "Yes, the landing page will display the track's cover art prominently.",
      q5: "Is there a duration limit?", a5: "No, you can link to 3-minute songs or 3-hour podcast episodes effortlessly."
    }
  },
  amazon: {
    type: "Amazon",
    feats: {
      t1: "Boost E-commerce Sales", d1: "Direct offline buyers straight to your Amazon product listing or storefront with a single scan.",
      t2: "Product Insert Optimization", d2: "Include QR codes inside your packaging to drive repeat purchases and product registrations.",
      t3: "Bypass Competitors", d3: "Send customers directly to your listing, skipping the Amazon search results where competitors lurk."
    },
    faqs: {
      q1: "Can I link to a specific product?", a1: "Yes, just paste the direct ASIN link of your product.",
      q2: "Does it open in the Amazon app?", a2: "Yes, our deep-linking technology attempts to open the native Amazon app for a seamless checkout experience.",
      q3: "Can I track sales from the QR code?", a3: "While we track scans, you should append Amazon Attribution tags to your URL to track actual sales.",
      q4: "Is this compliant with Amazon's TOS?", a4: "Yes, directing off-Amazon traffic to your listing is highly encouraged by Amazon.",
      q5: "Can I use it for Amazon Affiliate links?", a5: "Absolutely, it's a great way for influencers to share affiliate products offline."
    }
  },
  booking: {
    type: "Online Booking",
    feats: {
      t1: "Frictionless Reservations", d1: "Let customers book tables, salon appointments, or event tickets instantly via their smartphone.",
      t2: "Integrates with Your Tools", d2: "Works flawlessly with Calendly, OpenTable, Eventbrite, and any other booking software.",
      t3: "Reduce No-Shows", d3: "The faster customers can book, the higher your conversion rates and calendar fulfillment."
    },
    faqs: {
      q1: "Does it include a booking calendar?", a1: "It connects your existing booking software (like Calendly) to a scannable QR code.",
      q2: "Can I use it for concert tickets?", a2: "Yes, linking to Ticketmaster or Eventbrite is one of its most common uses.",
      q3: "Is it good for restaurants?", a3: "Perfect for linking to OpenTable or Resy so walking customers can book future tables.",
      q4: "Can I update the booking link?", a4: "Yes, dynamic QR codes allow you to change the destination software anytime.",
      q5: "Do they need an app to book?", a5: "No, the booking page opens smoothly in their native mobile browser."
    }
  },
  file: {
    type: "File / Berkas",
    feats: {
      t1: "Secure File Sharing", d1: "Share Word documents, Excel spreadsheets, or ZIP archives effortlessly in meetings and classrooms.",
      t2: "Direct Download Action", d2: "The landing page is optimized to prompt an immediate, secure download to the user's device.",
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

const translateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=';
async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  
  // Skip translating brand names strictly
  const brands = ['Amazon', 'Google Forms', 'Google Review', 'TikTok', 'Instagram', 'YouTube', 'Vimeo', 'Spotify', 'Apple Podcasts', 'SoundCloud', 'PDF', 'Linktree', 'Google Drive', 'Dropbox', 'OneDrive', 'Word', 'Excel', 'OpenTable', 'Calendly', 'Eventbrite', 'Ticketmaster', 'Resy', 'Yelp', 'TripAdvisor', 'MP3', 'MP4', 'JPG', 'PNG', 'WEBP', 'GIF', 'ASIN', 'DOCX', 'XLSX', 'ZIP', 'QR'];
  let processedText = text;
  
  try {
    const res = await fetch(translateUrl + targetLang + '&dt=t&q=' + encodeURIComponent(processedText));
    const json = await res.json();
    let translated = json[0].map(item => item[0]).join('');
    
    // Correct brand names back if they got translated
    brands.forEach(b => {
      // Very naive fallback, for a real app we'd use placeholders during translation
      const lower = translated.toLowerCase();
      if (text.includes(b) && !lower.includes(b.toLowerCase())) {
        // Just let it be, but log it maybe
      }
    });
    
    // Hard override for types to not translate if it's a brand
    if (text === "Google Forms") return "Google Forms";
    if (text === "Google Review") return "Google Review";
    if (text === "Amazon") return "Amazon";
    if (text === "PDF Document") return "PDF"; // simplify PDF
    
    return translated;
  } catch (err) {
    console.error('Translation error for', targetLang, text);
    return text;
  }
}

async function run() {
  console.log("Translating Top 10 new tools to 30 languages...");
  
  for (const lang of languages) {
    const filePath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.types = data.types || {};
    data.featTools = data.featTools || {};
    data.faqTools = data.faqTools || {};
    
    let modified = false;
    
    for (const [toolKey, toolData] of Object.entries(newTools)) {
      if (!data.types[toolKey] || data.types[toolKey] === toolKey) {
        data.types[toolKey] = await translateText(toolData.type, lang);
        modified = true;
      }
      
      data.featTools[toolKey] = data.featTools[toolKey] || {};
      for (const [k, v] of Object.entries(toolData.feats)) {
        if (!data.featTools[toolKey][k]) {
          data.featTools[toolKey][k] = await translateText(v, lang);
          modified = true;
        }
      }
      
      data.faqTools[toolKey] = data.faqTools[toolKey] || {};
      for (const [k, v] of Object.entries(toolData.faqs)) {
        if (!data.faqTools[toolKey][k]) {
          data.faqTools[toolKey][k] = await translateText(v, lang);
          modified = true;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`[${lang}] Injected 10 new tools.`);
    } else {
      console.log(`[${lang}] Already up to date.`);
    }
    
    // Wait to avoid rate limit
    await new Promise(r => setTimeout(r, 600));
  }
  
  console.log("Done injecting Top 10 tools!");
}

run();
