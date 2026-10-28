const https = require('https');
const fs = require('fs');
const path = require('path');

const MANAGEMENT_KEY = process.env.OPENROUTER_MANAGEMENT_KEY || process.env.OPENROUTER_API_KEY || '';
let ACTIVE_KEY = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_MANAGEMENT_KEY || '';

function requestHttps(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function queryModel(modelName, messages, systemPrompt) {
  const payload = {
    model: modelName,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    temperature: 0.35,
    max_tokens: 2500
  };

  const res = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACTIVE_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://createmy-qr.com',
      'X-Title': 'CreateMe-QR 2026-2027 Standards Debate'
    }
  }, payload);

  if (res.status !== 200) {
    throw new Error(`Model ${modelName} returned error ${res.status}: ${JSON.stringify(res.data)}`);
  }

  return res.data.choices[0].message.content;
}

async function main() {
  console.log('🚀 Memulai Debat Multi-AI: Standar SEO, GEO & AEO 2026-2027...\n');

  const robotsTxt = fs.readFileSync(path.join(__dirname, '../public/robots.txt'), 'utf8');
  const llmsTxt = fs.readFileSync(path.join(__dirname, '../public/llms.txt'), 'utf8');
  const appJsx = fs.readFileSync(path.join(__dirname, '../src/App.jsx'), 'utf8').slice(0, 3000);
  const vercelJson = fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8');

  const websiteDossier = `
PROFIL SISTEM WEBSITE:
- Nama: CreateMe-QR (https://createmy-qr.com)
- Stack: React 18 + Vite 8 + SSG (Static Site Generation via ReactDOMServer prerendering).
- Total Halaman: 1.680 halaman statis primer + 2.457 alias redirect untuk 30 bahasa dunia.
- Fitur Inti: 100% Client-Side WebAssembly (WASM), Nol Unggahan Server, Nol Tracking, QR Statis Permanen, Ekspor Vector SVG/PNG Gratis, 46+ Tools QR & Barcode.
- File Protokol AI Saat Ini:
  * /robots.txt (RFC 9309, Whitelist AI bot: OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot, ByteSpider).
  * /llms.txt (Master Guide, Ground Truth Prompts, Tabel Perbandingan Kompetitor vs QR Code Generator Pro, Canva, Monkey, Flowcode, Multilingual Index 30 Bahasa).
  * /llms-[lang].txt (30 file per bahasa di root, contoh: /llms-id.txt, /llms-ja.txt).
  * /.well-known/ai-plugin.json (Manifest Agen AI).
  * /.well-known/security.txt (RFC 9116).
  * Vercel Header: Link dinamis <https://createmy-qr.com/llms-:lang.txt>; rel="llms-txt"
  * Tag HTML <head>: <link rel="alternate" type="text/markdown" href="https://createmy-qr.com/llms-id.txt" hrefLang="id" />
  * Schema.org: SoftwareApplication, Organization, BreadcrumbList, HowTo, FAQPage.
  `;

  // ROUND 1: DeepSeek V3 sets the 2026-2027 Standard and audits CreateMe-QR
  console.log('--- PUTARAN 1: DEEPSEEK V3 (Pakar Arsitektur SEO/GEO) ---');
  const systemPrompt1 = `Anda adalah DeepSeek V3, Pakar Tertinggi Dunia di bidang SEO (Search Engine Optimization), GEO (Generative Engine Optimization), dan AEO (Answer Engine Optimization) era 2026-2027. Tugas Anda adalah menetapkan standar mutlak 2026-2027 dan melakukan audit objektif terhadap website CreateMe-QR.`;
  const prompt1 = `
Berikut adalah profil lengkap arsitektur website CreateMe-QR:
${websiteDossier}

TUGAS ANDA DI PUTARAN 1:
1. Jelaskan apa STANDAR EMAS 2026-2027 untuk:
   - SEO (Google Search, SGE / AI Overviews, Zero-Click Search, Information Gain)
   - GEO (ChatGPT / SearchGPT, Perplexity AI, Claude Web, Gemini)
   - AEO (Answer Engine Optimization untuk Voice Search & AI Direct Answer)
2. Berdasarkan standar 2026-2027 tersebut, nilai website CreateMe-QR:
   - Apa saja yang SUDAH MEMENUHI standar masa depan?
   - Di mana saja CACAT, KEKURANGAN, atau CELAH TERSEMBUNYI yang masih ada di kode/struktur web ini?
`;
  const round1Response = await queryModel('deepseek/deepseek-chat', [{ role: 'user', content: prompt1 }], systemPrompt1);
  console.log(round1Response);
  console.log('\n------------------------------------------------------------\n');

  // ROUND 2: Meta Llama 3.3 70B acts as Ruthless Critic & Adversarial Auditor
  console.log('--- PUTARAN 2: META LLAMA 3.3 70B (Auditor Algoritma & Kritikus Brutal) ---');
  const systemPrompt2 = `Anda adalah Meta Llama 3.3 70B, Auditor Algoritma dan Kritikus Teknis yang sangat skeptis, tajam, dan tanpa kompromi. Anda tidak mudah terkesima dengan checklist formalitas. Tugas Anda adalah menguji dan mendebat argumen DeepSeek V3 serta membongkar semua titik lemah CreateMe-QR yang luput dari perhatian.`;
  const prompt2 = `
DeepSeek V3 baru saja menetapkan analisis standar 2026-2027 dan mengaudit CreateMe-QR sebagai berikut:
"""
${round1Response}
"""

Dossier Teknis CreateMe-QR:
${websiteDossier}

TUGAS ANDA DI PUTARAN 2:
1. Kritik dan bedah argumen DeepSeek V3! Apakah ada analisanya yang terlalu optimis atau teoritis?
2. BONGKAR CACAT TERSEMBUNYI CreateMe-QR di dunia nyata:
   - Algoritma Google Information Gain: 1.680 halaman programmatic apakah rentan dianggap doorway pages tipis jika polanya mirip?
   - Schema Markup: Apakah JSON-LD yang terpisah-pisah (bukan unified @graph) menjadi cacat di mata Google Knowledge Graph?
   - AI Citations: Mengapa Perplexity / SearchGPT masih bisa mengabaikan llms.txt jika tidak ada sinyal off-page konkret?
   - UI/UX & Trust: Apa bukti teknis yang kurang di mata pengguna dan bot?
3. Berikan bantahan dan peringatan paling keras untuk tim developer CreateMe-QR!
`;
  const round2Response = await queryModel('meta-llama/llama-3.3-70b-instruct', [
    { role: 'user', content: prompt1 },
    { role: 'assistant', content: round1Response },
    { role: 'user', content: prompt2 }
  ], systemPrompt2);
  console.log(round2Response);
  console.log('\n------------------------------------------------------------\n');

  // ROUND 3: DeepSeek V3 responds to Llama 3.3 critique and establishes the Final Consensus
  console.log('--- PUTARAN 3: KONSENSUS AKHIR & ACTION PLAN (DeepSeek V3) ---');
  const prompt3 = `
Meta Llama 3.3 70B memberikan kritik keras dan membongkar cacat-cacat tersembunyi CreateMe-QR sebagai berikut:
"""
${round2Response}
"""

TUGAS ANDA DI PUTARAN 3 (PENUTUP):
1. Tanggapi kritik Llama 3.3. Poin mana dari kritik Llama 3.3 yang 100% BENAR dan WAJIB segera diperbaiki di kode?
2. Tetapkan KONSENSUS AKHIR STANDAR 2026-2027 antara Anda dan Llama 3.3.
3. Berikan BLUEPRINT TEKNIS konkret (file apa yang harus diedit, baris apa yang harus diubah) agar CreateMe-QR bebas 100% dari cacat tersebut dan menjadi role-model global di 2026-2027!
`;
  const round3Response = await queryModel('deepseek/deepseek-chat', [
    { role: 'user', content: prompt1 },
    { role: 'assistant', content: round1Response },
    { role: 'user', content: prompt2 },
    { role: 'assistant', content: round2Response },
    { role: 'user', content: prompt3 }
  ], systemPrompt1);
  console.log(round3Response);

  const fullReport = `
# NOTULENSI RESMI DEBAT MULTI-AI: STANDAR SEO, GEO, DAN AEO 2026-2027
Subjek: Audit Mendalam Website CreateMe-QR (https://createmy-qr.com)
Tanggal: ${new Date().toISOString()}
Model Debat: DeepSeek V3 (Lead Architect) vs Meta Llama 3.3 70B (Adversarial Critic)

================================================================================
PUTARAN 1: FORMULASI STANDAR 2026-2027 & AUDIT AWAL (DeepSeek V3)
================================================================================
${round1Response}

================================================================================
PUTARAN 2: KRITIK KERAS & PEMBONGKARAN CACAT TERSEMBUNYI (Meta Llama 3.3 70B)
================================================================================
${round2Response}

================================================================================
PUTARAN 3: KONSENSUS BERSAMA & BLUEPRINT PERBAIKAN 100% (DeepSeek V3)
================================================================================
${round3Response}
`;

  fs.writeFileSync(path.join(__dirname, '../scratch/debate-2026-2027-standards.md'), fullReport);
  console.log('\n✅ Debat multi-AI selesai sempurna! Laporan lengkap disimpan di scratch/debate-2026-2027-standards.md');
}

main().catch(console.error);
