const fs = require('fs');

// Path
const scanQrPath = 'src/pages/ScanQr.jsx';
const barcodePath = 'src/pages/BarcodeGenerator.jsx';

// Function to safely replace
function replaceSafe(str, target, replacement) {
  if (!str.includes(target)) console.warn("Missed target:", target.substring(0, 30));
  return str.replace(target, replacement);
}

let scanQr = fs.readFileSync(scanQrPath, 'utf8');

if (!scanQr.includes('useTranslation')) {
  scanQr = scanQr.replace("import React, {", "import React, { useEffect, useRef, useState } from 'react';\nimport { useTranslation } from 'react-i18next';\n// import React, {");
}
if (!scanQr.includes('const { t } = useTranslation();')) {
  scanQr = scanQr.replace("export default function ScanQr() {", "export default function ScanQr() {\n  const { t } = useTranslation();");
}

scanQr = replaceSafe(scanQr, 'Cyber Scanner V1', '{t("scanqr.hero.badge", "Cyber Scanner V1")}');
scanQr = replaceSafe(scanQr, '>Instant<', '>{t("scanqr.hero.title", "Instant")}<');
scanQr = replaceSafe(scanQr, '>QR Scanner<', '>{t("scanqr.hero.titleHighlight", "QR Scanner")}<');
scanQr = replaceSafe(scanQr, '>Scan from your webcam or upload an image. 100% private, zero data is sent to our servers.<', '>{t("scanqr.hero.desc", "Scan from your webcam or upload an image. 100% private, zero data is sent to our servers.")}<');
scanQr = replaceSafe(scanQr, '>Initialize Camera<', '>{t("scanqr.workspace.initCam", "Initialize Camera")}<');
scanQr = replaceSafe(scanQr, '>Scan a QR code using your device\'s camera<', '>{t("scanqr.workspace.initCamDesc", "Scan a QR code using your device\'s camera")}<');
scanQr = replaceSafe(scanQr, '>Start Scanning<', '>{t("scanqr.workspace.startBtn", "Start Scanning")}<');
scanQr = replaceSafe(scanQr, '>Cancel<', '>{t("scanqr.workspace.cancelBtn", "Cancel")}<');
scanQr = replaceSafe(scanQr, '>Scan Successful<', '>{t("scanqr.workspace.successTitle", "Scan Successful")}<');
scanQr = replaceSafe(scanQr, '>Scan Another Code<', '>{t("scanqr.workspace.scanAnother", "Scan Another Code")}<');
scanQr = replaceSafe(scanQr, '>Or upload an image<', '>{t("scanqr.workspace.orUpload", "Or upload an image")}<');
scanQr = replaceSafe(scanQr, '>Upload QR Image File<', '>{t("scanqr.workspace.uploadBtn", "Upload QR Image File")}<');
scanQr = replaceSafe(scanQr, '>Decoded Result<', '>{t("scanqr.workspace.decodedResult", "Decoded Result")}<');
scanQr = replaceSafe(scanQr, '>Copy Data<', '>{t("scanqr.workspace.copyBtn", "Copy Data")}<');
scanQr = replaceSafe(scanQr, '>Copied!<', '>{t("scanqr.workspace.copied", "Copied!")}<');
scanQr = replaceSafe(scanQr, '>Open Link<', '>{t("scanqr.workspace.openLink", "Open Link")}<');
scanQr = replaceSafe(scanQr, '>Not a link<', '>{t("scanqr.workspace.notLink", "Not a link")}<');
scanQr = replaceSafe(scanQr, '>Waiting for scan...<', '>{t("scanqr.workspace.waiting", "Waiting for scan...")}<');
scanQr = replaceSafe(scanQr, '>Point your camera at a QR code or upload an image.<', '>{t("scanqr.workspace.waitingDesc", "Point your camera at a QR code or upload an image.")}<');
scanQr = replaceSafe(scanQr, '>Why use our Scanner?<', '>{t("scanqr.features.whyTitle", "Why use our Scanner?")}<');
scanQr = replaceSafe(scanQr, '>No App Required<', '>{t("scanqr.features.noAppTitle", "No App Required")}<');
scanQr = replaceSafe(scanQr, '>Scan QR codes directly from your browser without downloading any bloated apps. Works perfectly on iOS, Android, and Desktop.<', '>{t("scanqr.features.noAppDesc", "Scan QR codes directly from your browser without downloading any bloated apps. Works perfectly on iOS, Android, and Desktop.")}<');
scanQr = replaceSafe(scanQr, '>100% Secure & Private<', '>{t("scanqr.features.secureTitle", "100% Secure & Private")}<');
scanQr = replaceSafe(scanQr, '>Your images and camera feed are processed entirely on your device. We never send your scan data to any external servers.<', '>{t("scanqr.features.secureDesc", "Your images and camera feed are processed entirely on your device. We never send your scan data to any external servers.")}<');
scanQr = replaceSafe(scanQr, '>Lightning Fast<', '>{t("scanqr.features.fastTitle", "Lightning Fast")}<');
scanQr = replaceSafe(scanQr, '>Optimized WASM engine decodes complex QR codes instantly, even in low light conditions or with blurry cameras.<', '>{t("scanqr.features.fastDesc", "Optimized WASM engine decodes complex QR codes instantly, even in low light conditions or with blurry cameras.")}<');
scanQr = replaceSafe(scanQr, '>More Than Just URLs.<', '>{t("scanqr.features.moreTitle", "More Than Just URLs.")}<');
scanQr = replaceSafe(scanQr, '>Our advanced scanner instantly recognizes various payload types. It doesn\'t just read the text, it understands the context.<', `>{t("scanqr.features.moreDesc", "Our advanced scanner instantly recognizes various payload types. It doesn't just read the text, it understands the context.")}<`);
scanQr = replaceSafe(scanQr, '>WiFi Credentials Parsing<', '>{t("scanqr.features.moreList1", "WiFi Credentials Parsing")}<');
scanQr = replaceSafe(scanQr, '>vCard Contact Import<', '>{t("scanqr.features.moreList2", "vCard Contact Import")}<');
scanQr = replaceSafe(scanQr, '>Crypto Addresses<', '>{t("scanqr.features.moreList3", "Crypto Addresses")}<');
scanQr = replaceSafe(scanQr, '>Universal Format Support<', '>{t("scanqr.features.formatTitle", "Universal Format Support")}<');
scanQr = replaceSafe(scanQr, '>Upload an image containing any of these 2D barcodes, and we will decode it instantly right in your browser.<', '>{t("scanqr.features.formatDesc", "Upload an image containing any of these 2D barcodes, and we will decode it instantly right in your browser.")}<');
scanQr = replaceSafe(scanQr, 'Failed to start camera. Please ensure you have granted camera permissions.', '", t("scanqr.workspace.errCam", "Failed to start camera. Please ensure you have granted camera permissions."), "');
scanQr = replaceSafe(scanQr, 'No QR code found in the image. Please try another image.', '", t("scanqr.workspace.errImg", "No QR code found in the image. Please try another image."), "');

