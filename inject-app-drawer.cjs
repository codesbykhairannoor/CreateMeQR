const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'InputForm.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Add `const [showAllTools, setShowAllTools] = React.useState(false);`
content = content.replace(
  /export default function InputForm\(\{[^\}]+\}\) \{\n  const \{ t \} = useTranslation\(\);/g,
  `export default function InputForm({ qrType, setQrType, qrData, setQrData, hasGenerated, setHasGenerated, setActiveTab }) {\n  const { t } = useTranslation();\n  const [showAllTools, setShowAllTools] = React.useState(false);`
);

// 2. Replace the horizontal scrolling tabs with the App Drawer UI
const oldUI = `<div className="flex space-x-2 mb-6 overflow-x-auto pb-2">\n        {TABS.map(tab => {\n          const Icon = tab.icon;\n          const isActive = qrType === tab.id;\n          return (\n            <button\n              key={tab.id}\n              onClick={() => handleTypeChange(tab.id)}\n              aria-label={\`\${t(tab.label)} - \${topKeywords}\`}\n              className={\`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap\n                \${isActive \n                  ? 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white' \n                  : 'bg-blue-50 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'\n                }\`}\n            >\n              <Icon className="w-4 h-4 mr-2" />\n              {t(tab.label)}\n            </button>\n          );\n        })}\n      </div>`;

const newUI = `{/* App Drawer / Smart Grid UI */}
      <div className="mb-8">
        {showAllTools ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center">
                All 34 Tools
              </h3>
              <button onClick={() => setShowAllTools(false)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-4 py-1.5 rounded-full text-sm font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-sm transition-all">Close</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = qrType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { handleTypeChange(tab.id); setShowAllTools(false); }}
                    className={\`flex flex-col items-center justify-center p-3 rounded-xl transition-all
                      \${isActive 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border border-transparent' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600'
                      }\`}
                  >
                    <Icon className={\`w-6 h-6 mb-2 \${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}\`} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[11px] font-semibold text-center leading-tight">{t(tab.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {(() => {
              const defaultPopular = ['url', 'pdf', 'wifi', 'image', 'whatsapp', 'vcard', 'instagram'];
              let visibleIds = [...defaultPopular];
              
              if (!visibleIds.includes(qrType)) {
                visibleIds[6] = qrType; // Replace the last item with the active tool
              }

              return visibleIds.map(id => {
                const tab = TABS.find(t => t.id === id);
                if (!tab) return null;
                const Icon = tab.icon;
                const isActive = qrType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTypeChange(tab.id)}
                    className={\`flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all
                      \${isActive 
                        ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-md border border-transparent' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                      }\`}
                  >
                    <Icon className={\`w-4 h-4 mr-2 \${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}\`} strokeWidth={2.5} />
                    {t(tab.label)}
                  </button>
                );
              });
            })()}
            
            <button
              onClick={() => setShowAllTools(true)}
              className="flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800/30"
            >
              + 27 Tools
            </button>
          </div>
        )}
      </div>`;

if (content.includes(oldUI)) {
  content = content.replace(oldUI, newUI);
  fs.writeFileSync(filePath, content);
  console.log("Updated InputForm.jsx with App Drawer UI successfully!");
} else {
  console.log("Failed to match oldUI");
}
