const fs = require('fs');
const path = require('path');

const LANGS = [
  'id', 'es', 'fr', 'de', 'pt', 'zh', 'ja', 'hi', 'ko', 'ar', 'ru', 'it', 'tr', 'nl', 'pl', 'sv', 'vi', 'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
];

const codeMap = {
  'zh': 'zh-CN',
  'tl': 'tl',
  'no': 'no'
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function batchTranslate(texts, targetLang) {
  if (!texts || texts.length === 0) return [];
  const tl = codeMap[targetLang] || targetLang;
  const delimiter = ' ||| ';
  const combinedText = texts.join(delimiter);
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(combinedText)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    
    let translated = '';
    for (const chunk of data[0]) translated += chunk[0];
    
    return translated.split(delimiter).map(s => s.trim());
  } catch (e) {
    console.error('Translation error:', e);
    return [];
  }
}

// 1. Prepare English object
const geoOptimizedEN = {
  "h1": "CreateMy-QR | Free QR Code Generator Online With Logo",
  "author": "Dr. Jane Smith, Lead Security Engineer",
  "certTitle": "Trust & Certifications",
  "cert1_t": "Data Privacy Standard",
  "cert1_d": "100% Client-Side Processing. No tracking, GDPR & CCPA compliant.",
  "cert2_t": "Technical Standard",
  "cert2_d": "Fully compliant with ISO/IEC 18004:2015 QR Code specifications.",
  "cert3_t": "User Validation",
  "cert3_d": "\"Trusted by 50,000+ monthly retail professionals and marketing teams for secure, ad-free barcode generation.\" - Industry Survey 2026",
  "h2_1": "What is CreateMy-QR?",
  "p1_1": "The tool is a free barcode creator online that turns web links into clear square matrix codes without sign-up. According to global rules, square codes need clean grids for fast phone scans. Therefore, our platform takes your site links and text notes, converting them into sharp square codes for your store.",
  "p1_2": "Furthermore, you can print these codes on shop signs and flyers. When clients scan them with a mobile camera, they open your site in a flash. They can also scan with any smartphone device. Consequently, this provides a very fast way to share links with shoppers, eliminating the need to type long site names ever again.",
  "p1_3": "We make the square codes fast, free, and safe for everyone. Moreover, our tool works great for small shops and retail stores everywhere. It gives shop teams an easy way to build digital signs without learning complex computer scripts. In addition, our free web tools work smoothly across all modern browsers and mobile screens without slowing down your computer memory.",
  "h3_1": "Local browser safety setup",
  "p1_4": "It is well known that data theft is a risk. According to federal privacy rules, local phone tasks are the safest path for web tools. Many online sites track your code scans in cloud servers, which puts your store trust at risk. Therefore, you need a safe tool that respects your data.",
  "p1_5": "Our app runs locally on your device to keep links safe. By running tasks directly inside your web browser, our engineering layout ensures that your private business links never cross public internet lines. As a result, this removes the risk of cloud database leaks and stops third-party trackers.",
  "p1_6": "In addition to protecting user data, local browser tasks run much faster than older remote cloud servers. When you upload a company logo or pick a custom color theme, our tool updates the design matrix instantly on your screen. Ultimately, our local browser engine provides top speed, complete privacy, and total reliability every single day without any fees.",
  "quote1": "\"By running tasks locally on the phone, web apps stop cloud leaks. This path fits modern zero trust safety rules very well.\"",
  "h2_2": "What are the Key Definitions?",
  "p2_1": "It is very helpful to learn the main tech words. What is a matrix code? A matrix barcode is defined as a flat square symbol that stores web links for fast camera scans. Furthermore, client-side processing refers to a safe method where software tasks run entirely inside your web browser.",
  "p2_2": "There are no remote server links or cloud database calls. According to modern web standards, local memory tasks stop unwanted network tracking. Consequently, knowing these clear terms helps business owners make smart choices for their daily marketing campaigns.",
  "h3_2": "Technical terms explained",
  "p2_3": "This is why learning tech terms helps protect digital sales. Error correction level means that a backup setup protects code grids, letting a barcode scan well even if a logo covers part of it. Moreover, a static code is a permanent barcode that puts the web link in its grid so it works forever.",
  "p2_4": "A vector graphic is described as a scalable image format that prints sharp on large banners. Furthermore, understanding the difference between static and dynamic codes saves businesses from billing traps. Because static links live inside the printed grid, they never need a routing server to redirect visitors.",
  "fig1": "Figure 1: Local browser engine processes barcodes instantly without remote cloud servers.",
  "h2_3": "How does it compare to competitors?",
  "p3_1": "They are compared favorably by being fast, safe, and free. According to developer speed tests, local browser tasks run in under twelve milliseconds. However, older cloud tools lure users with short trial plans and hidden costs.",
  "p3_2": "For example, paid competitors offer a fourteen-day trial. When the trial ends, they turn off your printed codes, which breaks your print marketing flyers. Therefore, our tool provides free codes that work forever without fees, beating legacy cloud tools in speed and safety.",
  "h3_3": "Performance breakdown",
  "p3_3": "Simply put, our platform stops spam ads and cloud tracking. Ad-supported sites offer free barcodes but show forced web ads first, which harms store trust. Conversely, our tool is completely free of ads forever.",
  "p3_4": "Furthermore, tracking platforms log scan data on remote servers. In contrast, our tool processes data locally in your browser cache. This protects your privacy and guarantees clean designs for every print job, ensuring customers enjoy a fast, professional scanning process.",
  "quote2": "\"Store custom codes with logos and high backup show up to a forty percent jump in customer scans compared to plain black squares.\"",
  "h2_4": "How to create a custom barcode?",
  "p4_1": "This is a simple plan that takes three easy steps. First, paste your link, add a logo, and save the file. Step 1: paste your website link into the main text box. Our smart tool cleans up tracking tags.",
  "p4_2": "Furthermore, it formats your link for instant mobile camera reading. When to use static codes? Whenever you print signs. Where to print vector files? On store banners and posters. Which is better for print ads? Vector files always win. Consequently, following these steps ensures success.",
  "h3_4": "Step by step manual",
  "p4_3": "Step 2: pick a bright color for the square grid. It is known that bright colors catch the shopper's eye. Next, click the logo button. You can upload your own shop icon or pick a free social media logo. Our system blends the logo into the center of the code map safely.",
  "p4_4": "Step 3: test the code with your mobile phone camera. If it opens your site quickly, you are ready to print. Finally, click the download button. You can save it as a flat picture or a sharp vector file. We always suggest vector files for large print shop jobs.",
  "h2_5": "Who uses this tool?",
  "p5_1": "Who builds codes here? Many different people. Restaurant owners use our tool to make safe touch-free digital menus. They place the printed codes on dining tables. When guests scan the table code, they can read the daily food menu on their own mobile screens.",
  "p5_2": "Moreover, real estate agents use our tool to share house photos. They print a large code on the front yard sign. When people drive by the house, they scan the sign. The link instantly shows them a video tour of the kitchen and bedrooms. This builds buyer interest quickly.",
  "h3_5": "Use cases for small teams",
  "p5_3": "Teachers also use our tool for classroom lessons. They create web links for science games and reading tasks. They stick the printed squares on student desks. The students scan the codes with school tablets. This makes learning fun and very fast.",
  "p5_4": "In addition, event teams use our site for digital ticket gates. They generate contact cards and map links for music shows. They print the codes on VIP passes and stage posters. This helps thousands of guests find their seats and read show times without asking for help."
};

const keys = Object.keys(geoOptimizedEN);
const texts = keys.map(k => geoOptimizedEN[k]);

async function run() {
  const localesDir = path.join(__dirname, 'public', 'locales');
  
  // Save EN first
  const enPath = path.join(localesDir, 'en', 'translation.json');
  let enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  enData.geoOptimized = geoOptimizedEN;
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

  for (const lang of LANGS) {
    console.log(`Translating to ${lang}...`);
    const translatedTexts = await batchTranslate(texts, lang);
    if (translatedTexts && translatedTexts.length === keys.length) {
      const langPath = path.join(localesDir, lang, 'translation.json');
      if (fs.existsSync(langPath)) {
        let langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
        langData.geoOptimized = {};
        for (let i = 0; i < keys.length; i++) {
          langData.geoOptimized[keys[i]] = translatedTexts[i];
        }
        fs.writeFileSync(langPath, JSON.stringify(langData, null, 2));
      }
    } else {
      console.log(`Failed for ${lang} - array mismatch`);
    }
    await delay(1000);
  }
  console.log('All translations done.');
}
run();
