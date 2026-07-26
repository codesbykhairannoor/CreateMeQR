const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const newTypes = {
  pdf: "PDF",
  gforms: "Google Forms",
  greview: "Google Review",
  image: "Image",
  linkinbio: "Link in Bio",
  video: "Video",
  audio: "Audio",
  amazon: "Amazon",
  booking: "Booking",
  file: "File"
};

const newFormFields = {
  pdfInput: "PDF Document URL",
  enter_pdf: "https://.../document.pdf",
  gformsInput: "Google Form URL",
  enter_gforms: "https://docs.google.com/forms/...",
  greviewInput: "Google Review Link",
  enter_greview: "https://g.page/r/...",
  imageInput: "Image URL",
  enter_image: "https://.../image.jpg",
  linkinbioInput: "Link in Bio Profile",
  enter_linkinbio: "https://linktr.ee/...",
  videoInput: "Video URL",
  enter_video: "https://vimeo.com/...",
  audioInput: "Audio/Podcast URL",
  enter_audio: "https://soundcloud.com/...",
  amazonInput: "Amazon Product Link",
  enter_amazon: "https://amazon.com/dp/...",
  bookingInput: "Booking/Calendar Link",
  enter_booking: "https://calendly.com/...",
  fileInput: "File Download URL",
  enter_file: "https://dropbox.com/s/..."
};

enData.types = { ...enData.types, ...newTypes };
enData.form = { ...enData.form, ...newFormFields };

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log("Added new types and form fields to en/translation.json");
