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
  // Check if ACTIVE_KEY works
  console.log('Checking active API key status...');
  const keyInfo = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/auth/key',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${ACTIVE_KEY}` }
  });

  if (keyInfo.status === 200 && keyInfo.data?.data) {
    console.log(`Active key valid. Remaining limit: $${keyInfo.data.data.limit_remaining}`);
    return ACTIVE_KEY;
  }

  console.log('Active key expired or exhausted. Provisioning new key using management key...');
  const provisionRes = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/keys',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MANAGEMENT_KEY}`,
      'Content-Type': 'application/json'
    }
  }, {
    name: 'geo-llm-debate-' + Date.now(),
    limit: 0.1
  });

  if (provisionRes.status === 200 && provisionRes.data?.key) {
    ACTIVE_KEY = provisionRes.data.key;
    console.log(`Successfully provisioned new key: ${provisionRes.data.data.label}`);
    return ACTIVE_KEY;
  } else {
    throw new Error('Failed to provision key: ' + JSON.stringify(provisionRes.data));
  }
}

async function queryModel(apiKey, modelName, prompt, systemPrompt) {
  console.log(`\n🤖 Sending prompt to ${modelName}...`);
  const payload = {
    model: modelName,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    temperature: 0.4,
    max_tokens: 2500
  };

  const res = await requestHttps({
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://createmy-qr.com',
      'X-Title': 'CreateMe-QR GEO Analysis'
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

  const robotsTxt = fs.readFileSync(path.join(__dirname, '../public/robots.txt'), 'utf8');
  const llmsTxt = fs.readFileSync(path.join(__dirname, '../public/llms.txt'), 'utf8');

  // Load sample Schema from App.jsx or generated HTML
  const schemaSnippet = `
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CreateMe-QR",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "15432" }
}
`;

  const dossier = `
--- WEBSITE PROFILE ---
Brand: CreateMe-QR
URL: https://createmy-qr.com
Core Value Proposition: 100% Free Forever, 100% Client-Side Private (WebAssembly/JS), Zero Tracking, No Sign-up, No 14-day trials, No watermarks, Free SVG/PNG vector downloads, 46+ QR & Barcode tools, 30 Languages with full static SSG.

--- CURRENT ROBOTS.TXT (EXCERPT) ---
${robotsTxt.slice(0, 1500)}

--- CURRENT LLMS.TXT ---
${llmsTxt}

--- CURRENT STRUCTURED DATA SCHEMA ---
${schemaSnippet}
`;

  const systemPrompt = `Anda adalah seorang Master Guru Generative Engine Optimization (GEO), AI Search Retrieval & LLM Citation Architect terkemuka di dunia. Anda memahami secara mendalam cara kerja RAG (Retrieval-Augmented Generation) pada ChatGPT (SearchGPT/OAI-SearchBot), Perplexity AI, Claude (ClaudeBot/Claude-Web), Google Gemini/AI Overviews, dan Microsoft Copilot. Berikan analisis dan rekomendasi yang tajam, teknis, jujur, dan berorientasi hasil.`;

  const userPrompt = `Berikut adalah profil lengkap, robots.txt, llms.txt, dan schema dari website CreateMe-QR (https://createmy-qr.com/):

${dossier}

Sebagai pakar GEO dan LLM citation:
1. REVIEW & AUDIT: Seberapa bagus setup robots.txt dan llms.txt ini di mata AI crawler (ChatGPT, Perplexity, Claude, Gemini)? Apa kelebihannya, dan apa celah terbesarnya?
2. BAGAIMANA CHATBOT MEMILIH REKOMENDASI? Mengapa saat orang bertanya di ChatGPT atau Perplexity: "Apa QR code generator gratis terbaik yang tidak ada watermark dan tidak ada expired?", AI sering merekomendasikan QR Code Generator Pro atau Canva, padahal CreateMe-QR jauh lebih gratis dan 100% privat?
3. APA KODE & PROTOKOL YANG KURANG? Apa yang harus ditambahkan di kode web, robots.txt, llms.txt, schema graph (@id, publisher, sameAs, citation), atau .well-known/ai-plugin.json / security.txt agar AI bot menganggap CreateMe-QR sebagai "The Canonical Ground Truth"?
4. STRATEGI ENTITY OFF-PAGE & CITATION HUBS: Langkah konkret berbiaya 0 rupiah apa yang harus dilakukan agar LLM memiliki memori kuat (knowledge graph) tentang brand CreateMe-QR?
5. RANGKUMAN PRIORITAS: Berikan 5 langkah aksi langsung (Action Plan) yang paling berdampak cepat untuk mendongkrak rekomendasi AI chatbot!`;

  console.log('\n--- MODEL 1: DEEPSEEK V3 (deepseek/deepseek-chat) ---');
  const result1 = await queryModel(apiKey, 'deepseek/deepseek-chat', userPrompt, systemPrompt);
  console.log('\n=== HASIL DEEPSEEK V3 ===\n');
  console.log(result1.content);
  console.log('\nToken Usage:', result1.usage);

  console.log('\n--- MODEL 2: META LLAMA 3.3 70B (meta-llama/llama-3.3-70b-instruct) ---');
  const result2 = await queryModel(apiKey, 'meta-llama/llama-3.3-70b-instruct', userPrompt, systemPrompt);
  console.log('\n=== HASIL LLAMA 3.3 70B ===\n');
  console.log(result2.content);
  console.log('\nToken Usage:', result2.usage);

  // Save report
  fs.writeFileSync(path.join(__dirname, '../scratch/geo-ai-debate-report.md'), `
# LAPORAN DEBAT GEO & LLM CHATBOT INDEXING
Tanggal: ${new Date().toISOString()}

## 1. Analisis & Masukan dari DeepSeek V3
${result1.content}

---

## 2. Analisis & Masukan dari Meta Llama 3.3 70B
${result2.content}
  `);
  console.log('\n✅ Report saved to scratch/geo-ai-debate-report.md');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
