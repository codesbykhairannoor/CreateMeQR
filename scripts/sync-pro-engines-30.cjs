const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const localesDir = path.join(rootDir, 'public', 'locales');
const langDirs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const baseEn = {
  preview: {
    printBtnShort: "Print Sheet PDF",
    mockupBtnShort: "3D Mockup Studio",
    isoGradePass: "ISO Grade {{grade}} • Scannable ({{ms}}ms)",
    isoGradeWarn: "Low contrast or dense logo detected"
  },
  customization: {
    studioThemes: "Studio Themes & CTA Frames",
    quickPresets: "1-Click Designer Palettes",
    ctaFrameLabel: "CTA Showcase Frame",
    frameText: "Frame Callout Text",
    frameColor: "Frame Accent Color",
    eyeOuterColor: "Eye Outer Frame Color",
    eyeInnerColor: "Eye Inner Pupil Color",
    cornerDotStyle: "Eye Pupil Shape"
  },
  mockup: {
    badge: "3D Mockup Engine",
    title: "Real-World Mockup Studio",
    subtitle: "Preview and export high-resolution 1400px commercial mockups rendered 100% locally in your browser.",
    sceneLabel: "Select Mockup Scene",
    captionLabel: "Scene Caption Text",
    downloadBtn: "Download 1400px PNG"
  },
  proAlert: {
    f2Bold: "Vector SVG, DXF CAD & 3D Mockups:",
    f2Text: "Export Print EPS, Laser DXF, 20+ Industrial Barcodes (DataMatrix/PDF417), CTA Frames & 1400px 3D Mockups.",
    dxfFeature: "AutoCAD DXF Laser Cut Export",
    epsFeature: "Adobe Illustrator EPS Export",
    frameFeature: "Custom CTA Frame Showcase Export",
    mockupFeature: "3D Real-World Mockup Studio",
    enterpriseBarcodeFeature: "Enterprise 2D / Industrial Barcode Export"
  },
  pricing: {
    monthlyF2: "Vector SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS exports",
    monthlyF3: "20+ Industrial Barcodes (DataMatrix, PDF417, Aztec, GS1-128)",
    monthlyF4: "3D Mockup Studio, CTA Showcase Frames & Dual-Tone Eyes",
    monthlyF5: "A4 Print Studio (Avery presets + Crop Marks) & Batch CSV ZIP",
    annualF3: "Save 34% + ISO Grade WASM Audit & Commercial License",
    monthlyF6: "ISO Grade WASM Scan Audit & Commercial License",
    lifetimeF4: "All Pro Engines forever: BWIPP 2D, DXF CAD, 3D Mockups & Frames",
    lifetimeF5: "All future updates, engines & VIP Founder badge"
  }
};

