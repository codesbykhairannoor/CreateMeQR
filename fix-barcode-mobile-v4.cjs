const fs = require('fs');
const path = 'src/pages/BarcodeGenerator.jsx';
let content = fs.readFileSync(path, 'utf8');

// The LivePreviewCard definition
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

// Insert it right before `return (`
const returnIndex = content.lastIndexOf('  return (');
if (returnIndex !== -1) {
  content = content.substring(0, returnIndex) + previewComponentString + '\n' + content.substring(returnIndex);
}

// Now replace the right column sticky section that was missed
// Let's find: <div className="lg:col-span-5 flex flex-col gap-6">
// And replace the ENTIRE block up to </div>\n          </div>\n          \n        </div>\n      </section>
const rightColStart = content.indexOf('{/* Right Column: Live Preview (5 cols) */}');
const rightColEndStr = `          </div>\n          \n        </div>\n      </section>`;
// Because of CRLF, rightColEndStr might fail to match exactly if we use \n.
// Let's just do a regex replace for the Right Column block.
// We know it starts with `{/* Right Column: Live Preview (5 cols) */}` and we can replace the first `<div className="lg:col-span-5 flex flex-col gap-6">` that follows it.

const divToReplace = `<div className="lg:col-span-5 flex flex-col gap-6">`;
const newDiv = `<div className="lg:col-span-5 flex flex-col gap-6 sticky top-24 h-fit">\n            {!isMobile && <LivePreviewCard />}\n          </div>`;

// But wait, if I replace `divToReplace`, what about the INNER content of the original card? It's still there!
// If `LivePreviewCard` is NOT defined in the right column anymore, the inner card is still rendering.
// Let's just do an exact indexOf replacement.
// I'll grab all text from `rightColStart` up to `        </div>\r\n      </section>` (or similar).

const rightColStr = `{/* Right Column: Live Preview (5 cols) */}`;
const startIdx = content.indexOf(rightColStr);
if (startIdx !== -1) {
  const endMarker = `</section>`;
  const endIdx = content.indexOf(endMarker, startIdx);
  if (endIdx !== -1) {
    // The chunk between startIdx and endIdx
    const oldBlock = content.substring(startIdx, endIdx);
    
    // We replace it with the new Right Column and closing tags
    const newBlock = `{/* Right Column: Live Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24 h-fit">
            {!isMobile && <LivePreviewCard />}
          </div>
          
        </div>
      `;
    
    content = content.substring(0, startIdx) + newBlock + content.substring(endIdx);
  }
}

fs.writeFileSync(path, content);
console.log('LivePreviewCard injected correctly!');
