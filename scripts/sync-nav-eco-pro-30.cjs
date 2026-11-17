const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const localesDir = path.join(rootDir, 'public', 'locales');
const langDirs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const translations = {
  en: {
    nav: {
      link: "Link",
      generators: "Generator",
      scanner: "Scanner",
      barcodeCreate: "Barcode Create",
      bulkTitle: "Bulk QR & Barcode Generator",
      bulkDesc: "Import CSV or Excel, generate 1,000+ codes in memory & export ZIP",
      openBulk: "Open Batch Tool",
      scanqr: "Scan QR Code",
      scanQrDesc: "Camera scanner & image decoder",
      scanbarcode: "Scan Barcode",
      scanBarcodeDesc: "UPC, EAN, Code 128 laser reader",
      searchPlaceholder: "Search 30+ QR tools (e.g. url, wifi, vcard)...",
      searchResults: "Search Results",
      noResults: "No tools found matching",
      popularTools: "Popular Tools",
      allQrTools: "All QR & Barcode Tools"
    },
    eco: {
      appsTitle: "Ecosystem Web Apps (0% Server Upload)",
      clientsTitle: "Desktop & Mobile Clients",
      companyTitle: "Company & Trust",
      pricing: "Pricing & Plans",
      privacy: "Zero-Server Privacy",
      about: "About Us & Mission",
      terms: "Terms & Legal",
      claimOffer: "Claim PRO Offer"
    },
    proAlert: {
      badge: "PRO Feature Required",
      title: "Unlock PRO Capabilities",
      desc: "This high-performance tool requires an active PRO membership or Founder Lifetime Pass. One subscription automatically unlocks all 4 web apps.",
      ecosystemNote: "Connected 4-in-1 Ecosystem Included:",
      f1Bold: "4 Web Apps in 1:",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.",
      f2Bold: "High-Res Vector SVG & PDF:",
      f2Text: "Zero rasterization limits for commercial packaging & billboards.",
      f3Bold: "100% Client-Side Privacy:",
      f3Text: "Zero server storage, zero third-party tracking, and full ISO standard compliance.",
      upgradeBtn: "View PRO & Founder Plans",
      signInBtn: "Sign In / Upgrade to PRO",
      closeBtn: "Maybe Later"
    },
    pricing_eco: {
      ecoTitle: "Connected 4-in-1 Web Ecosystem",
      ecoBadge: "Auto License Sync",
      ecoDesc: "Your Pro or Founder subscription is automatically recognized across all 4 platforms with zero extra fees."
    }
  },
  id: {
    nav: {
      link: "Tautan",
      generators: "Generator",
      scanner: "Pemindai",
      barcodeCreate: "Buat Barcode",
      bulkTitle: "Generator Massal QR & Barcode",
      bulkDesc: "Impor CSV atau Excel, buat 1.000+ kode di memori & unduh ZIP",
      openBulk: "Buka Alat Batch",
      scanqr: "Pindai Kode QR",
      scanQrDesc: "Pemindai kamera & dekoder gambar",
      scanbarcode: "Pindai Barcode",
      scanBarcodeDesc: "Pembaca laser UPC, EAN, Code 128",
      searchPlaceholder: "Cari 30+ alat QR (mis. url, wifi, vcard)...",
      searchResults: "Hasil Pencarian",
      noResults: "Tidak ada alat yang cocok dengan",
      popularTools: "Alat Populer",
      allQrTools: "Semua Alat QR & Barcode"
    },
    eco: {
      appsTitle: "Ekosistem Web Apps (0% Upload Server)",
      clientsTitle: "Aplikasi Desktop & Mobile",
      companyTitle: "Perusahaan & Kepercayaan",
      pricing: "Paket & Harga",
      privacy: "Privasi Tanpa Server",
      about: "Tentang Kami & Misi",
      terms: "Syarat & Ketentuan",
      claimOffer: "Klaim Penawaran PRO"
    },
    proAlert: {
      badge: "Fitur PRO Diperlukan",
      title: "Buka Kemampuan PRO",
      desc: "Alat berperforma tinggi ini memerlukan keanggotaan PRO aktif atau Founder Lifetime Pass. Satu langganan otomatis membuka akses di ke-4 web app.",
      ecosystemNote: "Termasuk Ekosistem 4-in-1 Terhubung:",
      f1Bold: "4 Web Apps Sekaligus:",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.",
      f2Bold: "Vektor SVG & PDF Resolusi Tinggi:",
      f2Text: "Tanpa batas rasterisasi untuk kemasan komersial & baliho cetak.",
      f3Bold: "100% Privasi di Perangkat Anda:",
      f3Text: "Tanpa penyimpanan server, tanpa pelacakan pihak ketiga, standar ISO penuh.",
      upgradeBtn: "Lihat Paket PRO & Founder",
      signInBtn: "Masuk / Upgrade ke PRO",
      closeBtn: "Nanti Saja"
    },
    pricing_eco: {
      ecoTitle: "Ekosistem Web 4-in-1 Terhubung",
      ecoBadge: "Sinkronisasi Lisensi Otomatis",
      ecoDesc: "Langganan Pro atau Founder Anda langsung aktif di seluruh 4 web app tanpa biaya tambahan."
    }
  },
  es: {
    nav: {
      link: "Enlace",
      generators: "Generador",
      scanner: "Escáner",
      barcodeCreate: "Crear Código de Barras",
      bulkTitle: "Generador Masivo de QR y Códigos de Barras",
      bulkDesc: "Importe CSV o Excel, genere más de 1,000 códigos en memoria y exporte ZIP",
      openBulk: "Abrir Herramienta por Lotes",
      scanqr: "Escanear Código QR",
      scanQrDesc: "Escáner de cámara y decodificador de imágenes",
      scanbarcode: "Escanear Código de Barras",
      scanBarcodeDesc: "Lector láser UPC, EAN, Code 128",
      searchPlaceholder: "Buscar entre más de 30 herramientas QR...",
      searchResults: "Resultados de Búsqueda",
      noResults: "No se encontraron herramientas que coincidan con",
      popularTools: "Herramientas Populares",
      allQrTools: "Todas las Herramientas QR y Código de Barras"
    },
    eco: {
      appsTitle: "Aplicaciones Web del Ecosistema (0% Servidor)",
      clientsTitle: "Clientes de Escritorio y Móviles",
      companyTitle: "Empresa y Confianza",
      pricing: "Precios y Planes",
      privacy: "Privacidad Sin Servidor",
      about: "Nosotros y Misión",
      terms: "Términos Legales",
      claimOffer: "Reclamar Oferta PRO"
    },
    proAlert: {
      badge: "Función PRO Requerida",
      title: "Desbloquear Capacidades PRO",
      desc: "Esta herramienta requiere una membresía PRO activa o Founder Lifetime Pass. Una suscripción desbloquea automáticamente las 4 aplicaciones web.",
      ecosystemNote: "Ecosistema 4 en 1 Conectado Incluido:",
      f1Bold: "4 Aplicaciones Web en 1:",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG y SolveMyMedia.",
      f2Bold: "Vector SVG y PDF de Alta Resolución:",
      f2Text: "Sin límites de rasterización para empaques comerciales y vallas publicitarias.",
      f3Bold: "100% Privacidad del Cliente:",
      f3Text: "Cero almacenamiento en el servidor, cero seguimiento y cumplimiento total con ISO.",
      upgradeBtn: "Ver Planes PRO y Founder",
      signInBtn: "Iniciar Sesión / Mejorar a PRO",
      closeBtn: "Quizás más tarde"
    },
    pricing_eco: {
      ecoTitle: "Ecosistema Web Conectado 4 en 1",
      ecoBadge: "Sincronización Automática",
      ecoDesc: "Su suscripción Pro o Founder se reconoce automáticamente en las 4 plataformas sin cargos adicionales."
    }
  },
  fr: {
    nav: {
      link: "Lien",
      generators: "Générateur",
      scanner: "Scanner",
      barcodeCreate: "Créer un Code-Barres",
      bulkTitle: "Générateur en Lot de QR & Codes-Barres",
      bulkDesc: "Importez CSV ou Excel, générez 1 000+ codes en mémoire & exportez en ZIP",
      openBulk: "Ouvrir l'Outil par Lot",
      scanqr: "Scanner le Code QR",
      scanQrDesc: "Scanner caméra & décodeur d'images",
      scanbarcode: "Scanner le Code-Barres",
      scanBarcodeDesc: "Lecteur laser UPC, EAN, Code 128",
      searchPlaceholder: "Rechercher parmi 30+ outils QR...",
      searchResults: "Résultats de Recherche",
      noResults: "Aucun outil trouvé pour",
      popularTools: "Outils Populaires",
      allQrTools: "Tous les Outils QR & Codes-Barres"
    },
    eco: {
      appsTitle: "Applications Web de l'Écosystème (0% Serveur)",
      clientsTitle: "Clients Desktop & Mobile",
      companyTitle: "Entreprise & Confiance",
      pricing: "Tarifs & Forfaits",
      privacy: "Confidentialité Sans Serveur",
      about: "À Propos & Mission",
      terms: "Conditions & Mentions Légales",
      claimOffer: "Profiter de l'Offre PRO"
    },
    proAlert: {
      badge: "Fonction PRO Requise",
      title: "Débloquer les Fonctionnalités PRO",
      desc: "Cet outil haute performance nécessite un abonnement PRO actif ou un Pass Founder à vie. Un abonnement débloque automatiquement les 4 applications web.",
      ecosystemNote: "Écosystème 4-en-1 Connecté Inclus :",
      f1Bold: "4 Applications Web en 1 :",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.",
      f2Bold: "Vecteur SVG & PDF Haute Résolution :",
      f2Text: "Aucune limite de pixellisation pour l'emballage commercial et l'affichage.",
      f3Bold: "100% Confidentialité Client :",
      f3Text: "Zéro stockage serveur, zéro suivi tiers et conformité ISO totale.",
      upgradeBtn: "Voir les Forfaits PRO & Founder",
      signInBtn: "Se Connecter / Passer à PRO",
      closeBtn: "Plus Tard"
    },
    pricing_eco: {
      ecoTitle: "Écosystème Web Connecté 4-en-1",
      ecoBadge: "Synchronisation Automatique",
      ecoDesc: "Votre abonnement Pro ou Founder est automatiquement reconnu sur les 4 plateformes sans frais supplémentaires."
    }
  },
  de: {
    nav: {
      link: "Link",
      generators: "Generator",
      scanner: "Scanner",
      barcodeCreate: "Barcode Erstellen",
      bulkTitle: "Massen-QR & Barcode-Generator",
      bulkDesc: "CSV oder Excel importieren, 1.000+ Codes im Speicher erstellen & als ZIP exportieren",
      openBulk: "Batch-Tool Öffnen",
      scanqr: "QR-Code Scannen",
      scanQrDesc: "Kamera-Scanner & Bild-Decoder",
      scanbarcode: "Barcode Scannen",
      scanBarcodeDesc: "UPC, EAN, Code 128 Laser-Leser",
      searchPlaceholder: "30+ QR-Tools durchsuchen...",
      searchResults: "Suchergebnisse",
      noResults: "Keine passenden Tools gefunden für",
      popularTools: "Beliebte Tools",
      allQrTools: "Alle QR- & Barcode-Tools"
    },
    eco: {
      appsTitle: "Ökosystem-Web-Apps (0% Server-Upload)",
      clientsTitle: "Desktop- & Mobil-Clients",
      companyTitle: "Unternehmen & Vertrauen",
      pricing: "Preise & Pläne",
      privacy: "Zero-Server-Datenschutz",
      about: "Über Uns & Mission",
      terms: "AGB & Rechtliches",
      claimOffer: "PRO-Angebot Sichern"
    },
    proAlert: {
      badge: "PRO-Funktion Erforderlich",
      title: "PRO-Funktionen Freischalten",
      desc: "Dieses Hochleistungstool erfordert eine aktive PRO-Mitgliedschaft oder einen Founder Lifetime Pass. Ein Abonnement schaltet alle 4 Web-Apps frei.",
      ecosystemNote: "Enthaltenes 4-in-1 Ökosystem:",
      f1Bold: "4 Web-Apps in 1:",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia.",
      f2Bold: "Hochauflösendes Vektor-SVG & PDF:",
      f2Text: "Keine Rasterbeschränkungen für Verpackungs- und Großformatdruck.",
      f3Bold: "100% Client-Datenschutz:",
      f3Text: "Keine Serverspeicherung, kein Tracking von Drittanbietern und ISO-Standardkonformität.",
      upgradeBtn: "PRO- & Founder-Pläne Anzeigen",
      signInBtn: "Anmelden / Auf PRO Upgraden",
      closeBtn: "Vielleicht Später"
    },
    pricing_eco: {
      ecoTitle: "Vernetztes 4-in-1 Web-Ökosystem",
      ecoBadge: "Automatische Lizenz-Synchronisierung",
      ecoDesc: "Ihr Pro- oder Founder-Abonnement wird automatisch auf allen 4 Plattformen ohne Zusatzgebühren erkannt."
    }
  },
  zh: {
    nav: {
      link: "链接",
      generators: "生成器",
      scanner: "扫描器",
      barcodeCreate: "创建条形码",
      bulkTitle: "批量 QR 和条形码生成器",
      bulkDesc: "导入 CSV 或 Excel，在内存中生成 1,000+ 代码并导出 ZIP",
      openBulk: "打开批量工具",
      scanqr: "扫描二维码",
      scanQrDesc: "相机扫描仪和图像解码器",
      scanbarcode: "扫描条形码",
      scanBarcodeDesc: "UPC, EAN, Code 128 激光读取器",
      searchPlaceholder: "搜索 30+ 种 QR 工具...",
      searchResults: "搜索结果",
      noResults: "未找到匹配的工具",
      popularTools: "常用工具",
      allQrTools: "所有 QR 和条形码工具"
    },
    eco: {
      appsTitle: "生态系统网络应用 (0% 服务器上传)",
      clientsTitle: "桌面和移动客户端",
      companyTitle: "公司与信任",
      pricing: "定价与方案",
      privacy: "零服务器隐私",
      about: "关于我们与使命",
      terms: "条款与法律",
      claimOffer: "获取 PRO 特惠"
    },
    proAlert: {
      badge: "需要 PRO 功能",
      title: "解锁 PRO 强大能力",
      desc: "该高性能工具需要有效的 PRO 会员或 Founder 终身通行证。单一订阅自动解锁全部 4 款网络应用。",
      ecosystemNote: "包含 4 合 1 联动生态系统：",
      f1Bold: "4 款网络应用合一：",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG 与 SolveMyMedia。",
      f2Bold: "高分辨率矢量 SVG 和 PDF：",
      f2Text: "无光栅化限制，满足商业包装与户外巨幅广告需求。",
      f3Bold: "100% 客户端隐私保护：",
      f3Text: "零服务器存储，零第三方追踪，完全符合 ISO 标准。",
      upgradeBtn: "查看 PRO 和 Founder 方案",
      signInBtn: "登录 / 升级至 PRO",
      closeBtn: "稍后再说"
    },
    pricing_eco: {
      ecoTitle: "联动 4 合 1 网络生态系统",
      ecoBadge: "自动授权同步",
      ecoDesc: "您的 Pro 或 Founder 订阅将在所有 4 个平台上自动识别，无需额外费用。"
    }
  },
  ja: {
    nav: {
      link: "リンク",
      generators: "ジェネレーター",
      scanner: "スキャナー",
      barcodeCreate: "バーコード作成",
      bulkTitle: "一括 QR & バーコードジェネレーター",
      bulkDesc: "CSV または Excel をインポートし、メモリ内で 1,000 以上のコードを生成して ZIP 出力",
      openBulk: "一括ツールを開く",
      scanqr: "QR コードをスキャン",
      scanQrDesc: "カメラスキャナー & 画像デコーダー",
      scanbarcode: "バーコードをスキャン",
      scanBarcodeDesc: "UPC, EAN, Code 128 レーザーリーダー",
      searchPlaceholder: "30 以上の QR ツールを検索...",
      searchResults: "検索結果",
      noResults: "一致するツールが見つかりません",
      popularTools: "人気のツール",
      allQrTools: "すべての QR & バーコードツール"
    },
    eco: {
      appsTitle: "エコシステム Web アプリ (サーバー送信 0%)",
      clientsTitle: "デスクトップ & モバイルアプリ",
      companyTitle: "会社概要 & 信頼性",
      pricing: "料金プラン",
      privacy: "サーバー非送信のプライバシー",
      about: "私たちについて & ミッション",
      terms: "利用規約 & 法的情報",
      claimOffer: "PRO 特典を入手"
    },
    proAlert: {
      badge: "PRO 機能が必要です",
      title: "PRO 機能のロックを解除",
      desc: "この高機能ツールには有効な PRO メンバーシップまたは Founder Lifetime Pass が必要です。1 つのサブスクリプションで 4 つの Web アプリすべてが利用可能です。",
      ecosystemNote: "4-in-1 連携エコシステムが含まれます：",
      f1Bold: "4 つの Web アプリが 1 つに：",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG & SolveMyMedia。",
      f2Bold: "高解像度ベクター SVG & PDF：",
      f2Text: "商業パッケージや看板印刷に最適な無劣化フォーマット。",
      f3Bold: "100% クライアントサイドのプライバシー：",
      f3Text: "サーバー保管ゼロ、サードパーティ追跡ゼロ、完全な ISO 規格準拠。",
      upgradeBtn: "PRO & Founder プランを見る",
      signInBtn: "ログイン / PRO にアップグレード",
      closeBtn: "後で"
    },
    pricing_eco: {
      ecoTitle: "連携する 4-in-1 Web エコシステム",
      ecoBadge: "ライセンス自動同期",
      ecoDesc: "Pro または Founder サブスクリプションは、追加料金なしで 4 つのプラットフォームすべてで自動認識されます。"
    }
  },
  pt: {
    nav: {
      link: "Link",
      generators: "Gerador",
      scanner: "Scanner",
      barcodeCreate: "Criar Código de Barras",
      bulkTitle: "Gerador em Lote de QR e Código de Barras",
      bulkDesc: "Importe CSV ou Excel, gere 1.000+ códigos em memória e exporte ZIP",
      openBulk: "Abrir Ferramenta em Lote",
      scanqr: "Escanear Código QR",
      scanQrDesc: "Scanner de câmera e decodificador de imagem",
      scanbarcode: "Escanear Código de Barras",
      scanBarcodeDesc: "Leitor a laser UPC, EAN, Code 128",
      searchPlaceholder: "Pesquisar mais de 30 ferramentas QR...",
      searchResults: "Resultados da Pesquisa",
      noResults: "Nenhuma ferramenta encontrada para",
      popularTools: "Ferramentas Populares",
      allQrTools: "Todas as Ferramentas de QR e Código de Barras"
    },
    eco: {
      appsTitle: "Aplicativos Web do Ecossistema (0% Servidor)",
      clientsTitle: "Clientes Desktop e Mobile",
      companyTitle: "Empresa e Confiança",
      pricing: "Preços e Planos",
      privacy: "Privacidade Sem Servidor",
      about: "Sobre Nós e Missão",
      terms: "Termos e Informações Legais",
      claimOffer: "Garantir Oferta PRO"
    },
    proAlert: {
      badge: "Recurso PRO Necessário",
      title: "Desbloquear Recursos PRO",
      desc: "Esta ferramenta avançada requer uma assinatura PRO ativa ou Founder Lifetime Pass. Uma assinatura desbloqueia automaticamente todos os 4 aplicativos da web.",
      ecosystemNote: "Ecossistema Conectado 4 em 1 Incluído:",
      f1Bold: "4 Aplicativos Web em 1:",
      f1Text: "CreateMy-QR, HandleMyFile, HelpMyIMG e SolveMyMedia.",
      f2Bold: "Vetor SVG e PDF de Alta Resolução:",
      f2Text: "Sem limites de rasterização para embalagens comerciais e outdoors.",
      f3Bold: "100% de Privacidade no Cliente:",
      f3Text: "Zero armazenamento no servidor, zero rastreamento de terceiros e total conformidade com a ISO.",
      upgradeBtn: "Ver Planos PRO e Founder",
      signInBtn: "Entrar / Atualizar para PRO",
      closeBtn: "Talvez mais tarde"
    },
    pricing_eco: {
      ecoTitle: "Ecossistema Web 4 em 1 Conectado",
      ecoBadge: "Sincronização Automática",
      ecoDesc: "Sua assinatura Pro ou Founder é reconhecida automaticamente nas 4 plataformas sem taxas extras."
    }
  }
};

