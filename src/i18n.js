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
