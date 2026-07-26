const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');
const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const infoPages = {
  about: {
    hero: {
      title: "About Us",
      subtitle: "Empowering global connections through seamless QR technology.",
      desc: "We built this platform to simplify how the world shares information. Fast, reliable, and completely private."
    },
    mission: {
      title: "Our Mission",
      desc: "To provide a premium, privacy-first QR code generator that doesn't track your data or lock your codes behind paywalls."
    },
    values: {
      title: "Core Values",
      v1: "Privacy First", d1: "Client-side generation means your data never touches our servers.",
      v2: "Free Forever", d2: "Core features will always remain free with no hidden limits.",
      v3: "Global Reach", d3: "Localized in 30 languages to serve a truly international audience."
    }
  },
  privacy: {
    hero: {
      title: "Privacy Policy",
      subtitle: "Your data is yours. We keep it that way."
    },
    sections: {
      s1: "Data Collection", d1: "We do not collect or store the data you input into the QR code generator. All generation happens locally on your device.",
      s2: "Cookies & Analytics", d2: "We use minimal analytics to understand aggregated traffic patterns. No personally identifiable information is tracked.",
      s3: "Third-Party Services", d3: "We do not sell, rent, or share your data with any third parties."
    }
  },
  terms: {
    hero: {
      title: "Terms of Service",
      subtitle: "Rules of the road for using our platform."
    },
    sections: {
      s1: "Acceptable Use", d1: "You agree not to use our generator to create QR codes that link to malicious, illegal, or harmful content.",
      s2: "Service Availability", d2: "We strive for 99.9% uptime but provide the service 'as is' without guarantees.",
      s3: "Intellectual Property", d3: "You retain all rights to the content you generate. The platform code and design belong to us."
    }
  },
  compare: {
    hero: {
      title: "Why Choose Us?",
      subtitle: "See how we stack up against the competition."
    },
    metrics: {
      title: "The Ultimate Comparison",
      m1: "Pricing", us1: "100% Free", them1: "$15/month",
      m2: "Privacy", us2: "Client-Side (No Tracking)", them2: "Server-Side Data Harvesting",
      m3: "Watermarks", us3: "None", them3: "Forced Watermarks on Free Plans",
      m4: "Expiration", us4: "Codes Never Expire", them4: "Expires after 14 days",
      m5: "Languages", us5: "30 Languages Supported", them5: "English Only"
    }
  },
  nav: {
    about: "About Us",
    privacy: "Privacy",
    terms: "Terms",
    compare: "Compare"
  }
};

const translateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=';

async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  try {
    const res = await fetch(translateUrl + targetLang + '&dt=t&q=' + encodeURIComponent(text));
    const json = await res.json();
    return json[0].map(item => item[0]).join('');
  } catch (err) {
    console.error('Translation error for', targetLang, text);
    return text;
  }
}

async function run() {
  console.log("Translating Info Pages to 30 languages...");
  
  for (const lang of languages) {
    const filePath = path.join(localesDir, lang, 'translation.json');
    if (!fs.existsSync(filePath)) continue;
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.info = data.info || {};
    
    console.log(`Processing [${lang}]...`);
    
    for (const [page, sections] of Object.entries(infoPages)) {
      data.info[page] = data.info[page] || {};
      
      if (typeof sections === 'string') {
        data.info[page] = await translateText(sections, lang);
      } else {
        for (const [sectionKey, sectionData] of Object.entries(sections)) {
          if (typeof sectionData === 'string') {
             data.info[page][sectionKey] = await translateText(sectionData, lang);
          } else {
            data.info[page][sectionKey] = data.info[page][sectionKey] || {};
            for (const [k, v] of Object.entries(sectionData)) {
              if (!data.info[page][sectionKey][k]) {
                data.info[page][sectionKey][k] = await translateText(v, lang);
              }
            }
          }
        }
      }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log("Done injecting Info Pages!");
}

run();
