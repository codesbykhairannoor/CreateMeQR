import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      "appTitle": "Free QR Code Generator Online",
      "tagline": "Create QR Codes with Logo & Color - No Signup, Unlimited",
      "types": {
        "url": "URL", "wifi": "WiFi", "vcard": "vCard", "text": "Text",
        "email": "Email", "phone": "Phone", "sms": "SMS", "location": "Location", "event": "Event"
      },
      "form": {
        "enterUrl": "Enter your website URL", "networkName": "Network Name (SSID)", "password": "Password",
        "encryption": "Encryption", "firstName": "First Name", "lastName": "Last Name", "phone": "Phone Number",
        "email": "Email Address", "textPlaceholder": "Enter your text here", "emailTo": "Send To",
        "emailSubject": "Subject", "emailBody": "Message Body", "smsMessage": "SMS Message",
        "lat": "Latitude", "lng": "Longitude", "eventTitle": "Event Title", "eventLocation": "Event Location",
        "eventStart": "Start Time", "eventEnd": "End Time"
      },
      "customization": {
        "colors": "Colors", "logo": "Add Logo", "design": "Design Patterns", "foreground": "Foreground Color",
        "background": "Background Color", "uploadLogo": "Upload Logo", "removeLogo": "Remove Logo",
        "dotsStyle": "Pattern Style", "cornersStyle": "Eye Shape", "eyeColor": "Eye Color",
        "gradient": "Use Gradient", "logoSize": "Logo Size", "logoMargin": "Logo Margin"
      },
      "preview": { "title": "QR Code Preview", "download": "Download", "scanTest": "Scan to test" },
      "footer": { "privacy": "Privacy Policy", "terms": "Terms of Service" }
    }
  },
  id: {
    translation: {
      "appTitle": "Generator QR Code Gratis",
      "tagline": "Buat QR Code dengan Logo & Warna - Tanpa Daftar, Unlimited",
      "types": {
        "url": "URL / Tautan", "wifi": "WiFi", "vcard": "Kontak (vCard)", "text": "Teks",
        "email": "Email", "phone": "Telepon", "sms": "SMS", "location": "Lokasi Maps", "event": "Acara (Event)"
      },
      "form": {
        "enterUrl": "Masukkan URL website", "networkName": "Nama Jaringan (SSID)", "password": "Kata Sandi",
        "encryption": "Keamanan", "firstName": "Nama Depan", "lastName": "Nama Belakang", "phone": "Nomor Telepon",
        "email": "Alamat Email", "textPlaceholder": "Masukkan teks Anda di sini", "emailTo": "Kirim Ke",
        "emailSubject": "Subjek", "emailBody": "Isi Pesan", "smsMessage": "Pesan SMS",
        "lat": "Garis Lintang (Latitude)", "lng": "Garis Bujur (Longitude)", "eventTitle": "Nama Acara",
        "eventLocation": "Lokasi Acara", "eventStart": "Waktu Mulai", "eventEnd": "Waktu Selesai"
      },
      "customization": {
        "colors": "Warna", "logo": "Tambah Logo", "design": "Pola Desain", "foreground": "Warna Utama",
        "background": "Warna Latar", "uploadLogo": "Unggah Logo", "removeLogo": "Hapus Logo",
        "dotsStyle": "Gaya Pola", "cornersStyle": "Bentuk Mata", "eyeColor": "Warna Mata",
        "gradient": "Gunakan Gradasi", "logoSize": "Ukuran Logo", "logoMargin": "Margin Logo"
      },
      "preview": { "title": "Pratinjau QR Code", "download": "Unduh", "scanTest": "Pindai untuk menguji" },
      "footer": { "privacy": "Kebijakan Privasi", "terms": "Syarat Ketentuan" }
    }
  },
  es: {
    translation: {
      "appTitle": "Generador de Códigos QR Gratis",
      "tagline": "Crea Códigos QR con Logo y Color - Sin Registro, Ilimitado",
      "types": {
        "url": "URL", "wifi": "WiFi", "vcard": "vCard", "text": "Texto",
        "email": "Email", "phone": "Teléfono", "sms": "SMS", "location": "Ubicación", "event": "Evento"
      },
      "form": {
        "enterUrl": "Introduce la URL de tu sitio web", "networkName": "Nombre de Red (SSID)", "password": "Contraseña",
        "encryption": "Encriptación", "firstName": "Nombre", "lastName": "Apellido", "phone": "Número de Teléfono",
        "email": "Correo Electrónico", "textPlaceholder": "Introduce tu texto aquí", "emailTo": "Enviar A",
        "emailSubject": "Asunto", "emailBody": "Cuerpo del Mensaje", "smsMessage": "Mensaje SMS",
        "lat": "Latitud", "lng": "Longitud", "eventTitle": "Título del Evento", "eventLocation": "Ubicación del Evento",
        "eventStart": "Hora de Inicio", "eventEnd": "Hora de Finalización"
      },
      "customization": {
        "colors": "Colores", "logo": "Añadir Logo", "design": "Patrones de Diseño", "foreground": "Color Principal",
        "background": "Color de Fondo", "uploadLogo": "Subir Logo", "removeLogo": "Quitar Logo",
        "dotsStyle": "Estilo de Patrón", "cornersStyle": "Forma del Ojo", "eyeColor": "Color del Ojo",
        "gradient": "Usar Degradado", "logoSize": "Tamaño del Logo", "logoMargin": "Margen del Logo"
      },
      "preview": { "title": "Vista Previa", "download": "Descargar", "scanTest": "Escanea para probar" },
      "footer": { "privacy": "Política de Privacidad", "terms": "Términos de Servicio" }
    }
  },
  fr: {
    translation: {
      "appTitle": "Générateur de Code QR Gratuit",
      "tagline": "Créez des codes QR avec logo et couleur - Sans inscription, Illimité",
      "types": {
        "url": "URL", "wifi": "WiFi", "vcard": "vCard", "text": "Texte",
        "email": "E-mail", "phone": "Téléphone", "sms": "SMS", "location": "Emplacement", "event": "Événement"
      },
      "form": {
        "enterUrl": "Entrez l'URL de votre site", "networkName": "Nom du réseau (SSID)", "password": "Mot de passe",
        "encryption": "Chiffrement", "firstName": "Prénom", "lastName": "Nom de famille", "phone": "Numéro de téléphone",
        "email": "Adresse e-mail", "textPlaceholder": "Entrez votre texte ici", "emailTo": "Envoyer à",
        "emailSubject": "Sujet", "emailBody": "Corps du message", "smsMessage": "Message SMS",
        "lat": "Latitude", "lng": "Longitude", "eventTitle": "Titre de l'événement", "eventLocation": "Lieu de l'événement",
        "eventStart": "Heure de début", "eventEnd": "Heure de fin"
      },
      "customization": {
        "colors": "Couleurs", "logo": "Ajouter un logo", "design": "Motifs de conception", "foreground": "Couleur principale",
        "background": "Couleur de fond", "uploadLogo": "Télécharger le logo", "removeLogo": "Supprimer le logo",
        "dotsStyle": "Style de motif", "cornersStyle": "Forme de l'œil", "eyeColor": "Couleur de l'œil",
        "gradient": "Utiliser un dégradé", "logoSize": "Taille du logo", "logoMargin": "Marge du logo"
      },
      "preview": { "title": "Aperçu du code QR", "download": "Télécharger", "scanTest": "Scannez pour tester" },
      "footer": { "privacy": "Politique de confidentialité", "terms": "Conditions d'utilisation" }
    }
  },
  de: {
    translation: {
      "appTitle": "Kostenloser QR-Code Generator",
      "tagline": "Erstellen Sie QR-Codes mit Logo & Farbe - Ohne Anmeldung, Unbegrenzt",
      "types": {
        "url": "URL", "wifi": "WLAN", "vcard": "vCard", "text": "Text",
        "email": "E-Mail", "phone": "Telefon", "sms": "SMS", "location": "Standort", "event": "Ereignis"
      },
      "form": {
        "enterUrl": "Geben Sie Ihre Website-URL ein", "networkName": "Netzwerkname (SSID)", "password": "Passwort",
        "encryption": "Verschlüsselung", "firstName": "Vorname", "lastName": "Nachname", "phone": "Telefonnummer",
        "email": "E-Mail Adresse", "textPlaceholder": "Geben Sie hier Ihren Text ein", "emailTo": "Senden an",
        "emailSubject": "Betreff", "emailBody": "Nachricht", "smsMessage": "SMS-Nachricht",
        "lat": "Breitengrad", "lng": "Längengrad", "eventTitle": "Ereignistitel", "eventLocation": "Ereignisort",
        "eventStart": "Startzeit", "eventEnd": "Endzeit"
      },
      "customization": {
        "colors": "Farben", "logo": "Logo hinzufügen", "design": "Designmuster", "foreground": "Vordergrundfarbe",
        "background": "Hintergrundfarbe", "uploadLogo": "Logo hochladen", "removeLogo": "Logo entfernen",
        "dotsStyle": "Musterstil", "cornersStyle": "Augenform", "eyeColor": "Augenfarbe",
        "gradient": "Farbverlauf verwenden", "logoSize": "Logogröße", "logoMargin": "Logorand"
      },
      "preview": { "title": "QR-Code Vorschau", "download": "Herunterladen", "scanTest": "Zum Testen scannen" },
      "footer": { "privacy": "Datenschutz-Bestimmungen", "terms": "Nutzungsbedingungen" }
    }
  },
  pt: {
    translation: {
      "appTitle": "Gerador de Código QR Grátis",
      "tagline": "Crie Códigos QR com Logotipo e Cor - Sem Registro, Ilimitado",
      "types": {
        "url": "URL", "wifi": "Wi-Fi", "vcard": "vCard", "text": "Texto",
        "email": "E-mail", "phone": "Telefone", "sms": "SMS", "location": "Localização", "event": "Evento"
      },
      "form": {
        "enterUrl": "Insira o URL do seu site", "networkName": "Nome da Rede (SSID)", "password": "Senha",
        "encryption": "Criptografia", "firstName": "Nome", "lastName": "Sobrenome", "phone": "Número de Telefone",
        "email": "Endereço de E-mail", "textPlaceholder": "Insira seu texto aqui", "emailTo": "Enviar Para",
        "emailSubject": "Assunto", "emailBody": "Corpo da Mensagem", "smsMessage": "Mensagem SMS",
        "lat": "Latitude", "lng": "Longitude", "eventTitle": "Título do Evento", "eventLocation": "Local do Evento",
        "eventStart": "Hora de Início", "eventEnd": "Hora de Término"
      },
      "customization": {
        "colors": "Cores", "logo": "Adicionar Logotipo", "design": "Padrões de Design", "foreground": "Cor Principal",
        "background": "Cor de Fundo", "uploadLogo": "Enviar Logotipo", "removeLogo": "Remover Logotipo",
        "dotsStyle": "Estilo de Padrão", "cornersStyle": "Forma do Olho", "eyeColor": "Cor do Olho",
        "gradient": "Usar Gradiente", "logoSize": "Tamanho do Logo", "logoMargin": "Margem do Logo"
      },
      "preview": { "title": "Visualização do Código QR", "download": "Baixar", "scanTest": "Digitalize para testar" },
      "footer": { "privacy": "Política de Privacidade", "terms": "Termos de Serviço" }
    }
  },
  zh: {
    translation: {
      "appTitle": "免费在线二维码生成器",
      "tagline": "使用标志和颜色创建二维码 - 无需注册，无限使用",
      "types": {
        "url": "网址", "wifi": "无线网络", "vcard": "电子名片", "text": "文本",
        "email": "电子邮件", "phone": "电话", "sms": "短信", "location": "位置", "event": "活动"
      },
      "form": {
        "enterUrl": "输入您的网站URL", "networkName": "网络名称 (SSID)", "password": "密码",
        "encryption": "加密方式", "firstName": "名字", "lastName": "姓氏", "phone": "电话号码",
        "email": "电子邮件地址", "textPlaceholder": "在此输入您的文本", "emailTo": "发送至",
        "emailSubject": "主题", "emailBody": "消息正文", "smsMessage": "短信内容",
        "lat": "纬度", "lng": "经度", "eventTitle": "活动标题", "eventLocation": "活动地点",
        "eventStart": "开始时间", "eventEnd": "结束时间"
      },
      "customization": {
        "colors": "颜色", "logo": "添加标志", "design": "设计图案", "foreground": "前景色",
        "background": "背景色", "uploadLogo": "上传标志", "removeLogo": "移除标志",
        "dotsStyle": "图案样式", "cornersStyle": "眼睛形状", "eyeColor": "眼睛颜色",
        "gradient": "使用渐变", "logoSize": "标志尺寸", "logoMargin": "标志边距"
      },
      "preview": { "title": "二维码预览", "download": "下载", "scanTest": "扫描测试" },
      "footer": { "privacy": "隐私政策", "terms": "服务条款" }
    }
  },
  ja: {
    translation: {
      "appTitle": "無料QRコードジェネレーター",
      "tagline": "ロゴとカラーでQRコードを作成 - 登録不要、無制限",
      "types": {
        "url": "URL", "wifi": "Wi-Fi", "vcard": "vCard", "text": "テキスト",
        "email": "メール", "phone": "電話", "sms": "SMS", "location": "位置情報", "event": "イベント"
      },
      "form": {
        "enterUrl": "ウェブサイトのURLを入力", "networkName": "ネットワーク名 (SSID)", "password": "パスワード",
        "encryption": "暗号化", "firstName": "名", "lastName": "姓", "phone": "電話番号",
        "email": "メールアドレス", "textPlaceholder": "ここにテキストを入力", "emailTo": "送信先",
        "emailSubject": "件名", "emailBody": "メッセージ本文", "smsMessage": "SMSメッセージ",
        "lat": "緯度", "lng": "経度", "eventTitle": "イベント名", "eventLocation": "イベントの場所",
        "eventStart": "開始時間", "eventEnd": "終了時間"
      },
      "customization": {
        "colors": "色", "logo": "ロゴを追加", "design": "デザインパターン", "foreground": "前景色",
        "background": "背景色", "uploadLogo": "ロゴをアップロード", "removeLogo": "ロゴを削除",
        "dotsStyle": "パターンスタイル", "cornersStyle": "目の形", "eyeColor": "目の色",
        "gradient": "グラデーションを使用", "logoSize": "ロゴのサイズ", "logoMargin": "ロゴの余白"
      },
      "preview": { "title": "QRコードプレビュー", "download": "ダウンロード", "scanTest": "スキャンしてテスト" },
      "footer": { "privacy": "プライバシーポリシー", "terms": "利用規約" }
    }
  },
  hi: {
    translation: {
      "appTitle": "मुफ़्त क्यूआर कोड जनरेटर",
      "tagline": "लोगो और रंग के साथ क्यूआर कोड बनाएं - कोई साइनअप नहीं, असीमित",
      "types": {
        "url": "यूआरएल", "wifi": "वाई-फाई", "vcard": "वी-कार्ड", "text": "टेक्स्ट",
        "email": "ईमेल", "phone": "फ़ोन", "sms": "एसएमएस", "location": "स्थान", "event": "आयोजन"
      },
      "form": {
        "enterUrl": "अपनी वेबसाइट का यूआरएल दर्ज करें", "networkName": "नेटवर्क का नाम (SSID)", "password": "पासवर्ड",
        "encryption": "एन्क्रिप्शन", "firstName": "पहला नाम", "lastName": "अंतिम नाम", "phone": "फ़ोन नंबर",
        "email": "ईमेल पता", "textPlaceholder": "अपना टेक्स्ट यहां दर्ज करें", "emailTo": "को भेजें",
        "emailSubject": "विषय", "emailBody": "संदेश का मुख्य भाग", "smsMessage": "एसएमएस संदेश",
        "lat": "अक्षांश", "lng": "देशांतर", "eventTitle": "आयोजन का शीर्षक", "eventLocation": "आयोजन का स्थान",
        "eventStart": "प्रारंभ समय", "eventEnd": "समाप्ति समय"
      },
      "customization": {
        "colors": "रंग", "logo": "लोगो जोड़ें", "design": "डिज़ाइन पैटर्न", "foreground": "अग्रभूमि रंग",
        "background": "पृष्ठभूमि रंग", "uploadLogo": "लोगो अपलोड करें", "removeLogo": "लोगो हटाएं",
        "dotsStyle": "पैटर्न शैली", "cornersStyle": "आंख का आकार", "eyeColor": "आंख का रंग",
        "gradient": "ग्रेडिएंट का उपयोग करें", "logoSize": "लोगो का आकार", "logoMargin": "लोगो मार्जिन"
      },
      "preview": { "title": "क्यूआर कोड पूर्वावलोकन", "download": "डाउनलोड", "scanTest": "परीक्षण के लिए स्कैन करें" },
      "footer": { "privacy": "गोपनीयता नीति", "terms": "सेवा की शर्तें" }
    }
  },
  ko: {
    translation: {
      "appTitle": "무료 QR 코드 생성기",
      "tagline": "로고와 색상이 있는 QR 코드 만들기 - 가입 없음, 무제한",
      "types": {
        "url": "URL", "wifi": "와이파이", "vcard": "명함(vCard)", "text": "텍스트",
        "email": "이메일", "phone": "전화", "sms": "문자", "location": "위치", "event": "이벤트"
      },
      "form": {
        "enterUrl": "웹사이트 URL 입력", "networkName": "네트워크 이름(SSID)", "password": "비밀번호",
        "encryption": "암호화", "firstName": "이름", "lastName": "성", "phone": "전화번호",
        "email": "이메일 주소", "textPlaceholder": "여기에 텍스트 입력", "emailTo": "받는 사람",
        "emailSubject": "제목", "emailBody": "메시지 본문", "smsMessage": "SMS 메시지",
        "lat": "위도", "lng": "경도", "eventTitle": "이벤트 제목", "eventLocation": "이벤트 위치",
        "eventStart": "시작 시간", "eventEnd": "종료 시간"
      },
      "customization": {
        "colors": "색상", "logo": "로고 추가", "design": "디자인 패턴", "foreground": "전경색",
        "background": "배경색", "uploadLogo": "로고 업로드", "removeLogo": "로고 제거",
        "dotsStyle": "패턴 스타일", "cornersStyle": "눈 모양", "eyeColor": "눈 색상",
        "gradient": "그라데이션 사용", "logoSize": "로고 크기", "logoMargin": "로고 여백"
      },
      "preview": { "title": "QR 코드 미리보기", "download": "다운로드", "scanTest": "스캔하여 테스트" },
      "footer": { "privacy": "개인정보 보호정책", "terms": "서비스 약관" }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
