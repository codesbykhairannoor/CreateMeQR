<div align="center">

# ⚡ CreateMyQR

### The Free, Open-Source & 100% Client-Side QR Code & Barcode Suite

[![Production Web App](https://img.shields.io/badge/Production-createmy--qr.com-0284c7?style=for-the-badge&logo=vercel&logoColor=white)](https://createmy-qr.com/)
[![GitHub Pages Showcase](https://img.shields.io/badge/Docs_Hub-github.io-6366f1?style=for-the-badge&logo=github&logoColor=white)](https://codesbykhairannoor.github.io/CreateMeQR/)
[![Privacy Guarantee](https://img.shields.io/badge/Privacy-100%25_Client--Side-10b981?style=for-the-badge&logo=shield&logoColor=white)](https://createmy-qr.com/privacy)
[![Languages](https://img.shields.io/badge/Languages-30_Locales-f59e0b?style=for-the-badge&logo=translate&logoColor=white)](https://createmy-qr.com/languages)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

**CreateMyQR** is a modern, privacy-first vector QR code and barcode generator designed to dismantle the predatory $40/month SaaS subscription model. Every code is calculated **100% offline inside the browser thread** using HTML5 Canvas and WebAssembly. No expiring redirect proxies, no data-mining middleboxes, and zero recurring fees.

[🚀 **Launch Web App**](https://createmy-qr.com/) &nbsp;•&nbsp; [📖 **Developer Hub**](https://codesbykhairannoor.github.io/CreateMeQR/) &nbsp;•&nbsp; [⚖️ **Comparison Matrix**](https://createmy-qr.com/compare) &nbsp;•&nbsp; [🛡️ **Privacy Architecture**](https://createmy-qr.com/privacy)

</div>

---

## 🌟 Why CreateMyQR?

Commercial QR code providers typically lure users with "free" dynamic QR codes that silently stop functioning after a 14-day trial unless an expensive monthly subscription is paid. Once printed on physical menus, flyers, or business cards, users are held hostage.

**CreateMyQR solves this fundamentally:**
* 💎 **Direct ISO/IEC 18004 Encoding**: Payload data is directly compiled into binary matrix modules. No middleman redirect servers are ever involved. Once printed, your codes will scan reliably for decades.
* 🛡️ **Zero-Knowledge Privacy**: Payload strings (Wi-Fi passwords, private crypto addresses, vCard contacts) never leave your device.
* 📐 **Vector SVG & High-DPI Exports**: Native support for infinite-resolution vector `.svg` exports alongside crystal-clear `.png` and `.webp` with automated Level Q error correction for logo embedding.
* 🌍 **Global Native Localization**: Available in 30 human languages across 1,680 programmatic routing combinations.

---

## 🛠️ Specialized Generator Suite (37 Formats)

Explore our specialized tools directly on [CreateMyQR](https://createmy-qr.com/):

| Category | Specialized Tool | Live Production Link |
| :--- | :--- | :--- |
| **Networking** | 📶 Instant WiFi Auto-Connect | [createmy-qr.com/wifi-qr-code-generator](https://createmy-qr.com/wifi-qr-code-generator) |
| **Professional** | 📇 vCard Digital Contact Card | [createmy-qr.com/vcard-qr-code-maker](https://createmy-qr.com/vcard-qr-code-maker) |
| **Messaging** | 💬 WhatsApp Direct Chat & Support | [createmy-qr.com/whatsapp-qr-code-generator](https://createmy-qr.com/whatsapp-qr-code-generator) |
| **Retail & Logistics** | 📊 Linear Barcode Suite (Code 128, EAN-13, UPC) | [createmy-qr.com/barcode-generator](https://createmy-qr.com/barcode-generator) |
| **Hospitality** | 📄 Restaurant Menu PDF Contactless | [createmy-qr.com/pdf-qr-code-generator](https://createmy-qr.com/pdf-qr-code-generator) |
| **Reputation** | ⭐ Google 5-Star Review Prompt | [createmy-qr.com/google-review-qr-code-generator](https://createmy-qr.com/google-review-qr-code-generator) |
| **Web3 & Payments** | 🪙 Crypto Wallet (BTC, ETH, SOL) | [createmy-qr.com/crypto-qr-code-generator](https://createmy-qr.com/crypto-qr-code-generator) |
| **Fintech** | 💳 PayPal & Venmo Instant Pay | [createmy-qr.com/paypal-qr-code-generator](https://createmy-qr.com/paypal-qr-code-generator) |
| **Social Growth** | 📸 Instagram Profile & Post Link | [createmy-qr.com/instagram-qr-code-generator](https://createmy-qr.com/instagram-qr-code-generator) |
| **Media & Audio** | 🎵 Spotify Playlist & Track Link | [createmy-qr.com/spotify-qr-code-generator](https://createmy-qr.com/spotify-qr-code-generator) |
| **Lead Generation** | 📋 Google Forms Survey / RSVP | [createmy-qr.com/google-forms-qr-code-generator](https://createmy-qr.com/google-forms-qr-code-generator) |
| **Hardware Scanner** | 📷 Camera QR & Barcode Decoder | [createmy-qr.com/scan-qr](https://createmy-qr.com/scan-qr) |

---

## 🏗️ Technical Architecture & Stack

```
CreateMyQR Architecture
│
├── Frontend Client (React 18 + Vite)
│   ├── In-Browser QR Matrix Engine (qrcode.react / custom Canvas)
│   ├── In-Browser 1D Barcode Renderer (JsBarcode / Canvas)
│   ├── Vector SVG Exporter with Error Correction Padding
│   └── Web Worker Parallel Compression
│
├── Global Internationalization (i18n)
│   ├── 30 Locale Dictionaries (en, es, fr, de, id, ja, ko, zh, ar, etc.)
│   └── Programmatic SEO Router (1,680 static indexable landing targets)
│
└── Developer Ecosystem
    ├── GitHub Pages Developer Hub: https://codesbykhairannoor.github.io/CreateMeQR/
    └── Automated Daily Google Indexing API Pipeline (GitHub Actions)
```

- **Framework**: React 18 with Vite build tooling
- **Styling**: TailwindCSS & Custom Glassmorphic CSS design system
- **Icons**: Lucide React
- **Client Processing**: Web Workers for heavy image rendering & data conversion
- **Zero Backend Dependency**: Fully operable offline as a Progressive Web App (PWA)

---

## 🚀 Local Development Setup

Clone the repository and spin up the local development environment:

```bash
# 1. Clone the repository
git clone https://github.com/codesbykhairannoor/CreateMeQR.git

# 2. Navigate to project root
cd CreateMeQR

# 3. Install dependencies
npm install

# 4. Start local Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🌐 Official Deployments

- **Production Application**: [https://createmy-qr.com/](https://createmy-qr.com/)
- **Developer Hub & Architecture Reference**: [https://codesbykhairannoor.github.io/CreateMeQR/](https://codesbykhairannoor.github.io/CreateMeQR/)
- **Repository**: [https://github.com/codesbykhairannoor/CreateMeQR](https://github.com/codesbykhairannoor/CreateMeQR)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Maintained with ❤️ by [Khairan Noor](https://github.com/codesbykhairannoor).