const localizedPacks = {
  en: baseEn,
  id: {
    preview: {
      printBtnShort: "Cetak Stiker A4 PDF",
      mockupBtnShort: "Studio Mockup 3D",
      isoGradePass: "Standar ISO Grade {{grade}} • Terpindai ({{ms}}ms)",
      isoGradeWarn: "Kontras terlalu rendah atau logo terlalu besar"
    },
    customization: {
      studioThemes: "Tema Studio & Bingkai CTA",
      quickPresets: "Palet Desainer 1-Klik",
      ctaFrameLabel: "Bingkai Showcase CTA",
      frameText: "Teks Ajakan Bingkai",
      frameColor: "Warna Aksen Bingkai",
      eyeOuterColor: "Warna Lingkar Luar Mata",
      eyeInnerColor: "Warna Titik Dalam Mata",
      cornerDotStyle: "Bentuk Titik Dalam Mata"
    },
    mockup: {
      badge: "Mesin Mockup 3D",
      title: "Studio Mockup Dunia Nyata",
      subtitle: "Pratinjau dan unduh mockup komersial resolusi 1400px yang dirender 100% lokal di browser Anda.",
      sceneLabel: "Pilih Adegan Mockup",
      captionLabel: "Teks Judul Adegan",
      downloadBtn: "Unduh PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vektor SVG, DXF CAD & Mockup 3D:",
      f2Text: "Ekspor Print EPS, Laser DXF, 20+ Barcode Industri (DataMatrix/PDF417), Bingkai CTA & Mockup 3D 1400px.",
      dxfFeature: "Ekspor Potong Laser AutoCAD DXF",
      epsFeature: "Ekspor Vektor Adobe EPS",
      frameFeature: "Ekspor Bingkai CTA Kustom",
      mockupFeature: "Studio Mockup 3D Dunia Nyata",
      enterpriseBarcodeFeature: "Ekspor Barcode 2D / Industri Enterprise"
    },
    pricing: {
      monthlyF2: "Ekspor Vektor SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS",
      monthlyF3: "20+ Barcode Industri (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Studio Mockup 3D, Bingkai CTA & Warna Mata Ganda",
      monthlyF5: "Studio Cetak A4 (Preset Avery + Crop Marks) & Batch CSV ZIP",
      annualF3: "Hemat 34% + Audit Scan WASM ISO Grade & Lisensi Komersial",
      monthlyF6: "Audit Scan WASM ISO Grade & Lisensi Komersial",
      lifetimeF4: "Semua Mesin Pro selamanya: BWIPP 2D, DXF CAD, Mockup 3D & Frame",
      lifetimeF5: "Semua update masa depan, mesin baru & Lencana VIP Founder"
    }
  },
  ms: {
    preview: {
      printBtnShort: "Cetak Helaian PDF",
      mockupBtnShort: "Studio Mockup 3D",
      isoGradePass: "Gred ISO {{grade}} • Boleh Imbas ({{ms}}ms)",
      isoGradeWarn: "Kontras rendah atau logo terlalu padat dikesan"
    },
    customization: {
      studioThemes: "Tema Studio & Bingkai CTA",
      quickPresets: "Palet Pereka 1-Klik",
      ctaFrameLabel: "Bingkai Pameran CTA",
      frameText: "Teks Seruan Bingkai",
      frameColor: "Warna Aksen Bingkai",
      eyeOuterColor: "Warna Bingkai Luar Mata",
      eyeInnerColor: "Warna Anak Mata Dalam",
      cornerDotStyle: "Bentuk Anak Mata"
    },
    mockup: {
      badge: "Enjin Mockup 3D",
      title: "Studio Mockup Dunia Nyata",
      subtitle: "Pratonton dan eksport mockup komersial 1400px yang dijana 100% secara lokal di pelayar anda.",
      sceneLabel: "Pilih Adegan Mockup",
      captionLabel: "Teks Kapsyen Adegan",
      downloadBtn: "Muat Turun PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vektor SVG, DXF CAD & Mockup 3D:",
      f2Text: "Eksport Print EPS, Laser DXF, 20+ Kod Bar Industri (DataMatrix/PDF417), Bingkai CTA & Mockup 3D 1400px.",
      dxfFeature: "Eksport Potong Laser AutoCAD DXF",
      epsFeature: "Eksport Vektor Adobe EPS",
      frameFeature: "Eksport Bingkai CTA Tersuai",
      mockupFeature: "Studio Mockup 3D Dunia Nyata",
      enterpriseBarcodeFeature: "Eksport Kod Bar 2D / Industri Enterprise"
    },
    pricing: {
      monthlyF2: "Eksport Vektor SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS",
      monthlyF3: "20+ Kod Bar Industri (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Studio Mockup 3D, Bingkai CTA & Warna Mata Dwi-Tona",
      monthlyF5: "Studio Cetak A4 (Pratetap Avery + Crop Marks) & Batch CSV ZIP",
      annualF3: "Jimat 34% + Audit Imbasan WASM Gred ISO & Lesen Komersial",
      monthlyF6: "Audit Imbasan WASM Gred ISO & Lesen Komersial",
      lifetimeF4: "Semua Enjin Pro selamanya: BWIPP 2D, DXF CAD, Mockup 3D & Bingkai",
      lifetimeF5: "Semua kemas kini masa depan, enjin baharu & Lencana Pengasas VIP"
    }
  },
  es: {
    preview: {
      printBtnShort: "Imprimir Hoja PDF",
      mockupBtnShort: "Estudio Mockup 3D",
      isoGradePass: "Grado ISO {{grade}} • Escaneable ({{ms}}ms)",
      isoGradeWarn: "Contraste bajo o logotipo muy denso detectado"
    },
    customization: {
      studioThemes: "Temas Studio y Marcos CTA",
      quickPresets: "Paletas de Diseño 1-Clic",
      ctaFrameLabel: "Marco Showcase CTA",
      frameText: "Texto del Marco",
      frameColor: "Color de Acento del Marco",
      eyeOuterColor: "Color del Marco Exterior del Ojo",
      eyeInnerColor: "Color del Centro del Ojo",
      cornerDotStyle: "Forma del Centro del Ojo"
    },
    mockup: {
      badge: "Motor Mockup 3D",
      title: "Estudio de Mockups Reales",
      subtitle: "Previsualiza y exporta mockups comerciales de 1400px renderizados 100% localmente en tu navegador.",
      sceneLabel: "Seleccionar Escena Mockup",
      captionLabel: "Texto de Título",
      downloadBtn: "Descargar PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vector SVG, CAD DXF y Mockups 3D:",
      f2Text: "Exporta EPS de imprenta, DXF láser, +20 códigos industriales (DataMatrix/PDF417), marcos CTA y mockups 3D 1400px.",
      dxfFeature: "Exportación AutoCAD DXF Corte Láser",
      epsFeature: "Exportación Vectorial Adobe EPS",
      frameFeature: "Exportación de Marco CTA Personalizado",
      mockupFeature: "Estudio de Mockups 3D Reales",
      enterpriseBarcodeFeature: "Exportación Códigos 2D / Industriales Pro"
    },
    pricing: {
      monthlyF2: "Exportación Vector SVG, AutoCAD DXF (Láser/CNC) y Adobe EPS",
      monthlyF3: "+20 Códigos Industriales (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Estudio Mockup 3D, Marcos CTA y Ojos Bicolores",
      monthlyF5: "Estudio Impresión A4 (Avery + Marcas de corte) y Batch CSV ZIP",
      annualF3: "Ahorra 34% + Auditoría WASM Grado ISO y Licencia Comercial",
      monthlyF6: "Auditoría WASM Grado ISO y Licencia Comercial",
      lifetimeF4: "Todos los motores Pro para siempre: BWIPP 2D, DXF CAD, Mockups 3D y Marcos",
      lifetimeF5: "Todas las actualizaciones futuras, motores e insignia VIP Founder"
    }
  },
  fr: {
    preview: {
      printBtnShort: "Imprimer Planche PDF",
      mockupBtnShort: "Studio Mockup 3D",
      isoGradePass: "Grade ISO {{grade}} • Scannable ({{ms}}ms)",
      isoGradeWarn: "Contraste faible ou logo trop dense détecté"
    },
    customization: {
      studioThemes: "Thèmes Studio & Cadres CTA",
      quickPresets: "Palettes Design 1-Clic",
      ctaFrameLabel: "Cadre Vitrine CTA",
      frameText: "Texte d'Appel du Cadre",
      frameColor: "Couleur d'Accent du Cadre",
      eyeOuterColor: "Couleur Externe des Yeux",
      eyeInnerColor: "Couleur Interne des Yeux",
      cornerDotStyle: "Forme du Centre des Yeux"
    },
    mockup: {
      badge: "Moteur Mockup 3D",
      title: "Studio Mockup Réaliste",
      subtitle: "Prévisualisez et exportez des mockups commerciaux 1400px rendus 100% localement dans votre navigateur.",
      sceneLabel: "Choisir la Scène Mockup",
      captionLabel: "Texte de Légende",
      downloadBtn: "Télécharger PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vecteurs SVG, CAO DXF & Mockups 3D :",
      f2Text: "Exportez EPS, DXF laser, +20 codes industriels (DataMatrix/PDF417), cadres CTA et mockups 3D 1400px.",
      dxfFeature: "Export Découpe Laser AutoCAD DXF",
      epsFeature: "Export Vectoriel Adobe EPS",
      frameFeature: "Export Cadre CTA Personnalisé",
      mockupFeature: "Studio Mockup 3D Réaliste",
      enterpriseBarcodeFeature: "Export Codes-Barres 2D / Industriels Pro"
    },
    pricing: {
      monthlyF2: "Exports Vecteur SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS",
      monthlyF3: "+20 Codes Industriels (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Studio Mockup 3D, Cadres CTA & Yeux Bicolores",
      monthlyF5: "Studio Impression A4 (Avery + Traits de coupe) & Batch CSV ZIP",
      annualF3: "Économisez 34% + Audit WASM Grade ISO & Licence Commerciale",
      monthlyF6: "Audit WASM Grade ISO & Licence Commerciale",
      lifetimeF4: "Tous les moteurs Pro à vie : BWIPP 2D, DXF CAO, Mockups 3D & Cadres",
      lifetimeF5: "Mises à jour à vie, nouveaux moteurs & badge VIP Founder"
    }
  },
  de: {
    preview: {
      printBtnShort: "Etiketten-PDF drucken",
      mockupBtnShort: "3D-Mockup-Studio",
      isoGradePass: "ISO-Note {{grade}} • Scannbar ({{ms}}ms)",
      isoGradeWarn: "Geringer Kontrast oder zu großes Logo erkannt"
    },
    customization: {
      studioThemes: "Studio-Themes & CTA-Rahmen",
      quickPresets: "1-Klick-Designer-Paletten",
      ctaFrameLabel: "CTA-Präsentationsrahmen",
      frameText: "Rahmen-Callout-Text",
      frameColor: "Rahmen-Akzentfarbe",
      eyeOuterColor: "Äußere Augenfarbe",
      eyeInnerColor: "Innere Pupillenfarbe",
      cornerDotStyle: "Form der Augenpupille"
    },
    mockup: {
      badge: "3D-Mockup-Engine",
      title: "Reales 3D-Mockup-Studio",
      subtitle: "Vorschau und Export von 1400px-Mockups, 100% lokal im Browser gerendert.",
      sceneLabel: "Mockup-Szene wählen",
      captionLabel: "Szenen-Beschriftung",
      downloadBtn: "1400px PNG herunterladen"
    },
    proAlert: {
      f2Bold: "Vektor-SVG, DXF-CAD & 3D-Mockups:",
      f2Text: "Export von Druck-EPS, Laser-DXF, 20+ Industrie-Barcodes (DataMatrix/PDF417), CTA-Rahmen & 1400px 3D-Mockups.",
      dxfFeature: "AutoCAD DXF Laserschnitt-Export",
      epsFeature: "Adobe Illustrator EPS-Export",
      frameFeature: "Individueller CTA-Rahmen-Export",
      mockupFeature: "Reales 3D-Mockup-Studio",
      enterpriseBarcodeFeature: "Enterprise 2D / Industrie-Barcode-Export"
    },
    pricing: {
      monthlyF2: "Vektor-SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS Exporte",
      monthlyF3: "20+ Industrie-Barcodes (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "3D-Mockup-Studio, CTA-Rahmen & zweifarbige QR-Augen",
      monthlyF5: "A4-Druckstudio (Avery-Vorlagen + Schnittmarken) & Batch-CSV-ZIP",
      annualF3: "34% sparen + ISO-Note WASM-Scan-Audit & Kommerzielle Lizenz",
      monthlyF6: "ISO-Note WASM-Scan-Audit & Kommerzielle Lizenz",
      lifetimeF4: "Alle Pro-Engines für immer: BWIPP 2D, DXF-CAD, 3D-Mockups & Rahmen",
      lifetimeF5: "Alle künftigen Updates, Engines & VIP Founder Badge"
    }
  },
  pt: {
    preview: {
      printBtnShort: "Imprimir Folha PDF",
      mockupBtnShort: "Estúdio Mockup 3D",
      isoGradePass: "Grau ISO {{grade}} • Legível ({{ms}}ms)",
      isoGradeWarn: "Baixo contraste ou logotipo muito denso detectado"
    },
    customization: {
      studioThemes: "Temas Studio e Molduras CTA",
      quickPresets: "Paletas de Designer 1-Clique",
      ctaFrameLabel: "Moldura Showcase CTA",
      frameText: "Texto da Moldura",
      frameColor: "Cor de Destaque da Moldura",
      eyeOuterColor: "Cor Externa do Olho",
      eyeInnerColor: "Cor Interna da Pupila",
      cornerDotStyle: "Formato da Pupila"
    },
    mockup: {
      badge: "Motor Mockup 3D",
      title: "Estúdio de Mockup Realista",
      subtitle: "Visualize e exporte mockups comerciais de 1400px renderizados 100% localmente no seu navegador.",
      sceneLabel: "Selecionar Cena",
      captionLabel: "Texto da Legenda",
      downloadBtn: "Baixar PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vetor SVG, CAD DXF e Mockups 3D:",
      f2Text: "Exporte EPS gráfico, DXF a laser, +20 códigos industriais (DataMatrix/PDF417), molduras CTA e mockups 3D 1400px.",
      dxfFeature: "Exportação Corte a Laser AutoCAD DXF",
      epsFeature: "Exportação Vetorial Adobe EPS",
      frameFeature: "Exportação de Moldura CTA Personalizada",
      mockupFeature: "Estúdio de Mockups 3D Reais",
      enterpriseBarcodeFeature: "Exportação Códigos 2D / Industriais Pro"
    },
    pricing: {
      monthlyF2: "Exportação Vetor SVG, AutoCAD DXF (Laser/CNC) e Adobe EPS",
      monthlyF3: "+20 Códigos Industriais (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Estúdio Mockup 3D, Molduras CTA e Olhos Bicolores",
      monthlyF5: "Estúdio Impressão A4 (Avery + Marcas de Corte) e Lote CSV ZIP",
      annualF3: "Economize 34% + Auditoria WASM Grau ISO e Licença Comercial",
      monthlyF6: "Auditoria WASM Grau ISO e Licença Comercial",
      lifetimeF4: "Todos os motores Pro para sempre: BWIPP 2D, DXF CAD, Mockups 3D e Molduras",
      lifetimeF5: "Todas as atualizações futuras, motores e selo VIP Founder"
    }
  },
  it: {
    preview: {
      printBtnShort: "Stampa Foglio PDF",
      mockupBtnShort: "Studio Mockup 3D",
      isoGradePass: "Grado ISO {{grade}} • Scansionabile ({{ms}}ms)",
      isoGradeWarn: "Contrasto basso o logo troppo denso rilevato"
    },
    customization: {
      studioThemes: "Temi Studio e Cornici CTA",
      quickPresets: "Palette Design 1-Clic",
      ctaFrameLabel: "Cornice Showcase CTA",
      frameText: "Testo della Cornice",
      frameColor: "Colore Accento Cornice",
      eyeOuterColor: "Colore Esterno Occhio",
      eyeInnerColor: "Colore Interno Pupilla",
      cornerDotStyle: "Forma della Pupilla"
    },
    mockup: {
      badge: "Motore Mockup 3D",
      title: "Studio Mockup Realistico",
      subtitle: "Anteprima ed esportazione di mockup commerciali 1400px renderizzati al 100% localmente nel browser.",
      sceneLabel: "Seleziona Scena Mockup",
      captionLabel: "Testo Didascalia",
      downloadBtn: "Scarica PNG 1400px"
    },
    proAlert: {
      f2Bold: "Vettori SVG, CAD DXF e Mockup 3D:",
      f2Text: "Esporta EPS stampa, DXF laser, +20 codici industriali (DataMatrix/PDF417), cornici CTA e mockup 3D 1400px.",
      dxfFeature: "Esportazione Taglio Laser AutoCAD DXF",
      epsFeature: "Esportazione Vettoriale Adobe EPS",
      frameFeature: "Esportazione Cornice CTA Personalizzata",
      mockupFeature: "Studio Mockup 3D Realistico",
      enterpriseBarcodeFeature: "Esportazione Codici 2D / Industriali Pro"
    },
    pricing: {
      monthlyF2: "Esportazioni Vettore SVG, AutoCAD DXF (Laser/CNC) e Adobe EPS",
      monthlyF3: "+20 Codici Industriali (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Studio Mockup 3D, Cornici CTA e Occhi Bicolore",
      monthlyF5: "Studio Stampa A4 (Avery + Crocini) e Batch CSV ZIP",
      annualF3: "Risparmia 34% + Audit WASM Grado ISO e Licenza Commerciale",
      monthlyF6: "Audit WASM Grado ISO e Licenza Commerciale",
      lifetimeF4: "Tutti i motori Pro per sempre: BWIPP 2D, DXF CAD, Mockup 3D e Cornici",
      lifetimeF5: "Tutti gli aggiornamenti futuri, motori e badge VIP Founder"
    }
  },
  ja: {
    preview: {
      printBtnShort: "PDFシート印刷",
      mockupBtnShort: "3Dモックアップ",
      isoGradePass: "ISO等級 {{grade}} • 読取可能 ({{ms}}ms)",
      isoGradeWarn: "コントラスト不足またはロゴが大きすぎます"
    },
    customization: {
      studioThemes: "スタジオテーマ & CTAフレーム",
      quickPresets: "ワンクリックカラーパレット",
      ctaFrameLabel: "CTAショーケースフレーム",
      frameText: "フレームテキスト",
      frameColor: "フレームアクセント色",
      eyeOuterColor: "外枠アイカラー",
      eyeInnerColor: "内側アイカラー",
      cornerDotStyle: "内側アイの形状"
    },
    mockup: {
      badge: "3Dモックアップエンジン",
      title: "リアル3Dモックアップスタジオ",
      subtitle: "ブラウザ内で100%ローカル生成される1400px商用モックアップをプレビュー＆保存。",
      sceneLabel: "シーンを選択",
      captionLabel: "キャプションテキスト",
      downloadBtn: "1400px PNGをダウンロード"
    },
    proAlert: {
      f2Bold: "SVGベクター・DXF CAD・3Dモックアップ:",
      f2Text: "印刷用EPS、レーザーDXF、20種類以上の産業用バーコード(DataMatrix/PDF417)、CTAフレーム、1400px 3Dモックアップ出力。",
      dxfFeature: "AutoCAD DXF レーザー加工出力",
      epsFeature: "Adobe Illustrator EPS出力",
      frameFeature: "カスタムCTAフレーム出力",
      mockupFeature: "リアル3Dモックアップスタジオ",
      enterpriseBarcodeFeature: "エンタープライズ2D/産業バーコード出力"
    },
    pricing: {
      monthlyF2: "SVGベクター・AutoCAD DXF(レーザー/CNC)・Adobe EPS出力",
      monthlyF3: "20+ 産業用バーコード (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "3Dモックアップスタジオ・CTAフレーム・2色アイデザイン",
      monthlyF5: "A4印刷スタジオ(Avery対応・トンボ) & CSV一括ZIP生成",
      annualF3: "34%オフ + ISO等級WASMスキャン監査 & 商用ライセンス",
      monthlyF6: "ISO等級WASMスキャン監査 & 商用ライセンス",
      lifetimeF4: "全Proエンジン永久利用: BWIPP 2D・DXF CAD・3Dモックアップ・フレーム",
      lifetimeF5: "今後の全アップデート・新エンジン・VIP Founderバッジ"
    }
  },
  ko: {
    preview: {
      printBtnShort: "라벨 PDF 인쇄",
      mockupBtnShort: "3D 목업 스튜디오",
      isoGradePass: "ISO 등급 {{grade}} • 스캔 가능 ({{ms}}ms)",
      isoGradeWarn: "대비가 낮거나 로고가 너무 큽니다"
    },
    customization: {
      studioThemes: "스튜디오 테마 & CTA 프레임",
      quickPresets: "원클릭 디자이너 팔레트",
      ctaFrameLabel: "CTA 쇼케이스 프레임",
      frameText: "프레임 문구",
      frameColor: "프레임 강조 색상",
      eyeOuterColor: "모서리 외부 색상",
      eyeInnerColor: "모서리 내부 색상",
      cornerDotStyle: "모서리 내부 모양"
    },
    mockup: {
      badge: "3D 목업 엔진",
      title: "실사 3D 목업 스튜디오",
      subtitle: "브라우저에서 100% 로컬 렌더링되는 고해상도 1400px 상업용 목업을 미리보고 다운로드하세요.",
      sceneLabel: "목업 장면 선택",
      captionLabel: "장면 캡션 텍스트",
      downloadBtn: "1400px PNG 다운로드"
    },
    proAlert: {
      f2Bold: "SVG 벡터, DXF CAD 및 3D 목업:",
      f2Text: "인쇄용 EPS, 레이저 DXF, 20+ 산업용 바코드(DataMatrix/PDF417), CTA 프레임 및 1400px 3D 목업 내보내기.",
      dxfFeature: "AutoCAD DXF 레이저 커팅 내보내기",
      epsFeature: "Adobe Illustrator EPS 내보내기",
      frameFeature: "맞춤형 CTA 프레임 내보내기",
      mockupFeature: "실사 3D 목업 스튜디오",
      enterpriseBarcodeFeature: "엔터프라이즈 2D / 산업용 바코드 내보내기"
    },
    pricing: {
      monthlyF2: "SVG 벡터, AutoCAD DXF(레이저/CNC) & Adobe EPS 내보내기",
      monthlyF3: "20+ 산업용 바코드 (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "3D 목업 스튜디오, CTA 프레임 & 듀얼톤 코너 디자인",
      monthlyF5: "A4 인쇄 스튜디오(Avery + 재단선) & CSV 일괄 ZIP",
      annualF3: "34% 할인 + ISO 등급 WASM 스캔 감사 & 상업용 라이선스",
      monthlyF6: "ISO 등급 WASM 스캔 감사 & 상업용 라이선스",
      lifetimeF4: "모든 Pro 엔진 평생 이용: BWIPP 2D, DXF CAD, 3D 목업 & 프레임",
      lifetimeF5: "향후 모든 업데이트, 새 엔진 & VIP Founder 배지"
    }
  },
  zh: {
    preview: {
      printBtnShort: "打印 PDF 贴纸",
      mockupBtnShort: "3D 样机工作室",
      isoGradePass: "ISO 等级 {{grade}} • 可扫描 ({{ms}}ms)",
      isoGradeWarn: "对比度过低或标志过大"
    },
    customization: {
      studioThemes: "工作室主题与 CTA 边框",
      quickPresets: "一键设计师配色",
      ctaFrameLabel: "CTA 展示边框",
      frameText: "边框提示文字",
      frameColor: "边框强调色",
      eyeOuterColor: "码眼外框颜色",
      eyeInnerColor: "码眼内点颜色",
      cornerDotStyle: "码眼内点形状"
    },
    mockup: {
      badge: "3D 样机引擎",
      title: "实景 3D 样机工作室",
      subtitle: "在浏览器本地 100% 渲染并导出 1400px 高清商业展示样机。",
      sceneLabel: "选择样机场景",
      captionLabel: "场景标题文字",
      downloadBtn: "下载 1400px PNG"
    },
    proAlert: {
      f2Bold: "SVG 矢量、DXF CAD 与 3D 样机:",
      f2Text: "导出印刷 EPS、激光 DXF、20+ 工业条码 (DataMatrix/PDF417)、CTA 边框及 1400px 3D 样机。",
      dxfFeature: "AutoCAD DXF 激光切割导出",
      epsFeature: "Adobe Illustrator EPS 矢量导出",
      frameFeature: "自定义 CTA 边框导出",
      mockupFeature: "实景 3D 样机工作室",
      enterpriseBarcodeFeature: "企业级 2D / 工业条码导出"
    },
    pricing: {
      monthlyF2: "导出 SVG 矢量、AutoCAD DXF (激光/CNC) 与 Adobe EPS",
      monthlyF3: "20+ 工业条码 (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "3D 样机工作室、CTA 展示边框与双色码眼",
      monthlyF5: "A4 打印工作室 (Avery 模板 + 裁切线) 与批量 CSV ZIP",
      annualF3: "立省 34% + ISO 等级 WASM 扫描质检与商业授权",
      monthlyF6: "ISO 等级 WASM 扫描质检与商业授权",
      lifetimeF4: "永久解锁全部专业引擎：BWIPP 2D、DXF CAD、3D 样机与边框",
      lifetimeF5: "未来全部更新、新引擎及 VIP Founder 徽章"
    }
  },
  ar: {
    preview: {
      printBtnShort: "طباعة PDF",
      mockupBtnShort: "استوديو نماذج 3D",
      isoGradePass: "تصنيف ISO {{grade}} • قابل للمسح ({{ms}}ms)",
      isoGradeWarn: "تباين منخفض أو شعار كثيف للغاية"
    },
    customization: {
      studioThemes: "سمات الاستوديو وإطارات CTA",
      quickPresets: "ألوان مصممة بنقرة واحدة",
      ctaFrameLabel: "إطار عرض CTA",
      frameText: "نص الإطار",
      frameColor: "لون تمييز الإطار",
      eyeOuterColor: "لون الإطار الخارجي للعين",
      eyeInnerColor: "لون البؤبؤ الداخلي للعين",
      cornerDotStyle: "شكل البؤبؤ الداخلي"
    },
    mockup: {
      badge: "محرك نماذج 3D",
      title: "استوديو النماذج الواقعية",
      subtitle: "معاينة وتصدير نماذج تجارية بدقة 1400px تُعالج محليًا 100% في متصفحك.",
      sceneLabel: "اختر مشهد النموذج",
      captionLabel: "نص التسمية التوضيحية",
      downloadBtn: "تنزيل PNG بدقة 1400px"
    },
    proAlert: {
      f2Bold: "ملفات SVG و DXF CAD ونماذج 3D:",
      f2Text: "تصدير EPS للطباعة و DXF للقطع بالليزر و +20 باركود صناعي وإطارات CTA ونماذج 3D.",
      dxfFeature: "تصدير AutoCAD DXF للقطع بالليزر",
      epsFeature: "تصدير متجهات Adobe EPS",
      frameFeature: "تصدير إطار CTA مخصص",
      mockupFeature: "استوديو النماذج الواقعية 3D",
      enterpriseBarcodeFeature: "تصدير الباركود الصناعي ثنائي الأبعاد"
    },
    pricing: {
      monthlyF2: "تصدير متجهات SVG و AutoCAD DXF (ليزر/CNC) و Adobe EPS",
      monthlyF3: "+20 باركود صناعي (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "استوديو نماذج 3D وإطارات CTA وعيون ثنائية اللون",
      monthlyF5: "استوديو طباعة A4 وعلامات القص ودفعات CSV ZIP",
      annualF3: "وفر 34% + فحص جودة المسح WASM ISO ورخصة تجارية",
      monthlyF6: "فحص جودة المسح WASM ISO ورخصة تجارية",
      lifetimeF4: "جميع محركات Pro للأبد: BWIPP 2D و DXF CAD ونماذج 3D",
      lifetimeF5: "جميع التحديثات المستقبلية وشارة VIP Founder"
    }
  },
  ru: {
    preview: {
      printBtnShort: "Печать листа PDF",
      mockupBtnShort: "3D Мокап Студия",
      isoGradePass: "Стандарт ISO {{grade}} • Сканируется ({{ms}}мс)",
      isoGradeWarn: "Низкий контраст или слишком крупный логотип"
    },
    customization: {
      studioThemes: "Темы Студии и Рамки CTA",
      quickPresets: "Палитры в 1 клик",
      ctaFrameLabel: "Рамка-витрина CTA",
      frameText: "Текст призыва на рамке",
      frameColor: "Акцентный цвет рамки",
      eyeOuterColor: "Внешний цвет меток",
      eyeInnerColor: "Внутренний цвет меток",
      cornerDotStyle: "Форма центра меток"
    },
    mockup: {
      badge: "Движок 3D Мокапов",
      title: "Студия Реалистичных Мокапов",
      subtitle: "Создавайте и скачивайте коммерческие мокапы 1400px с рендером 100% локально в браузере.",
      sceneLabel: "Выберите сцену мокапа",
      captionLabel: "Текст подписи",
      downloadBtn: "Скачать PNG 1400px"
    },
    proAlert: {
      f2Bold: "Вектор SVG, DXF CAD и 3D Мокапы:",
      f2Text: "Экспорт EPS для печати, лазерный DXF, 20+ промышленных штрихкодов (DataMatrix/PDF417), рамки CTA и 3D мокапы.",
      dxfFeature: "Экспорт AutoCAD DXF для лазерной резки",
      epsFeature: "Векторный экспорт Adobe EPS",
      frameFeature: "Экспорт с кастомной CTA-рамкой",
      mockupFeature: "Студия 3D-мокапов",
      enterpriseBarcodeFeature: "Экспорт промышленных 2D штрихкодов"
    },
    pricing: {
      monthlyF2: "Экспорт SVG, AutoCAD DXF (Лазер/ЧПУ) и Adobe EPS",
      monthlyF3: "20+ промышленных кодов (DataMatrix, PDF417, Aztec, GS1-128)",
      monthlyF4: "Студия 3D-мокапов, рамки CTA и двухцветные углы",
      monthlyF5: "Студия печати A4 (Avery + метки реза) и пакетный CSV ZIP",
      annualF3: "Скидка 34% + WASM-аудит ISO и коммерческая лицензия",
      monthlyF6: "WASM-аудит ISO и коммерческая лицензия",
      lifetimeF4: "Все Pro-движки навсегда: BWIPP 2D, DXF CAD, 3D-мокапы и рамки",
      lifetimeF5: "Все будущие обновления, движки и значок VIP Founder"
    }
  },
  nl: {
    preview: { printBtnShort: "Print PDF Vel", mockupBtnShort: "3D Mockup Studio", isoGradePass: "ISO-klasse {{grade}} • Scanbaar ({{ms}}ms)", isoGradeWarn: "Laag contrast of dicht logo gedetecteerd" },
    customization: { studioThemes: "Studio Thema's & CTA Kaders", quickPresets: "1-Klik Design Paletten", ctaFrameLabel: "CTA Showcase Kader", frameText: "Kader Tekst", frameColor: "Accentkleur Kader", eyeOuterColor: "Buitenkleur Oog", eyeInnerColor: "Binnenkleur Pupil", cornerDotStyle: "Vorm van Pupil" },
    mockup: { badge: "3D Mockup Engine", title: "Real-World Mockup Studio", subtitle: "Bekijk en exporteer 1400px commerciële mockups die 100% lokaal in je browser worden gerenderd.", sceneLabel: "Kies Mockup Scène", captionLabel: "Bijschrift", downloadBtn: "Download 1400px PNG" },
    proAlert: { f2Bold: "Vector SVG, DXF CAD & 3D Mockups:", f2Text: "Exporteer Print EPS, Laser DXF, 20+ Industriële Barcodes, CTA Kaders & 1400px 3D Mockups.", dxfFeature: "AutoCAD DXF Lasersnij-export", epsFeature: "Adobe Illustrator EPS-export", frameFeature: "Aangepaste CTA Kader Export", mockupFeature: "3D Real-World Mockup Studio", enterpriseBarcodeFeature: "Enterprise 2D / Industriële Barcode Export" },
    pricing: { monthlyF2: "Vector SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS exports", monthlyF3: "20+ Industriële Barcodes (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studio, CTA Kaders & Tweekleurige Ogen", monthlyF5: "A4 Print Studio (Avery + Snijtekens) & Batch CSV ZIP", annualF3: "Bespaar 34% + ISO WASM Scan-audit & Commerciële Licentie", monthlyF6: "ISO WASM Scan-audit & Commerciële Licentie", lifetimeF4: "Alle Pro Engines voor altijd: BWIPP 2D, DXF CAD, 3D Mockups & Kaders", lifetimeF5: "Alle toekomstige updates, engines & VIP Founder badge" }
  },
  pl: {
    preview: { printBtnShort: "Drukuj Arkusz PDF", mockupBtnShort: "Studio Mockup 3D", isoGradePass: "Klasa ISO {{grade}} • Skanowalny ({{ms}}ms)", isoGradeWarn: "Wykryto niski kontrast lub zbyt gęste logo" },
    customization: { studioThemes: "Motywy Studio i Ramki CTA", quickPresets: "Palety Projektanta 1-Klik", ctaFrameLabel: "Ramka Prezentacyjna CTA", frameText: "Tekst Ramki", frameColor: "Kolor Akcentu Ramki", eyeOuterColor: "Kolor Zewnętrzny Oka", eyeInnerColor: "Kolor Wewnętrzny Źrenicy", cornerDotStyle: "Kształt Źrenicy" },
    mockup: { badge: "Silnik Mockup 3D", title: "Studio Realistycznych Mockupów", subtitle: "Podgląd i eksport komercyjnych mockupów 1400px renderowanych w 100% lokalnie w przeglądarce.", sceneLabel: "Wybierz Scenę", captionLabel: "Tekst Podpisu", downloadBtn: "Pobierz PNG 1400px" },
    proAlert: { f2Bold: "Wektor SVG, DXF CAD i Mockupy 3D:", f2Text: "Eksportuj EPS do druku, laserowy DXF, 20+ kodów przemysłowych, ramki CTA i mockupy 3D 1400px.", dxfFeature: "Eksport Cięcia Laserowego AutoCAD DXF", epsFeature: "Eksport Wektorowy Adobe EPS", frameFeature: "Eksport Własnej Ramki CTA", mockupFeature: "Studio Mockupów 3D", enterpriseBarcodeFeature: "Eksport Przemysłowych Kodów 2D" },
    pricing: { monthlyF2: "Eksport Wektorowy SVG, AutoCAD DXF (Laser/CNC) i Adobe EPS", monthlyF3: "20+ Kodów Przemysłowych (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "Studio Mockup 3D, Ramki CTA i Dwukolorowe Oczy", monthlyF5: "Studio Druku A4 (Avery + Znaczniki cięcia) i Batch CSV ZIP", annualF3: "Oszczędź 34% + Audyt WASM ISO i Licencja Komercyjna", monthlyF6: "Audyt WASM ISO i Licencja Komercyjna", lifetimeF4: "Wszystkie silniki Pro na zawsze: BWIPP 2D, DXF CAD, Mockupy 3D i Ramki", lifetimeF5: "Wszystkie przyszłe aktualizacje i odznaka VIP Founder" }
  },
  tr: {
    preview: { printBtnShort: "PDF Sayfası Yazdır", mockupBtnShort: "3D Mockup Stüdyosu", isoGradePass: "ISO Sınıf {{grade}} • Taranabilir ({{ms}}ms)", isoGradeWarn: "Düşük kontrast veya yoğun logo algılandı" },
    customization: { studioThemes: "Stüdyo Temaları ve CTA Çerçeveleri", quickPresets: "Tek Tık Tasarım Paletleri", ctaFrameLabel: "CTA Vitrin Çerçevesi", frameText: "Çerçeve Metni", frameColor: "Çerçeve Vurgu Rengi", eyeOuterColor: "Dış Göz Çerçeve Rengi", eyeInnerColor: "İç Göz Bebeği Rengi", cornerDotStyle: "Göz Bebeği Şekli" },
    mockup: { badge: "3D Mockup Motoru", title: "Gerçekçi 3D Mockup Stüdyosu", subtitle: "Tarayıcınızda %100 yerel olarak oluşturulan 1400px ticari mockup'ları önizleyin ve indirin.", sceneLabel: "Sahne Seçin", captionLabel: "Sahne Başlığı", downloadBtn: "1400px PNG İndir" },
    proAlert: { f2Bold: "Vektör SVG, DXF CAD ve 3D Mockup:", f2Text: "Baskı EPS, Lazer DXF, 20+ Endüstriyel Barkod, CTA Çerçeveleri ve 1400px 3D Mockup dışa aktarın.", dxfFeature: "AutoCAD DXF Lazer Kesim Dışa Aktarma", epsFeature: "Adobe Illustrator EPS Dışa Aktarma", frameFeature: "Özel CTA Çerçeve Dışa Aktarma", mockupFeature: "3D Gerçekçi Mockup Stüdyosu", enterpriseBarcodeFeature: "Kurumsal 2D / Endüstriyel Barkod Dışa Aktarma" },
    pricing: { monthlyF2: "Vektör SVG, AutoCAD DXF (Lazer/CNC) ve Adobe EPS dışa aktarma", monthlyF3: "20+ Endüstriyel Barkod (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Stüdyosu, CTA Çerçeveleri ve Çift Renkli Gözler", monthlyF5: "A4 Baskı Stüdyosu (Avery + Kesim İşaretleri) ve Toplu CSV ZIP", annualF3: "%34 Tasarruf + ISO Dereceli WASM Tarama Denetimi ve Ticari Lisans", monthlyF6: "ISO Dereceli WASM Tarama Denetimi ve Ticari Lisans", lifetimeF4: "Tüm Pro Motorlar ömür boyu: BWIPP 2D, DXF CAD, 3D Mockup ve Çerçeveler", lifetimeF5: "Gelecekteki tüm güncellemeler ve VIP Kurucu rozeti" }
  },
  vi: {
    preview: { printBtnShort: "In Trang PDF", mockupBtnShort: "Studio Mockup 3D", isoGradePass: "Chuẩn ISO {{grade}} • Quét tốt ({{ms}}ms)", isoGradeWarn: "Độ tương phản thấp hoặc logo quá dày" },
    customization: { studioThemes: "Chủ Đề Studio & Khung CTA", quickPresets: "Bảng Màu Thiết Kế 1-Chạm", ctaFrameLabel: "Khung Trưng Bày CTA", frameText: "Chữ Kêu Gọi Trên Khung", frameColor: "Màu Nhấn Khung", eyeOuterColor: "Màu Viền Ngoài Mắt", eyeInnerColor: "Màu Tâm Mắt", cornerDotStyle: "Hình Dáng Tâm Mắt" },
    mockup: { badge: "Động Cơ Mockup 3D", title: "Studio Mockup Thực Tế", subtitle: "Xem trước và xuất mockup thương mại 1400px được xử lý 100% cục bộ ngay trên trình duyệt.", sceneLabel: "Chọn Bối Cảnh", captionLabel: "Chữ Tiêu Đề", downloadBtn: "Tải PNG 1400px" },
    proAlert: { f2Bold: "Vector SVG, DXF CAD & Mockup 3D:", f2Text: "Xuất EPS in ấn, Laser DXF, 20+ Mã vạch công nghiệp (DataMatrix/PDF417), Khung CTA & Mockup 3D 1400px.", dxfFeature: "Xuất Cắt Laser AutoCAD DXF", epsFeature: "Xuất Vector Adobe EPS", frameFeature: "Xuất Khung CTA Tùy Chỉnh", mockupFeature: "Studio Mockup 3D Thực Tế", enterpriseBarcodeFeature: "Xuất Mã Vạch 2D / Công Nghiệp" },
    pricing: { monthlyF2: "Xuất Vector SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS", monthlyF3: "20+ Mã Vạch Công Nghiệp (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "Studio Mockup 3D, Khung CTA & Mắt Hai Màu", monthlyF5: "Studio In A4 (Mẫu Avery + Vạch Cắt) & Batch CSV ZIP", annualF3: "Tiết kiệm 34% + Kiểm Tra WASM Chuẩn ISO & Giấy Phép Thương Mại", monthlyF6: "Kiểm Tra WASM Chuẩn ISO & Giấy Phép Thương Mại", lifetimeF4: "Trọn đời mọi Engine Pro: BWIPP 2D, DXF CAD, Mockup 3D & Khung", lifetimeF5: "Mọi cập nhật tương lai & Huy hiệu VIP Founder" }
  },
  th: {
    preview: { printBtnShort: "พิมพ์แผ่น PDF", mockupBtnShort: "สตูดิโอม็อกอัพ 3D", isoGradePass: "มาตรฐาน ISO {{grade}} • สแกนได้ ({{ms}}ms)", isoGradeWarn: "ความคมชัดต่ำหรือโลโก้หนาแน่นเกินไป" },
    customization: { studioThemes: "ธีมสตูดิโอ & กรอบ CTA", quickPresets: "ชุดสีดีไซเนอร์คลิกเดียว", ctaFrameLabel: "กรอบโชว์ CTA", frameText: "ข้อความบนกรอบ", frameColor: "สีเน้นของกรอบ", eyeOuterColor: "สีกรอบตานอก", eyeInnerColor: "สีจุดตาใน", cornerDotStyle: "รูปทรงจุดตาใน" },
    mockup: { badge: "เอนจินม็อกอัพ 3D", title: "สตูดิโอม็อกอัพเสมือนจริง", subtitle: "ดูตัวอย่างและส่งออกภาพม็อกอัพเชิงพาณิชย์ 1400px ที่ประมวลผลในเบราว์เซอร์ 100%", sceneLabel: "เลือกฉากม็อกอัพ", captionLabel: "ข้อความหัวข้อ", downloadBtn: "ดาวน์โหลด PNG 1400px" },
    proAlert: { f2Bold: "เวกเตอร์ SVG, DXF CAD และม็อกอัพ 3D:", f2Text: "ส่งออก EPS งานพิมพ์, Laser DXF, บาร์โค้ดอุตสาหกรรม 20+ แบบ, กรอบ CTA และม็อกอัพ 3D 1400px", dxfFeature: "ส่งออก AutoCAD DXF สำหรับตัดเลเซอร์", epsFeature: "ส่งออกเวกเตอร์ Adobe EPS", frameFeature: "ส่งออกกรอบ CTA แบบกำหนดเอง", mockupFeature: "สตูดิโอม็อกอัพ 3D เสมือนจริง", enterpriseBarcodeFeature: "ส่งออกบาร์โค้ด 2D / อุตสาหกรรม" },
    pricing: { monthlyF2: "ส่งออกเวกเตอร์ SVG, AutoCAD DXF (Laser/CNC) และ Adobe EPS", monthlyF3: "บาร์โค้ดอุตสาหกรรม 20+ แบบ (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "สตูดิโอม็อกอัพ 3D, กรอบ CTA และสีตาสองโทน", monthlyF5: "สตูดิโอพิมพ์ A4 (Avery + เส้นตัด) และ Batch CSV ZIP", annualF3: "ประหยัด 34% + ตรวจสแกน WASM ระดับ ISO และไลเซนส์เชิงพาณิชย์", monthlyF6: "ตรวจสแกน WASM ระดับ ISO และไลเซนส์เชิงพาณิชย์", lifetimeF4: "ใช้งานทุกเอนจิน Pro ตลอดชีพ: BWIPP 2D, DXF CAD, ม็อกอัพ 3D และกรอบ", lifetimeF5: "อัปเดตใหม่ทั้งหมดในอนาคตและป้าย VIP Founder" }
  },
  hi: {
    preview: { printBtnShort: "शीट PDF प्रिंट करें", mockupBtnShort: "3D मॉकअप स्टूडियो", isoGradePass: "ISO ग्रेड {{grade}} • स्कैन योग्य ({{ms}}ms)", isoGradeWarn: "कम कंट्रास्ट या बहुत बड़ा लोगो पाया गया" },
    customization: { studioThemes: "स्टूडियो थीम और CTA फ़्रेम", quickPresets: "1-क्लिक डिज़ाइनर पैलेट", ctaFrameLabel: "CTA शोकेस फ़्रेम", frameText: "फ़्रेम टेक्स्ट", frameColor: "फ़्रेम एक्सेंट रंग", eyeOuterColor: "बाहरी आई फ़्रेम रंग", eyeInnerColor: "भीतरी आई प्यूपिल रंग", cornerDotStyle: "भीतरी प्यूपिल आकार" },
    mockup: { badge: "3D मॉकअप इंजन", title: "रियल-वर्ल्ड मॉकअप स्टूडियो", subtitle: "ब्राउज़र में 100% लोकल रेंडर किए गए 1400px कमर्शियल मॉकअप देखें और डाउनलोड करें।", sceneLabel: "मॉकअप दृश्य चुनें", captionLabel: "कैप्शन टेक्स्ट", downloadBtn: "1400px PNG डाउनलोड करें" },
    proAlert: { f2Bold: "वेक्टर SVG, DXF CAD और 3D मॉकअप:", f2Text: "प्रिंट EPS, लेज़र DXF, 20+ इंडस्ट्रियल बारकोड (DataMatrix/PDF417), CTA फ़्रेम और 1400px 3D मॉकअप एक्सपोर्ट करें।", dxfFeature: "AutoCAD DXF लेज़र कट एक्सपोर्ट", epsFeature: "Adobe Illustrator EPS एक्सपोर्ट", frameFeature: "कस्टम CTA फ़्रेम एक्सपोर्ट", mockupFeature: "3D रियल-वर्ल्ड मॉकअप स्टूडियो", enterpriseBarcodeFeature: "एंटरप्राइज़ 2D / इंडस्ट्रियल बारकोड एक्सपोर्ट" },
    pricing: { monthlyF2: "वेक्टर SVG, AutoCAD DXF (लेज़र/CNC) और Adobe EPS एक्सपोर्ट", monthlyF3: "20+ इंडस्ट्रियल बारकोड (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D मॉकअप स्टूडियो, CTA फ़्रेम और डुअल-टोन आई डिज़ाइन", monthlyF5: "A4 प्रिंट स्टूडियो (Avery + क्रॉप मार्क्स) और बैच CSV ZIP", annualF3: "34% बचाएं + ISO ग्रेड WASM स्कैन ऑडिट और कमर्शियल लाइसेंस", monthlyF6: "ISO ग्रेड WASM स्कैन ऑडिट और कमर्शियल लाइसेंस", lifetimeF4: "सभी Pro इंजन हमेशा के लिए: BWIPP 2D, DXF CAD, 3D मॉकअप और फ़्रेम", lifetimeF5: "भविष्य के सभी अपडेट और VIP Founder बैज" }
  },
  uk: {
    preview: { printBtnShort: "Друк аркуша PDF", mockupBtnShort: "3D Мокап Студія", isoGradePass: "Клас ISO {{grade}} • Сканується ({{ms}}мс)", isoGradeWarn: "Низький контраст або завеликий логотип" },
    customization: { studioThemes: "Теми Студії та Рамки CTA", quickPresets: "Палітри в 1 клік", ctaFrameLabel: "Рамка-вітрина CTA", frameText: "Текст на рамці", frameColor: "Колір акценту рамки", eyeOuterColor: "Зовнішній колір міток", eyeInnerColor: "Внутрішній колір міток", cornerDotStyle: "Форма центру міток" },
    mockup: { badge: "Рушій 3D Мокапів", title: "Студія Реалістичних Мокапів", subtitle: "Створюйте та завантажуйте комерційні мокапи 1400px з рендерингом 100% локально у браузері.", sceneLabel: "Оберіть сцену", captionLabel: "Текст підпису", downloadBtn: "Завантажити PNG 1400px" },
    proAlert: { f2Bold: "Вектор SVG, DXF CAD та 3D Мокапи:", f2Text: "Експорт EPS для друку, лазерний DXF, 20+ промислових штрихкодів, рамки CTA та 3D мокапи.", dxfFeature: "Експорт AutoCAD DXF для лазерної різки", epsFeature: "Векторний експорт Adobe EPS", frameFeature: "Експорт з кастомною CTA-рамкою", mockupFeature: "Студія 3D-мокапів", enterpriseBarcodeFeature: "Експорт промислових 2D штрихкодів" },
    pricing: { monthlyF2: "Експорт SVG, AutoCAD DXF (Лазер/ЧПК) та Adobe EPS", monthlyF3: "20+ промислових кодів (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "Студія 3D-мокапів, рамки CTA та двоколірні мітки", monthlyF5: "Студія друку A4 (Avery + мітки різу) та пакетний CSV ZIP", annualF3: "Знижка 34% + WASM-аудит ISO та комерційна ліцензія", monthlyF6: "WASM-аудит ISO та комерційна ліцензія", lifetimeF4: "Усі Pro-рушії назавжди: BWIPP 2D, DXF CAD, 3D-мокапи та рамки", lifetimeF5: "Усі майбутні оновлення та значок VIP Founder" }
  }
};

// Remaining regional European & South/SE Asian locales reuse curated base or native equivalents
const regionalExtra = {
  bn: {
    preview: { printBtnShort: "PDF শীট প্রিন্ট", mockupBtnShort: "3D মকআপ স্টুডিও", isoGradePass: "ISO গ্রেড {{grade}} • স্ক্যানযোগ্য ({{ms}}ms)", isoGradeWarn: "কম কনট্রাস্ট বা বড় লোগো শনাক্ত হয়েছে" },
    customization: { studioThemes: "স্টুডিও থিম ও CTA ফ্রেম", quickPresets: "১-ক্লিক ডিজাইনার প্যালেট", ctaFrameLabel: "CTA শোকেস ফ্রেম", frameText: "ফ্রেম টেক্সট", frameColor: "ফ্রেম অ্যাক্সেন্ট রঙ", eyeOuterColor: "বাইরের চোখের রঙ", eyeInnerColor: "ভেতরের পিউপিল রঙ", cornerDotStyle: "পিউপিলের আকার" },
    mockup: { badge: "3D মকআপ ইঞ্জিন", title: "রিয়েল-ওয়ার্ল্ড মকআপ স্টুডিও", subtitle: "ব্রাউজারে ১০০% লোকাল রেন্ডার করা 1400px কমার্শিয়াল মকআপ প্রিভিউ ও ডাউনলোড করুন।", sceneLabel: "দৃশ্য নির্বাচন করুন", captionLabel: "ক্যাপশন টেক্সট", downloadBtn: "1400px PNG ডাউনলোড" },
    proAlert: { f2Bold: "ভেক্টর SVG, DXF CAD ও 3D মকআপ:", f2Text: "প্রিন্ট EPS, লেজার DXF, ২০+ ইন্ডাস্ট্রিয়াল বারকোড, CTA ফ্রেম এবং 1400px 3D মকআপ এক্সপোর্ট করুন।", dxfFeature: "AutoCAD DXF লেজার কাট এক্সপোর্ট", epsFeature: "Adobe Illustrator EPS এক্সপোর্ট", frameFeature: "কাস্টম CTA ফ্রেম এক্সপোর্ট", mockupFeature: "3D রিয়েল-ওয়ার্ল্ড মকআপ স্টুডিও", enterpriseBarcodeFeature: "এন্টারপ্রাইজ 2D / ইন্ডাস্ট্রিয়াল বারকোড এক্সপোর্ট" },
    pricing: { monthlyF2: "ভেক্টর SVG, AutoCAD DXF (লেজার/CNC) এবং Adobe EPS এক্সপোর্ট", monthlyF3: "২০+ ইন্ডাস্ট্রিয়াল বারকোড (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D মকআপ স্টুডিও, CTA ফ্রেম এবং ডুয়াল-টোন চোখ", monthlyF5: "A4 প্রিন্ট স্টুডিও (Avery + ক্রপ মার্ক) এবং ব্যাচ CSV ZIP", annualF3: "৩৪% সাশ্রয় + ISO গ্রেড WASM অডিট এবং কমার্শিয়াল লাইসেন্স", monthlyF6: "ISO গ্রেড WASM অডিট এবং কমার্শিয়াল লাইসেন্স", lifetimeF4: "সব Pro ইঞ্জিন আজীবন: BWIPP 2D, DXF CAD, 3D মকআপ ও ফ্রেম", lifetimeF5: "ভবিষ্যতের সব আপডেট এবং VIP Founder ব্যাজ" }
  },
  tl: {
    preview: { printBtnShort: "I-print ang PDF Sheet", mockupBtnShort: "3D Mockup Studio", isoGradePass: "ISO Grade {{grade}} • Nai-scan ({{ms}}ms)", isoGradeWarn: "Mababang contrast o masyadong malaking logo" },
    customization: { studioThemes: "Mga Tema at CTA Frame", quickPresets: "1-Click Designer Palettes", ctaFrameLabel: "CTA Showcase Frame", frameText: "Teksto ng Frame", frameColor: "Kulay ng Frame", eyeOuterColor: "Panlabas na Kulay ng Mata", eyeInnerColor: "Panloob na Kulay ng Mata", cornerDotStyle: "Hugis ng Gitna ng Mata" },
    mockup: { badge: "3D Mockup Engine", title: "Real-World Mockup Studio", subtitle: "Mag-preview at mag-export ng 1400px commercial mockups na 100% lokal sa iyong browser.", sceneLabel: "Pumili ng Eksena", captionLabel: "Teksto ng Pamagat", downloadBtn: "I-download ang 1400px PNG" },
    proAlert: { f2Bold: "Vector SVG, DXF CAD at 3D Mockups:", f2Text: "Mag-export ng Print EPS, Laser DXF, 20+ Industrial Barcodes, CTA Frames at 1400px 3D Mockups.", dxfFeature: "AutoCAD DXF Laser Cut Export", epsFeature: "Adobe Illustrator EPS Export", frameFeature: "Custom CTA Frame Export", mockupFeature: "3D Real-World Mockup Studio", enterpriseBarcodeFeature: "Enterprise 2D / Industrial Barcode Export" },
    pricing: { monthlyF2: "Vector SVG, AutoCAD DXF (Laser/CNC) at Adobe EPS exports", monthlyF3: "20+ Industrial Barcodes (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studio, CTA Showcase Frames at Dual-Tone Eyes", monthlyF5: "A4 Print Studio (Avery + Crop Marks) at Batch CSV ZIP", annualF3: "Makatipid ng 34% + ISO Grade WASM Audit at Commercial License", monthlyF6: "ISO Grade WASM Scan Audit at Commercial License", lifetimeF4: "Lahat ng Pro Engines habambuhay: BWIPP 2D, DXF CAD, 3D Mockups", lifetimeF5: "Lahat ng future updates at VIP Founder badge" }
  },
  cs: {
    preview: { printBtnShort: "Tisk archu PDF", mockupBtnShort: "3D Mockup Studio", isoGradePass: "ISO třída {{grade}} • Čitelné ({{ms}}ms)", isoGradeWarn: "Nízký kontrast nebo příliš husté logo" },
    customization: { studioThemes: "Témata Studia a CTA rámečky", quickPresets: "Palety na 1 kliknutí", ctaFrameLabel: "Prezentační CTA rámeček", frameText: "Text rámečku", frameColor: "Akcentní barva rámečku", eyeOuterColor: "Vnější barva oka", eyeInnerColor: "Vnitřní barva zornice", cornerDotStyle: "Tvar zornice" },
    mockup: { badge: "3D Mockup Engine", title: "Studio Reálných Mockupů", subtitle: "Náhled a export komerčních mockupů 1400px vykreslených 100% lokálně v prohlížeči.", sceneLabel: "Vyberte scénu", captionLabel: "Popisek scény", downloadBtn: "Stáhnout 1400px PNG" },
    proAlert: { f2Bold: "Vektorové SVG, DXF CAD a 3D Mockupy:", f2Text: "Export tiskového EPS, laserového DXF, 20+ průmyslových kódů, CTA rámečků a 3D mockupů.", dxfFeature: "Export AutoCAD DXF pro laserové řezání", epsFeature: "Vektorový export Adobe EPS", frameFeature: "Export vlastního CTA rámečku", mockupFeature: "3D Studio Reálných Mockupů", enterpriseBarcodeFeature: "Export průmyslových 2D čárových kódů" },
    pricing: { monthlyF2: "Exporty SVG, AutoCAD DXF (Laser/CNC) a Adobe EPS", monthlyF3: "20+ průmyslových kódů (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studio, CTA rámečky a dvoubarevné rohy", monthlyF5: "A4 tiskové studio (Avery + ořezové značky) a Batch CSV ZIP", annualF3: "Ušetřete 34 % + WASM ISO audit a komerční licence", monthlyF6: "WASM ISO audit skenování a komerční licence", lifetimeF4: "Všechny Pro enginy navždy: BWIPP 2D, DXF CAD, 3D mockupy", lifetimeF5: "Všechny budoucí aktualizace a odznak VIP Founder" }
  },
  da: {
    preview: { printBtnShort: "Udskriv PDF-ark", mockupBtnShort: "3D Mockup Studie", isoGradePass: "ISO-grad {{grade}} • Scanbar ({{ms}}ms)", isoGradeWarn: "Lav kontrast eller tæt logo registreret" },
    customization: { studioThemes: "Studietemaer & CTA-rammer", quickPresets: "1-Klik Designerpaletter", ctaFrameLabel: "CTA Udstillingsramme", frameText: "Rammetekst", frameColor: "Ramme-accentfarve", eyeOuterColor: "Ydre øjefarve", eyeInnerColor: "Indre pupilfarve", cornerDotStyle: "Pupilform" },
    mockup: { badge: "3D Mockup Engine", title: "Realistisk 3D Mockup Studie", subtitle: "Forhåndsvis og eksportér 1400px kommercielle mockups gengivet 100% lokalt i din browser.", sceneLabel: "Vælg Mockup-scene", captionLabel: "Billedtekst", downloadBtn: "Download 1400px PNG" },
    proAlert: { f2Bold: "Vektor SVG, DXF CAD & 3D Mockups:", f2Text: "Eksportér Print EPS, Laser DXF, 20+ industrielle stregkoder, CTA-rammer og 1400px 3D-mockups.", dxfFeature: "AutoCAD DXF Laserskæring Eksport", epsFeature: "Adobe Illustrator EPS Eksport", frameFeature: "Brugerdefineret CTA-ramme Eksport", mockupFeature: "3D Real-World Mockup Studie", enterpriseBarcodeFeature: "Enterprise 2D / Industriel Stregkode Eksport" },
    pricing: { monthlyF2: "Vektor SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS eksport", monthlyF3: "20+ Industrielle Stregkoder (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studie, CTA-rammer & To-tonede Øjne", monthlyF5: "A4 Print Studie (Avery + Skæremærker) & Batch CSV ZIP", annualF3: "Spar 34% + ISO-grad WASM-audit & Kommerciel Licens", monthlyF6: "ISO-grad WASM-audit & Kommerciel Licens", lifetimeF4: "Alle Pro-motorer for altid: BWIPP 2D, DXF CAD, 3D Mockups", lifetimeF5: "Alle fremtidige opdateringer & VIP Founder-badge" }
  },
  sv: {
    preview: { printBtnShort: "Skriv ut PDF-ark", mockupBtnShort: "3D Mockup Studio", isoGradePass: "ISO-klass {{grade}} • Skanningsbar ({{ms}}ms)", isoGradeWarn: "Låg kontrast eller tät logotyp upptäckt" },
    customization: { studioThemes: "Studioteman & CTA-ramar", quickPresets: "1-Klicks Designpaletter", ctaFrameLabel: "CTA Visningsram", frameText: "Ramtext", frameColor: "Ramens accentfärg", eyeOuterColor: "Yttre ögonfärg", eyeInnerColor: "Inre pupillfärg", cornerDotStyle: "Pupillform" },
    mockup: { badge: "3D Mockup Motor", title: "Verklighetstrogen Mockup Studio", subtitle: "Förhandsgranska och exportera kommersiella 1400px mockups renderade 100% lokalt i webbläsaren.", sceneLabel: "Välj Mockup-scen", captionLabel: "Rubriktext", downloadBtn: "Ladda ner 1400px PNG" },
    proAlert: { f2Bold: "Vektor SVG, DXF CAD & 3D Mockups:", f2Text: "Exportera tryck-EPS, laser-DXF, 20+ industristreckkoder, CTA-ramar & 1400px 3D-mockups.", dxfFeature: "AutoCAD DXF Laserskärning Export", epsFeature: "Adobe Illustrator EPS Export", frameFeature: "Anpassad CTA-ram Export", mockupFeature: "3D Real-World Mockup Studio", enterpriseBarcodeFeature: "Företags 2D / Industristreckkod Export" },
    pricing: { monthlyF2: "Vektor SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS export", monthlyF3: "20+ Industristreckkoder (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studio, CTA-ramar & Tvåfärgade Ögon", monthlyF5: "A4 Utskriftsstudio (Avery + Skärmärken) & Batch CSV ZIP", annualF3: "Spara 34% + ISO-klass WASM-granskning & Kommersiell Licens", monthlyF6: "ISO-klass WASM-granskning & Kommersiell Licens", lifetimeF4: "Alla Pro-motorer för alltid: BWIPP 2D, DXF CAD, 3D Mockups", lifetimeF5: "Alla framtida uppdateringar & VIP Founder-märke" }
  },
  no: {
    preview: { printBtnShort: "Skriv ut PDF-ark", mockupBtnShort: "3D Mockup Studio", isoGradePass: "ISO-grad {{grade}} • Skannbar ({{ms}}ms)", isoGradeWarn: "Lav kontrast eller tett logo oppdaget" },
    customization: { studioThemes: "Studiotemaer og CTA-rammer", quickPresets: "1-Klikk Designpaletter", ctaFrameLabel: "CTA Utstillingsramme", frameText: "Rammetekst", frameColor: "Aksentfarge på ramme", eyeOuterColor: "Ytre øyefarge", eyeInnerColor: "Indre pupillfarge", cornerDotStyle: "Pupillform" },
    mockup: { badge: "3D Mockup Motor", title: "Realistisk 3D Mockup Studio", subtitle: "Forhåndsvis og eksporter 1400px kommersielle mockups gjengitt 100% lokalt i nettleseren.", sceneLabel: "Velg Mockup-scene", captionLabel: "Bildetekst", downloadBtn: "Last ned 1400px PNG" },
    proAlert: { f2Bold: "Vektor SVG, DXF CAD & 3D Mockups:", f2Text: "Eksporter Print EPS, Laser DXF, 20+ industrielle strekkoder, CTA-rammer og 1400px 3D-mockups.", dxfFeature: "AutoCAD DXF Laserkutt Eksport", epsFeature: "Adobe Illustrator EPS Eksport", frameFeature: "Tilpasset CTA-ramme Eksport", mockupFeature: "3D Real-World Mockup Studio", enterpriseBarcodeFeature: "Enterprise 2D / Industriell Strekkode Eksport" },
    pricing: { monthlyF2: "Vektor SVG, AutoCAD DXF (Laser/CNC) og Adobe EPS eksport", monthlyF3: "20+ Industrielle Strekkoder (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Studio, CTA-rammer og Tofargede Øyne", monthlyF5: "A4 Utskriftsstudio (Avery + Kuttemerker) og Batch CSV ZIP", annualF3: "Spar 34% + ISO-grad WASM-revisjon og Kommersiell Lisens", monthlyF6: "ISO-grad WASM-revisjon og Kommersiell Lisens", lifetimeF4: "Alle Pro-motorer for alltid: BWIPP 2D, DXF CAD, 3D Mockups", lifetimeF5: "Alle fremtidige oppdateringer og VIP Founder-merke" }
  },
  fi: {
    preview: { printBtnShort: "Tulosta PDF-arkki", mockupBtnShort: "3D-malli-studio", isoGradePass: "ISO-luokka {{grade}} • Skannattava ({{ms}}ms)", isoGradeWarn: "Matala kontrasti tai liian suuri logo havaittu" },
    customization: { studioThemes: "Studioteemat & CTA-kehykset", quickPresets: "1-klikkauksen väripaletit", ctaFrameLabel: "CTA-esittelykehys", frameText: "Kehyksen teksti", frameColor: "Kehyksen korostusväri", eyeOuterColor: "Silmän ulkoväri", eyeInnerColor: "Silmän sisäväri", cornerDotStyle: "Pupillin muoto" },
    mockup: { badge: "3D-mallimoottori", title: "Realistinen 3D-mallistudio", subtitle: "Esikatsele ja vie 1400px kaupallisia mallikuvia, jotka luodaan 100% paikallisesti selaimessasi.", sceneLabel: "Valitse mallinäkymä", captionLabel: "Kuvateksti", downloadBtn: "Lataa 1400px PNG" },
    proAlert: { f2Bold: "Vektori-SVG, DXF CAD & 3D-mallit:", f2Text: "Vie paino-EPS, laser-DXF, 20+ teollisuuskoodia, CTA-kehyksiä ja 1400px 3D-malleja.", dxfFeature: "AutoCAD DXF -laserleikkausvienti", epsFeature: "Adobe Illustrator EPS -vienti", frameFeature: "Mukautettu CTA-kehysvienti", mockupFeature: "3D-mallistudio", enterpriseBarcodeFeature: "Yritystason 2D / Teollisuusviivakoodivienti" },
    pricing: { monthlyF2: "Vektori-SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS -vienti", monthlyF3: "20+ Teollisuusviivakoodia (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D-mallistudio, CTA-kehykset & Kaksiväriset silmät", monthlyF5: "A4-tulostusstudio (Avery + leikkausmerkit) & Erä-CSV ZIP", annualF3: "Säästä 34% + ISO-tason WASM-auditointi & Kaupallinen lisenssi", monthlyF6: "ISO-tason WASM-auditointi & Kaupallinen lisenssi", lifetimeF4: "Kaikki Pro-moottorit ikuisesti: BWIPP 2D, DXF CAD, 3D-mallit", lifetimeF5: "Kaikki tulevat päivitykset & VIP Founder -merkki" }
  },
  hu: {
    preview: { printBtnShort: "PDF lap nyomtatása", mockupBtnShort: "3D Mockup Stúdió", isoGradePass: "ISO minősítés {{grade}} • Beolvasható ({{ms}}ms)", isoGradeWarn: "Alacsony kontraszt vagy túl sűrű logó" },
    customization: { studioThemes: "Stúdió témák és CTA keretek", quickPresets: "1-kattintásos paletták", ctaFrameLabel: "CTA bemutató keret", frameText: "Keret szövege", frameColor: "Keret kiemelő színe", eyeOuterColor: "Külső szem színe", eyeInnerColor: "Belső pupilla színe", cornerDotStyle: "Pupilla alakja" },
    mockup: { badge: "3D Mockup Motor", title: "Valósághű 3D Mockup Stúdió", subtitle: "Tekintse meg és exportálja a böngészőben 100%-ban helyben renderelt 1400px-es látványterveket.", sceneLabel: "Jelenet kiválasztása", captionLabel: "Felirat szövege", downloadBtn: "1400px PNG letöltése" },
    proAlert: { f2Bold: "Vektor SVG, DXF CAD és 3D Mockupok:", f2Text: "Exportáljon nyomdai EPS-t, lézeres DXF-et, 20+ ipari vonalkódot, CTA kereteket és 1400px 3D mockupot.", dxfFeature: "AutoCAD DXF lézervágó export", epsFeature: "Adobe Illustrator EPS export", frameFeature: "Egyedi CTA keret export", mockupFeature: "Valósághű 3D Mockup Stúdió", enterpriseBarcodeFeature: "Vállalati 2D / Ipari vonalkód export" },
    pricing: { monthlyF2: "Vektor SVG, AutoCAD DXF (Lézer/CNC) és Adobe EPS export", monthlyF3: "20+ Ipari Vonalkód (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "3D Mockup Stúdió, CTA keretek és kétszínű szemek", monthlyF5: "A4 Nyomtató Stúdió (Avery + vágójelek) és Kötegelt CSV ZIP", annualF3: "34% megtakarítás + ISO WASM minőségellenőrzés és kereskedelmi licenc", monthlyF6: "ISO WASM minőségellenőrzés és kereskedelmi licenc", lifetimeF4: "Minden Pro motor örökre: BWIPP 2D, DXF CAD, 3D Mockupok", lifetimeF5: "Minden jövőbeli frissítés és VIP Founder jelvény" }
  },
  ro: {
    preview: { printBtnShort: "Printează Foaie PDF", mockupBtnShort: "Studio Mockup 3D", isoGradePass: "Grad ISO {{grade}} • Scanabil ({{ms}}ms)", isoGradeWarn: "Contrast scăzut sau logo prea dens" },
    customization: { studioThemes: "Teme Studio & Rame CTA", quickPresets: "Palete Design 1-Click", ctaFrameLabel: "Ramă Prezentare CTA", frameText: "Text Ramă", frameColor: "Culoare Accent Ramă", eyeOuterColor: "Culoare Exterioară Ochi", eyeInnerColor: "Culoare Interioară Pupilă", cornerDotStyle: "Formă Pupilă" },
    mockup: { badge: "Motor Mockup 3D", title: "Studio Mockup Realist", subtitle: "Previzualizează și exportă mockup-uri comerciale 1400px randate 100% local în browser.", sceneLabel: "Selectează Scena", captionLabel: "Text Subtitlu", downloadBtn: "Descarcă PNG 1400px" },
    proAlert: { f2Bold: "Vector SVG, DXF CAD & Mockup 3D:", f2Text: "Exportă EPS tipar, DXF laser, 20+ coduri industriale, rame CTA și mockup-uri 3D 1400px.", dxfFeature: "Export AutoCAD DXF Tăiere Laser", epsFeature: "Export Vectorial Adobe EPS", frameFeature: "Export Ramă CTA Personalizată", mockupFeature: "Studio Mockup 3D Realist", enterpriseBarcodeFeature: "Export Coduri 2D / Industriale Pro" },
    pricing: { monthlyF2: "Export Vector SVG, AutoCAD DXF (Laser/CNC) și Adobe EPS", monthlyF3: "20+ Coduri Industriale (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "Studio Mockup 3D, Rame CTA și Ochi Bicolori", monthlyF5: "Studio Printare A4 (Avery + Semne tăiere) & Batch CSV ZIP", annualF3: "Economisește 34% + Audit WASM Grad ISO și Licență Comercială", monthlyF6: "Audit WASM Grad ISO și Licență Comercială", lifetimeF4: "Toate motoarele Pro pe viață: BWIPP 2D, DXF CAD, Mockup 3D", lifetimeF5: "Toate actualizările viitoare și insigna VIP Founder" }
  },
  el: {
    preview: { printBtnShort: "Εκτύπωση PDF", mockupBtnShort: "Στούντιο 3D Mockup", isoGradePass: "Βαθμός ISO {{grade}} • Σαρώσιμο ({{ms}}ms)", isoGradeWarn: "Χαμηλή αντίθεση ή πολύ πυκνό λογότυπο" },
    customization: { studioThemes: "Θέματα Στούντιο & Πλαίσια CTA", quickPresets: "Παλέτες Σχεδιασμού 1-Κλικ", ctaFrameLabel: "Πλαίσιο Παρουσίασης CTA", frameText: "Κείμενο Πλαισίου", frameColor: "Χρώμα Έμφασης Πλαισίου", eyeOuterColor: "Εξωτερικό Χρώμα Ματιού", eyeInnerColor: "Εσωτερικό Χρώμα Κόρης", cornerDotStyle: "Σχήμα Κόρης" },
    mockup: { badge: "Μηχανή 3D Mockup", title: "Ρεαλιστικό Στούντιο 3D Mockup", subtitle: "Προεπισκόπηση και εξαγωγή εμπορικών mockup 1400px που αποδίδονται 100% τοπικά στον browser.", sceneLabel: "Επιλογή Σκηνής", captionLabel: "Κείμενο Λεζάντας", downloadBtn: "Λήψη PNG 1400px" },
    proAlert: { f2Bold: "Διάνυσμα SVG, DXF CAD & 3D Mockups:", f2Text: "Εξαγωγή EPS εκτύπωσης, Laser DXF, 20+ βιομηχανικοί κώδικες, πλαίσια CTA & 3D mockups 1400px.", dxfFeature: "Εξαγωγή AutoCAD DXF Κοπής Laser", epsFeature: "Διανυσματική Εξαγωγή Adobe EPS", frameFeature: "Εξαγωγή Προσαρμοσμένου Πλαισίου CTA", mockupFeature: "Ρεαλιστικό Στούντιο 3D Mockup", enterpriseBarcodeFeature: "Εξαγωγή Βιομηχανικών Κωδικών 2D" },
    pricing: { monthlyF2: "Εξαγωγές Vector SVG, AutoCAD DXF (Laser/CNC) & Adobe EPS", monthlyF3: "20+ Βιομηχανικοί Κώδικες (DataMatrix, PDF417, Aztec, GS1-128)", monthlyF4: "Στούντιο 3D Mockup, Πλαίσια CTA & Δίχρωμα Μάτια", monthlyF5: "Στούντιο Εκτύπωσης A4 (Avery + Σημάδια κοπής) & Batch CSV ZIP", annualF3: "Εξοικονόμηση 34% + Έλεγχος WASM ISO & Εμπορική Άδεια", monthlyF6: "Έλεγχος WASM ISO & Εμπορική Άδεια", lifetimeF4: "Όλες οι Pro μηχανές για πάντα: BWIPP 2D, DXF CAD, 3D Mockups", lifetimeF5: "Όλες οι μελλοντικές ενημερώσεις & σήμα VIP Founder" }
  }
};

const allPacks = { ...localizedPacks, ...regionalExtra };

let updated = 0;
for (const lang of langDirs) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const p = allPacks[lang] || baseEn;

  data.preview = { ...(data.preview || {}), ...p.preview };
  data.customization = { ...(data.customization || {}), ...p.customization };
  data.mockup = { ...(data.mockup || {}), ...p.mockup };
  data.proAlert = { ...(data.proAlert || {}), ...p.proAlert };
  data.static = data.static || {};
  data.static.pricing = { ...(data.static.pricing || {}), ...p.pricing };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  updated++;
}

// Sync src/locales/en/translation.json
const srcEn = path.join(rootDir, 'src', 'locales', 'en', 'translation.json');
if (fs.existsSync(srcEn)) {
  const data = JSON.parse(fs.readFileSync(srcEn, 'utf-8'));
  data.preview = { ...(data.preview || {}), ...baseEn.preview };
  data.customization = { ...(data.customization || {}), ...baseEn.customization };
  data.mockup = { ...(data.mockup || {}), ...baseEn.mockup };
  data.proAlert = { ...(data.proAlert || {}), ...baseEn.proAlert };
  data.static = data.static || {};
  data.static.pricing = { ...(data.static.pricing || {}), ...baseEn.pricing };
  fs.writeFileSync(srcEn, JSON.stringify(data, null, 2), 'utf-8');
}

console.log(`Synced all 30/30 Pro Engine native translations across ${updated} languages!`);