// Default fallback generator for other languages using English defaults with localized titles if available
function getLocalizedPackage(lang) {
  if (translations[lang]) return translations[lang];

  // If language has partial support or fallback, clone EN
  const base = JSON.parse(JSON.stringify(translations.en));
  return base;
}

let modifiedCount = 0;

langDirs.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (!fs.existsSync(filePath)) return;

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const pack = getLocalizedPackage(lang);

    // Merge nav keys
    if (!data.nav) data.nav = {};
    Object.keys(pack.nav).forEach(k => {
      data.nav[k] = pack.nav[k];
    });

    // Merge eco keys
    if (!data.eco) data.eco = {};
    Object.keys(pack.eco).forEach(k => {
      data.eco[k] = pack.eco[k];
    });

    // Merge proAlert keys
    if (!data.proAlert) data.proAlert = {};
    Object.keys(pack.proAlert).forEach(k => {
      data.proAlert[k] = pack.proAlert[k];
    });

    // Merge static.pricing ecosystem keys
    if (!data.static) data.static = {};
    if (!data.static.pricing) data.static.pricing = {};
    Object.keys(pack.pricing_eco).forEach(k => {
      data.static.pricing[k] = pack.pricing_eco[k];
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    modifiedCount++;
  } catch (err) {
    console.error(`Error processing ${lang}:`, err.message);
  }
});

// Also sync src/locales/en/translation.json if it exists
const srcEnPath = path.join(rootDir, 'src', 'locales', 'en', 'translation.json');
if (fs.existsSync(srcEnPath)) {
  const raw = fs.readFileSync(srcEnPath, 'utf-8');
  const data = JSON.parse(raw);
  const pack = translations.en;
  if (!data.nav) data.nav = {};
  Object.keys(pack.nav).forEach(k => { data.nav[k] = pack.nav[k]; });
  if (!data.eco) data.eco = {};
  Object.keys(pack.eco).forEach(k => { data.eco[k] = pack.eco[k]; });
  if (!data.proAlert) data.proAlert = {};
  Object.keys(pack.proAlert).forEach(k => { data.proAlert[k] = pack.proAlert[k]; });
  if (!data.static) data.static = {};
  if (!data.static.pricing) data.static.pricing = {};
  Object.keys(pack.pricing_eco).forEach(k => { data.static.pricing[k] = pack.pricing_eco[k]; });
  fs.writeFileSync(srcEnPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Synced src/locales/en/translation.json');
}

console.log(`Successfully updated ${modifiedCount} locale files in public/locales!`);
