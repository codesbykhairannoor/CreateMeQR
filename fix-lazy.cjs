const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace('import CustomizationPanel from \'./components/CustomizationPanel\';', 'const CustomizationPanel = React.lazy(() => import(\'./components/CustomizationPanel\'));');
app = app.replace('import EmbedWidgetModal from \'./components/EmbedWidgetModal\';', 'const EmbedWidgetModal = React.lazy(() => import(\'./components/EmbedWidgetModal\'));');

app = app.replace('<CustomizationPanel visuals={visuals} setVisuals={setVisuals} />', '<React.Suspense fallback={<div className="p-8 text-center text-zinc-600">Loading customization tools...</div>}><CustomizationPanel visuals={visuals} setVisuals={setVisuals} /></React.Suspense>');

app = app.replace('{showEmbedModal && <EmbedWidgetModal onClose={() => setShowEmbedModal(false)} />}', '{showEmbedModal && <React.Suspense fallback={null}><EmbedWidgetModal onClose={() => setShowEmbedModal(false)} /></React.Suspense>}');

app = app.replace('opacity-50 cursor-not-allowed', 'cursor-not-allowed opacity-90');

fs.writeFileSync('src/App.jsx', app);
