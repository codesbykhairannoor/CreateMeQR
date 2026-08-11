const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const warnings = [];

function checkFile(filePath) {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.tsx')) return;
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all className strings
    const classRegex = /className=["']([^"']+)["']/g;
    let match;
    let lineNumber = 1;

    const lines = content.split('\n');

    lines.forEach((line, i) => {
        let classMatch;
        while ((classMatch = classRegex.exec(line)) !== null) {
            const classes = classMatch[1].split(/\s+/);
            
            const hasDarkText = classes.some(c => c.startsWith('dark:text-'));
            const hasDarkBg = classes.some(c => c.startsWith('dark:bg-'));
            
            const hasLightText = classes.some(c => c.startsWith('text-') && !c.startsWith('dark:'));
            const hasLightBg = classes.some(c => c.startsWith('bg-') && !c.startsWith('dark:') && !c.startsWith('bg-gradient') && !c.startsWith('bg-clip') && !c.startsWith('bg-transparent'));
            
            // Check 1: Dark text on light mode without dark mode equivalent
            const darkTextClasses = ['text-black', 'text-gray-900', 'text-zinc-900', 'text-gray-800', 'text-zinc-800', 'text-slate-900', 'text-slate-800'];
            const hasDarkTextClass = classes.some(c => darkTextClasses.includes(c));
            if (hasDarkTextClass && !hasDarkText) {
                warnings.push(`[WARN] ${filePath}:${i+1} -> Dark text (${classes.find(c=>darkTextClasses.includes(c))}) without dark mode equivalent (dark:text-...)`);
            }

            // Check 2: Light text on light mode without dark mode equivalent
            const lightTextClasses = ['text-white', 'text-gray-50', 'text-zinc-50', 'text-gray-100', 'text-zinc-100', 'text-slate-50'];
            const hasLightTextClass = classes.some(c => lightTextClasses.includes(c));
            // If it has light text, it might be on a dark bg. Let's see if there's a dark background.
            const hasDarkBgClass = classes.some(c => ['bg-gray-900', 'bg-black', 'bg-zinc-900', 'bg-slate-900', 'bg-blue-600', 'bg-blue-700', 'bg-indigo-600'].includes(c) || c.startsWith('from-') || c.startsWith('to-'));
            if (hasLightTextClass && !hasDarkBgClass) {
                 warnings.push(`[WARN] ${filePath}:${i+1} -> Light text (${classes.find(c=>lightTextClasses.includes(c))}) without explicit dark background.`);
            }
            
            // Check 3: Backgrounds without dark mode equivalents
            const hasWhiteBgClass = classes.some(c => ['bg-white', 'bg-gray-50', 'bg-zinc-50'].includes(c));
            if (hasWhiteBgClass && !hasDarkBg) {
                 warnings.push(`[WARN] ${filePath}:${i+1} -> Light background (${classes.find(c=>['bg-white', 'bg-gray-50', 'bg-zinc-50'].includes(c))}) without dark mode equivalent (dark:bg-...)`);
            }
        }
    });
}

walkDir('./src', checkFile);

console.log("Analysis Complete. Found " + warnings.length + " potential contrast issues.");
if (warnings.length > 0) {
    warnings.forEach(w => console.log(w));
}
