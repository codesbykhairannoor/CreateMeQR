const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/logoqr.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const colorCounts = {};
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a > 128) {
            // Ignore perfectly black and perfectly white pixels
            if ((r < 20 && g < 20 && b < 20) || (r > 240 && g > 240 && b > 240)) continue;
            
            const rr = Math.round(r / 5) * 5;
            const gg = Math.round(g / 5) * 5;
            const bb = Math.round(b / 5) * 5;
            const key = `${rr},${gg},${bb}`;
            colorCounts[key] = (colorCounts[key] || 0) + 1;
        }
      }
    }
    
    const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    console.log("Top 10 NON-BLACK/NON-WHITE Colors (R,G,B):");
    sortedColors.slice(0, 10).forEach(c => {
        const [r, g, b] = c[0].split(',').map(Number);
        const hex = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
        console.log(`- ${c[0]} (HEX: ${hex}): ${c[1]} pixels`);
    });
  });
