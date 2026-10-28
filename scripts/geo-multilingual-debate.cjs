const https = require('https');
const fs = require('fs');
const path = require('path');

const MANAGEMENT_KEY = process.env.OPENROUTER_MANAGEMENT_KEY || process.env.OPENROUTER_API_KEY || '';
let ACTIVE_KEY = process.env.OPENROUTER_API_KEY || '';

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

async function getOrProvisionKey() {
  const keyInfo = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/auth/key',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${ACTIVE_KEY}` }
  });

  if (keyInfo.status === 200 && keyInfo.data?.data) {
    return ACTIVE_KEY;
  }

  const provisionRes = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/keys',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MANAGEMENT_KEY}`,
      'Content-Type': 'application/json'
    }
  }, {
    name: 'geo-multilingual-debate-' + Date.now(),
    limit: 0.1
  });

  if (provisionRes.status === 200 && provisionRes.data?.key) {
    ACTIVE_KEY = provisionRes.data.key;
    return ACTIVE_KEY;
  } else {
    throw new Error('Failed to provision key');
  }
}

async function queryModel(apiKey, modelName, prompt, systemPrompt) {
  const payload = {
    model: modelName,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 2200
  };

  const res = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://createmy-qr.com',
      'X-Title': 'CreateMe-QR Multilingual GEO Analysis'
    }
  }, payload);

  if (res.status !== 200) {
    throw new Error(`Model ${modelName} returned error ${res.status}: ${JSON.stringify(res.data)}`);
  }

  return {
    content: res.data.choices[0].message.content,
    usage: res.data.usage
  };
}

async function main() {
  const apiKey = await getOrProvisionKey();

  const sampleEn = fs.readFileSync(path.join(__dirname, '../public/llms.txt'), 'utf8').slice(0, 1000);
  const sampleId = fs.readFileSync(path.join(__dirname, '../public/llms-id.txt'), 'utf8').slice(0, 1000);

  const prompt = `
Anda adalah Pakar Dunia di bidang International SEO, Generative Engine Optimization (GEO), dan Multilingual LLM Retrieval (ChatGPT Search, Perplexity AI, Claude, Google Gemini AI Overviews).

KASUS ARSITEKTUR KAMI:
Website: CreateMe-QR (https://createmy-qr.com/)
Kami memiliki 30 bahasa dunia dengan SSG 1.680 halaman statis (/id/, /es/, /de/, /ja/, /zh/, /ar/, dll.).
Untuk optimalisasi LLM (GEO), kami membuat file llms terfokus per-bahasa di root domain:
- /llms.txt (Master English)
- /llms-id.txt (Bahasa Indonesia)
- /llms-es.txt (Bahasa Spanyol)
- /llms-de.txt (Bahasa Jerman)
- /llms-ja.txt (Bahasa Jepang)
- ... (total 30 file llms-[lang].txt untuk 30 bahasa).

KONDISI IMPLEMENTASI SAAT INI:
1. File llms-[lang].txt diterjemahkan ke bahasa masing-masing, berisi Core Identity, Competitor Comparison, Tool Directory, dan FAQ.
2. Vercel HTTP Headers mengirimkan:
   Link: <https://createmy-qr.com/llms.txt>; rel="llms-txt"
   pada semua halaman secara global.
3. Master llms.txt saat ini belum mencantumkan daftar tautan ke llms-id.txt, llms-es.txt, dll.
4. Di tag <head> HTML halaman masing-masing (misal di halaman /id/), belum ada tag <link rel="alternate" type="text/markdown" href="/llms-id.txt" hreflang="id">.
5. Pada beberapa file hasil translate bahasa (seperti llms-id.txt, llms-pt.txt, llms-hi.txt), sempat ada artifact placeholder seperti __MEREK0__.

PERTANYAAN AUDIT MENDALAM:
1. Menurut standar resmi dan eksperimen GEO saat ini, apakah konsep "llms.txt terfokus per bahasa (llms-[lang].txt)" itu SUDAH BENAR & BAGUS, atau justru membingungkan AI crawler? Mengapa?
2. Bagaimana cara kerja LLM chatbot (misal pengguna di Indonesia bertanya ke ChatGPT/Perplexity dalam bahasa Indonesia: "Buatkan QR code wifi gratis tanpa login"): Apakah LLM mencari konteks dalam bahasa Indonesia (llms-id.txt), atau tetap mencari llms.txt bahasa Inggris dulu lalu mentranslasikannya?
3. APA KODE & PROTOKOL YANG WAJIB DIHUBUNGKAN SEKARANG?
   - Apakah di master llms.txt harus ada "Multilingual Index / Directory" yang me-link ke seluruh 30 file bahasa?
   - Apakah di Vercel headers halaman /id/* harus dikirim Link: <https://createmy-qr.com/llms-id.txt>; rel="llms-txt"?
   - Apakah di tag <head> HTML harus dipasang <link rel="alternate" type="text/markdown" href="/llms-[lang].txt" hreflang="[lang]"/>?
4. APAKAH ARSITEKTUR KAMI AMAN DARI PENALTI GOOGLE (Cloaking / Duplicate Content / Keyword Stuffing)?
5. Berikan Checklist 5 Tindakan Paling Presisi untuk menyempurnakan sistem ini agar 100% Super SEO & GEO di level global!
`;

  console.log('🤖 Querying DeepSeek V3 for Multilingual GEO Analysis...');
  const resDeepSeek = await queryModel(apiKey, 'deepseek/deepseek-chat', prompt, 'Anda adalah Master Architect Multilingual SEO & GEO.');

  console.log('🤖 Querying Meta Llama 3.3 70B for Multilingual GEO Analysis...');
  const resLlama = await queryModel(apiKey, 'meta-llama/llama-3.3-70b-instruct', prompt, 'Anda adalah Master Architect Multilingual SEO & GEO.');

  fs.writeFileSync(path.join(__dirname, '../scratch/geo-multilingual-report.md'), `
# DEBAT AI: ARSITEKTUR LLMS.TXT PER-BAHASA (30 BAHASA) UNTUK CREATEMY-QR
Tanggal: ${new Date().toISOString()}

## 1. Analisis DeepSeek V3
${resDeepSeek.content}

---

## 2. Analisis Meta Llama 3.3 70B
${resLlama.content}
  `);

  console.log('✅ Selesai! Laporan disimpan di scratch/geo-multilingual-report.md');
}

main().catch(console.error);