fs.writeFileSync(scanQrPath, scanQr);
console.log("ScanQr patched");


let barcode = fs.readFileSync(barcodePath, 'utf8');

if (!barcode.includes('useTranslation')) {
  barcode = barcode.replace("import React, {", "import React, { useState, useEffect, useRef } from 'react';\nimport { useTranslation } from 'react-i18next';\n// import React, {");
}
if (!barcode.includes('const { t } = useTranslation();')) {
  barcode = barcode.replace("export default function BarcodeGenerator() {", "export default function BarcodeGenerator() {\n  const { t } = useTranslation();");
}

barcode = replaceSafe(barcode, 'Professional Barcode Tools', '{t("barcode.hero.badge", "Professional Barcode Tools")}');
barcode = replaceSafe(barcode, '>Generate<', '>{t("barcode.hero.title", "Generate")}<');
barcode = replaceSafe(barcode, '>Barcodes<', '>{t("barcode.hero.titleHighlight", "Barcodes")}<');
barcode = replaceSafe(barcode, '>Instantly<', '>{t("barcode.hero.titleSuffix", "Instantly")}<');
barcode = replaceSafe(barcode, '>Create high-quality inventory tags, shipping labels, and retail codes in seconds.<', '>{t("barcode.hero.desc", "Create high-quality inventory tags, shipping labels, and retail codes in seconds.")}<');
barcode = replaceSafe(barcode, '>Barcode Data<', '>{t("barcode.workspace.dataTitle", "Barcode Data")}<');
barcode = replaceSafe(barcode, '>Barcode Content<', '>{t("barcode.workspace.contentLabel", "Barcode Content")}<');
barcode = replaceSafe(barcode, 'placeholder="Enter numbers or text..."', 'placeholder={t("barcode.workspace.contentPlaceholder", "Enter numbers or text...")}');
barcode = replaceSafe(barcode, '>Barcode Standard / Format<', '>{t("barcode.workspace.formatLabel", "Barcode Standard / Format")}<');
barcode = replaceSafe(barcode, '>Visual Tuning<', '>{t("barcode.workspace.visualTitle", "Visual Tuning")}<');
barcode = replaceSafe(barcode, '>Bar Width<', '>{t("barcode.workspace.widthLabel", "Bar Width")}<');
barcode = replaceSafe(barcode, '>Bar Height<', '>{t("barcode.workspace.heightLabel", "Bar Height")}<');
barcode = replaceSafe(barcode, '>Line Color<', '>{t("barcode.workspace.lineColor", "Line Color")}<');
barcode = replaceSafe(barcode, '>Background Color<', '>{t("barcode.workspace.bgColor", "Background Color")}<');
barcode = replaceSafe(barcode, '>Show Text Value Below Code<', '>{t("barcode.workspace.showText", "Show Text Value Below Code")}<');
barcode = replaceSafe(barcode, '>Live Output<', '>{t("barcode.workspace.liveOutput", "Live Output")}<');
barcode = replaceSafe(barcode, '>Enter data to generate<', '>{t("barcode.workspace.enterData", "Enter data to generate")}<');
barcode = replaceSafe(barcode, '>Download High-Res PNG<', '>{t("barcode.workspace.download", "Download High-Res PNG")}<');
barcode = replaceSafe(barcode, '>Supported Barcode Formats<', '>{t("barcode.features.standardsTitle", "Supported Barcode Formats")}<');
barcode = replaceSafe(barcode, '>Choose the right standard for your industry. From retail checkout to warehouse logistics.<', '>{t("barcode.features.standardsDesc", "Choose the right standard for your industry. From retail checkout to warehouse logistics.")}<');
barcode = replaceSafe(barcode, '>Highly compact and versatile. Supports the full ASCII character set. Ideal for general inventory and internal tracking systems.<', '>{t("barcode.features.c128Desc", "Highly compact and versatile. Supports the full ASCII character set. Ideal for general inventory and internal tracking systems.")}<');
barcode = replaceSafe(barcode, '>Designed for packaging levels like cartons or pallets. Uses thick borders to improve scanning accuracy on corrugated cardboard.<', '>{t("barcode.features.itf14Desc", "Designed for packaging levels like cartons or pallets. Uses thick borders to improve scanning accuracy on corrugated cardboard.")}<');
barcode = replaceSafe(barcode, '>The global standard for point-of-sale retail. EAN-13 is used worldwide, while UPC-A is standard in North America.<', '>{t("barcode.features.upcDesc", "The global standard for point-of-sale retail. EAN-13 is used worldwide, while UPC-A is standard in North America.")}<');
barcode = replaceSafe(barcode, '>Built for Production & Logistics<', '>{t("barcode.features.mfgTitle", "Built for Production & Logistics")}<');
barcode = replaceSafe(barcode, '>Our generator creates crisp, pixel-perfect PNG files that scale beautifully for print. We don\'t use fuzzy raster images—our engine renders pure SVG math before converting it to high-res PNG downloads.<', `>{t("barcode.features.mfgDesc", "Our generator creates crisp, pixel-perfect PNG files that scale beautifully for print. We don't use fuzzy raster images—our engine renders pure SVG math before converting it to high-res PNG downloads.")}<`);
barcode = replaceSafe(barcode, '>Absolute Precision: No blurry edges.<', '>{t("barcode.features.mfgList1", "Absolute Precision: No blurry edges.")}<');
barcode = replaceSafe(barcode, '>Custom Padding: Safe zones for thermal printers.<', '>{t("barcode.features.mfgList2", "Custom Padding: Safe zones for thermal printers.")}<');
barcode = replaceSafe(barcode, '>100% Free: No subscriptions for basic generation.<', '>{t("barcode.features.mfgList3", "100% Free: No subscriptions for basic generation.")}<');
barcode = replaceSafe(barcode, '>Factory Ready<', '>{t("barcode.features.mfgBadge", "Factory Ready")}<');
barcode = replaceSafe(barcode, '>High contrast for laser scanners<', '>{t("barcode.features.mfgBadgeDesc", "High contrast for laser scanners")}<');
barcode = replaceSafe(barcode, '>Perfect for E-Commerce & Retail<', '>{t("barcode.features.ecoTitle", "Perfect for E-Commerce & Retail")}<');
barcode = replaceSafe(barcode, '>Whether you are listing a new product on Amazon (FBA) or setting up your own Shopify storefront, generating UPC and EAN codes is required for global distribution.<', '>{t("barcode.features.ecoDesc", "Whether you are listing a new product on Amazon (FBA) or setting up your own Shopify storefront, generating UPC and EAN codes is required for global distribution.")}<');
barcode = replaceSafe(barcode, '>Generate UPC Code Now<', '>{t("barcode.features.btnUpc", "Generate UPC Code Now")}<');
barcode = replaceSafe(barcode, '>Generate EAN-13 Code Now<', '>{t("barcode.features.btnEan", "Generate EAN-13 Code Now")}<');

fs.writeFileSync(barcodePath, barcode);
console.log("Barcode patched");
