const fs = require('fs');
const path = require('path');

const translations = {
  "en": {
    "insights_badge": "PRO GUIDE",
    "insights_title": "Expert Insights & Best Practices",
    "insights_desc": "Essential strategies to ensure your digital workflow is always accessible, scannable, and up-to-date."
  },
  "id": {
    "insights_badge": "PANDUAN PRO",
    "insights_title": "Wawasan Ahli & Praktik Terbaik",
    "insights_desc": "Strategi esensial untuk memastikan alur kerja digital Anda selalu dapat diakses, dipindai, dan selalu mutakhir."
  },
  "es": {
    "insights_badge": "GUÍA PRO",
    "insights_title": "Perspectivas de Expertos y Mejores Prácticas",
    "insights_desc": "Estrategias esenciales para garantizar que su flujo de trabajo digital sea siempre accesible, escaneable y actualizado."
  },
  "fr": {
    "insights_badge": "GUIDE PRO",
    "insights_title": "Avis d'Experts et Bonnes Pratiques",
    "insights_desc": "Stratégies essentielles pour garantir que votre flux de travail numérique est toujours accessible, lisible et à jour."
  },
  "de": {
    "insights_badge": "PRO-LEITFADEN",
    "insights_title": "Experteneinblicke & Best Practices",
    "insights_desc": "Wesentliche Strategien, um sicherzustellen, dass Ihr digitaler Workflow immer zugänglich, scannbar und aktuell ist."
  },
  "pt": {
    "insights_badge": "GUIA PRO",
    "insights_title": "Dicas de Especialistas e Melhores Práticas",
    "insights_desc": "Estratégias essenciais para garantir que seu fluxo de trabalho digital seja sempre acessível, escaneável e atualizado."
  },
  "zh": {
    "insights_badge": "专业指南",
    "insights_title": "专家见解与最佳实践",
    "insights_desc": "确保您的数字工作流始终可访问、可扫描和最新的基本策略。"
  },
  "ja": {
    "insights_badge": "プロガイド",
    "insights_title": "専門家の洞察とベストプラクティス",
    "insights_desc": "デジタルワークフローを常にアクセス可能、スキャン可能、最新の状態に保つための不可欠な戦略。"
  },
  "hi": {
    "insights_badge": "प्रो गाइड",
    "insights_title": "विशेषज्ञ अंतर्दृष्टि और सर्वोत्तम प्रथाएं",
    "insights_desc": "यह सुनिश्चित करने के लिए आवश्यक रणनीतियां कि आपका डिजिटल वर्कफ़्लो हमेशा सुलभ, स्कैन करने योग्य और अद्यतित रहे।"
  },
  "ko": {
    "insights_badge": "프로 가이드",
    "insights_title": "전문가 인사이트 및 모범 사례",
    "insights_desc": "디지털 워크플로에 항상 액세스할 수 있고 스캔할 수 있으며 최신 상태를 유지하기 위한 필수 전략입니다."
  },
  "ar": {
    "insights_badge": "دليل احترافي",
    "insights_title": "رؤى الخبراء وأفضل الممارسات",
    "insights_desc": "استراتيجيات أساسية لضمان بقاء سير عملك الرقمي دائمًا قابلاً للوصول والمسح والتحديث."
  },
  "ru": {
    "insights_badge": "ПРО-РУКОВОДСТВО",
    "insights_title": "Мнения экспертов и передовой опыт",
    "insights_desc": "Важнейшие стратегии для обеспечения доступности, сканируемости и актуальности вашего цифрового рабочего процесса."
  },
  "it": {
    "insights_badge": "GUIDA PRO",
    "insights_title": "Approfondimenti di Esperti e Migliori Pratiche",
    "insights_desc": "Strategie essenziali per garantire che il tuo flusso di lavoro digitale sia sempre accessibile, scansionabile e aggiornato."
  },
  "tr": {
    "insights_badge": "PRO REHBER",
    "insights_title": "Uzman Görüşleri ve En İyi Uygulamalar",
    "insights_desc": "Dijital iş akışınızın her zaman erişilebilir, taranabilir ve güncel kalmasını sağlamak için temel stratejiler."
  },
  "nl": {
    "insights_badge": "PRO-GIDS",
    "insights_title": "Inzichten van Experts & Best Practices",
    "insights_desc": "Essentiële strategieën om ervoor te zorgen dat uw digitale workflow altijd toegankelijk, scanbaar en up-to-date is."
  },
  "pl": {
    "insights_badge": "PRZEWODNIK PRO",
    "insights_title": "Porady Ekspertów i Najlepsze Praktyki",
    "insights_desc": "Kluczowe strategie zapewniające, że Twój cyfrowy obieg pracy będzie zawsze dostępny, łatwy do zeskanowania i aktualny."
  },
  "sv": {
    "insights_badge": "PRO-GUIDE",
    "insights_title": "Expertinsikter och Bästa Praxis",
    "insights_desc": "Viktiga strategier för att säkerställa att ditt digitala arbetsflöde alltid är tillgängligt, skanningsbart och uppdaterat."
  },
  "vi": {
    "insights_badge": "HƯỚNG DẪN PRO",
    "insights_title": "Ý kiến Chuyên gia & Phương pháp Tốt nhất",
    "insights_desc": "Các chiến lược cần thiết để đảm bảo quy trình làm việc kỹ thuật số của bạn luôn có thể truy cập, quét được và cập nhật."
  },
  "th": {
    "insights_badge": "คู่มือโปร",
    "insights_title": "ข้อมูลเชิงลึกจากผู้เชี่ยวชาญ & แนวทางปฏิบัติที่ดีที่สุด",
    "insights_desc": "กลยุทธ์ที่สำคัญเพื่อให้แน่ใจว่าเวิร์กโฟลว์ดิจิทัลของคุณสามารถเข้าถึงได้ สแกนได้ และทันสมัยอยู่เสมอ"
  },
  "el": {
    "insights_badge": "ΟΔΗΓΟΣ PRO",
    "insights_title": "Απόψεις Ειδικών & Βέλτιστες Πρακτικές",
    "insights_desc": "Βασικές στρατηγικές για να διασφαλίσετε ότι η ψηφιακή σας ροή εργασίας είναι πάντα προσβάσιμη, ανιχνεύσιμη και ενημερωμένη."
  },
  "cs": {
    "insights_badge": "PRO PRŮVODCE",
    "insights_title": "Pohledy Odborníků a Nejlepší Praxe",
    "insights_desc": "Zásadní strategie k zajištění toho, že váš digitální pracovní tok bude vždy dostupný, skenovatelný a aktuální."
  },
  "da": {
    "insights_badge": "PRO-GUIDE",
    "insights_title": "Ekspertindsigter & Bedste Praksis",
    "insights_desc": "Væsentlige strategier til at sikre, at din digitale arbejdsgang altid er tilgængelig, scanningsbar og opdateret."
  },
  "fi": {
    "insights_badge": "PRO-OPAS",
    "insights_title": "Asiantuntijoiden Nykemykset & Parhaat Käytännöt",
    "insights_desc": "Keskeisiä strategioita varmistamaan, että digitaalinen työnkulkusi on aina saavutettava, skannattava ja ajan tasalla."
  },
  "no": {
    "insights_badge": "PRO-GUIDE",
    "insights_title": "Ekspertinnsikt & Beste Praksis",
    "insights_desc": "Viktige strategier for å sikre at din digitale arbeidsflyt alltid er tilgjengelig, skannbar og oppdatert."
  },
  "hu": {
    "insights_badge": "PRO ÚTMUTATÓ",
    "insights_title": "Szakértői Meglátások és Legjobb Gyakorlatok",
    "insights_desc": "Alapvető stratégiák annak biztosítására, hogy digitális munkafolyamata mindig elérhető, beolvasható és naprakész legyen."
  },
  "ro": {
    "insights_badge": "GHID PRO",
    "insights_title": "Perspective de Experți & Cele mai bune Practici",
    "insights_desc": "Strategii esențiale pentru a asigura că fluxul dvs. de lucru digital este întotdeauna accesibil, scanabil și actualizat."
  },
  "uk": {
    "insights_badge": "ПРО-ПОСІБНИК",
    "insights_title": "Думки Експертів та Передовий Досвід",
    "insights_desc": "Важливі стратегії для забезпечення того, щоб ваш цифровий робочий процес завжди був доступним, сканованим та актуальним."
  },
  "ms": {
    "insights_badge": "PANDUAN PRO",
    "insights_title": "Pandangan Pakar & Amalan Terbaik",
    "insights_desc": "Strategi penting untuk memastikan aliran kerja digital anda sentiasa boleh diakses, boleh diimbas dan dikemas kini."
  },
  "tl": {
    "insights_badge": "PRO GABAY",
    "insights_title": "Mga Insight ng Eksperto at Pinakamahusay na Kasanayan",
    "insights_desc": "Mahahalagang diskarte para matiyak na ang iyong digital workflow ay palaging naa-access, na-scan, at up-to-date."
  },
  "bn": {
    "insights_badge": "প্রো গাইড",
    "insights_title": "বিশেষজ্ঞদের মতামত ও সেরা অনুশীলন",
    "insights_desc": "আপনার ডিজিটাল ওয়ার্কফ্লো সবসময় অ্যাক্সেসযোগ্য, স্ক্যানযোগ্য এবং আপ-টু-ডেট তা নিশ্চিত করার জন্য প্রয়োজনীয় কৌশল।"
  }
};

const localesDir = path.join(__dirname, 'public', 'locales');
const langs = Object.keys(translations);

langs.forEach(lang => {
  const transPath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(transPath)) {
    const data = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    
    if (!data.pseo) {
      data.pseo = {};
    }
    
    data.pseo.insights_badge = translations[lang].insights_badge;
    data.pseo.insights_title = translations[lang].insights_title;
    data.pseo.insights_desc = translations[lang].insights_desc;
    
    fs.writeFileSync(transPath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${lang}/translation.json`);
  } else {
    console.warn(`File not found: ${transPath}`);
  }
});
