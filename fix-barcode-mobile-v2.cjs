const fs = require('fs');
const path = 'src/pages/BarcodeGenerator.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add isMobile state
const stateTarget = `  const [displayValue, setDisplayValue] = useState(true);\n  const barcodeRef = useRef(null);`;
const newState = `  const [displayValue, setDisplayValue] = useState(true);\n  const barcodeRef = useRef(null);\n  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);\n\n  useEffect(() => {\n    const handleResize = () => setIsMobile(window.innerWidth < 1024);\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);`;
content = content.replace(stateTarget, newState);

// 2. Define LivePreviewCard function before `return (`
const previewComponentString = `
  const LivePreviewCard = () => (
    <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 shadow-2xl border border-blue-700/50 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <BarChart2 className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white tracking-tighter">{t("barcode.workspace.liveOutput", "Live Output")}</h2>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative z-10 min-h-[300px]">
        <div 
          ref={barcodeRef} 
          className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: background }}
        >
          {value ? (
            <Barcode 
              value={value} 
              format={format} 
              lineColor={lineColor}
              background={background}
              width={width}
              height={height}
              displayValue={displayValue}
              margin={0}
            />
          ) : (
            <div className="w-64 h-24 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold">
              <p className="text-slate-500 dark:text-slate-400 font-medium">{t("barcode.workspace.enterData", "Enter data to generate")}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 space-y-4 relative z-10">
        <button 
          onClick={handleDownload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
        >
          <Download className="w-5 h-5" /> {t("barcode.workspace.download", "Download High-Res PNG")}
        </button>
      </div>
    </div>
  );
`;

const returnTarget = `  return (\n    <div`;
content = content.replace(returnTarget, previewComponentString + '\n' + returnTarget);

// 3. Replace the original Live Preview in Right Column with { !isMobile && <LivePreviewCard /> }
// We find it by its starting and ending HTML comments or tags.
const rightColStart = `{/* Right Column: Live Preview (5 cols) */}`;
const startIndex = content.indexOf(rightColStart);
const endIndex = content.indexOf(`          </div>\n          \n        </div>\n      </section>`);

if (startIndex !== -1 && endIndex !== -1) {
  const originalRightCol = content.substring(startIndex, endIndex);
  const newRightCol = `{/* Right Column: Live Preview (5 cols) */}\n          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24 h-fit">\n            {!isMobile && <LivePreviewCard />}\n          </div>\n`;
  content = content.replace(originalRightCol, newRightCol);
}

// 4. Inject { isMobile && <LivePreviewCard /> } between Barcode Data and Visual Tuning
const visualTuningStart = `            <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl p-8 shadow-xl flex-1">`;
content = content.replace(
  visualTuningStart,
  `            {isMobile && <LivePreviewCard />}\n\n` + visualTuningStart
);

fs.writeFileSync(path, content);
console.log('Mobile layout re-ordering script executed successfully.');
