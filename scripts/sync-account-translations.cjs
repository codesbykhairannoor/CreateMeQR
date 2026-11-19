// scripts/sync-account-translations.cjs
// Synchronizes auth, account, verification, change password, and delete account translations across all 30 locales

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const localesDir = path.join(rootDir, 'public', 'locales');
const langDirs = fs.readdirSync(localesDir).filter((f) =>
  fs.statSync(path.join(localesDir, f)).isDirectory()
);

const newEnKeys = {
  auth: {
    signInTitle: 'Sign In to CreateMy-QR',
    signUpTitle: 'Create an Account',
    forgotPasswordTitle: 'Reset Password',
    resetNewPasswordTitle: 'Set New Password',
    signInSubtitle: 'Access your account, sync history, and unlock PRO Lifetime features.',
    signUpSubtitle: 'Sign up to manage QR codes, history sync, and PRO export formats.',
    forgotPasswordSubtitle: 'Enter your registered email to receive a secure password reset link.',
    resetNewPasswordSubtitle: 'Choose a strong new password for your account.',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    newPasswordLabel: 'New Password',
    emailPlaceholder: 'you@domain.com',
    passwordPlaceholder: '••••••••',
    forgotPasswordLink: 'Forgot password?',
    submitSignIn: 'Sign In',
    submitSignUp: 'Create Free Account',
    submitReset: 'Send Password Reset Link',
    submitNewPassword: 'Save New Password',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    sendingReset: 'Sending link...',
    savingPassword: 'Saving password...',
    backToSignIn: 'Back to Sign In',
    orDivider: 'OR',
    googleBtn: 'Continue with Google',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    switchToSignUp: 'Sign up free',
    switchToSignIn: 'Sign in',
    signInBtn: 'Sign In',
    signOut: 'Sign Out',
    notConfigured: 'Firebase is not configured. Please verify your environment keys.',
    weakPassword: 'Password must be at least 6 characters.',
    passwordResetSuccess: 'Password updated successfully! Please sign in.',
    fillEmail: 'Please enter your email address.',
    resetEmailSent: 'Password reset link sent to your email. Please check your inbox.',
    userNotFound: 'No account found with this email address.',
    fillAllFields: 'Please fill in all fields.',
    invalidCredentials: 'Invalid email or password.',
    emailInUse: 'This email is already registered. Please sign in.',
    privacyNote: '100% Client-Side Privacy. Your QR data and history never leave your browser.',
    verificationSentTitle: 'Verify Your Email',
    verificationSentDesc: "We've sent a verification link to {{email}}. Please check your inbox and verify your account.",
    checkSpamNote: 'If you do not see the email in your inbox, please check your spam or junk folder.',
    verificationCheckBtn: "I've Verified My Email",
    verificationResendBtn: 'Resend Verification Email',
    verificationResentSuccess: 'Verification email resent! Please check your spam folder.',
    verificationNotYet: 'Email not verified yet. Please click the verification link sent to your inbox.',
    verificationSuccessToast: 'Email verified successfully! Welcome aboard.',
    continueToApp: 'Continue to App (Verify Later)',
  },
  account: {
    title: 'Account',
    unverified: 'Unverified',
    verifyBtn: 'Verify',
    statusLabel: 'Status:',
    freeStarter: 'Free Starter',
    proLifetime: 'PRO Lifetime',
    proMonthly: 'PRO Active',
    upgradeToPro: 'Upgrade to PRO',
    changePassword: 'Change Password',
    deleteAccount: 'Delete Account',
    history: 'Saved QR History',
    changePasswordModal: {
      title: 'Change Password',
      currentPasswordLabel: 'Current Password',
      forgotCurrentLink: 'Forgot current password? Send reset link to email',
      newPasswordLabel: 'New Password',
      newPasswordPlaceholder: 'Min. 6 characters',
      confirmPasswordLabel: 'Confirm New Password',
      updateBtn: 'Update Password',
      cancelBtn: 'Cancel',
      fillCurrent: 'Please enter your current password.',
      passwordMismatch: 'New passwords do not match.',
      passwordUpdated: 'Password updated successfully!',
      resetSubtitle: 'Send a secure reset link to your email to create a new password.',
      sendResetLinkBtn: 'Send Password Reset Link',
      knowCurrentLink: 'Know your current password? Update directly',
      resetLinkSent: 'Password reset link sent to your email!',
    },
    deleteAccountModal: {
      title: 'Delete Account',
      warningTitle: 'Permanent Deletion Warning',
      warningDesc:
        'This action cannot be undone. Because your account is linked across our ecosystem, deleting it will permanently erase your profile, subscriptions, and data across all 4 connected websites:',
      currentPasswordLabel: 'Current Password',
      currentPasswordPlaceholder: 'Enter your current password',
      confirmTypeLabel: 'To confirm deletion, type DELETE in all uppercase below:',
      deleteBtn: 'Permanently Delete Account',
      cancelBtn: 'Cancel',
      deleting: 'Deleting account across 4 apps...',
      incorrectPassword: 'Incorrect current password. Please try again.',
      typeDeleteError: 'Please type DELETE in uppercase to confirm.',
    },
  },
};

const idOverrides = {
  auth: {
    signInTitle: 'Masuk ke CreateMy-QR',
    signUpTitle: 'Buat Akun Baru',
    forgotPasswordTitle: 'Atur Ulang Kata Sandi',
    resetNewPasswordTitle: 'Buat Kata Sandi Baru',
    signInSubtitle: 'Akses akun Anda, sinkronkan riwayat, dan buka fitur PRO Lifetime.',
    signUpSubtitle: 'Daftar untuk mengelola kode QR, sinkronisasi riwayat, dan format ekspor PRO.',
    forgotPasswordSubtitle: 'Masukkan email terdaftar Anda untuk menerima tautan atur ulang kata sandi.',
    resetNewPasswordSubtitle: 'Pilih kata sandi baru yang kuat untuk akun Anda.',
    emailLabel: 'Alamat Email',
    passwordLabel: 'Kata Sandi',
    newPasswordLabel: 'Kata Sandi Baru',
    emailPlaceholder: 'anda@domain.com',
    passwordPlaceholder: '••••••••',
    forgotPasswordLink: 'Lupa kata sandi?',
    submitSignIn: 'Masuk',
    submitSignUp: 'Buat Akun Gratis',
    submitReset: 'Kirim Tautan Atur Ulang',
    submitNewPassword: 'Simpan Kata Sandi Baru',
    signingIn: 'Sedang masuk...',
    creatingAccount: 'Membuat akun...',
    sendingReset: 'Mengirim tautan...',
    savingPassword: 'Menyimpan kata sandi...',
    backToSignIn: 'Kembali ke Masuk',
    orDivider: 'ATAU',
    googleBtn: 'Lanjutkan dengan Google',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
    switchToSignUp: 'Daftar gratis',
    switchToSignIn: 'Masuk',
    signInBtn: 'Masuk',
    signOut: 'Keluar',
    notConfigured: 'Firebase belum dikonfigurasi. Periksa kunci konfigurasi Anda.',
    weakPassword: 'Kata sandi minimal harus 6 karakter.',
    passwordResetSuccess: 'Kata sandi berhasil diperbarui! Silakan masuk.',
    fillEmail: 'Silakan masukkan alamat email Anda.',
    resetEmailSent: 'Tautan atur ulang kata sandi telah dikirim ke email Anda. Periksa kotak masuk Anda.',
    userNotFound: 'Tidak ada akun ditemukan dengan email ini.',
    fillAllFields: 'Silakan isi semua bidang formulir.',
    invalidCredentials: 'Email atau kata sandi tidak valid.',
    emailInUse: 'Email ini sudah terdaftar. Silakan masuk.',
    privacyNote: 'Privasi 100% Sisi Klien. Data dan riwayat QR Anda tidak pernah meninggalkan peramban.',
    verificationSentTitle: 'Verifikasi Email Anda',
    verificationSentDesc: 'Kami telah mengirimkan tautan verifikasi ke {{email}}. Silakan periksa kotak masuk dan verifikasi akun Anda.',
    checkSpamNote: 'Jika Anda tidak melihat email di kotak masuk, silakan periksa folder spam atau sampah Anda.',
    verificationCheckBtn: 'Saya Sudah Verifikasi Email',
    verificationResendBtn: 'Kirim Ulang Email Verifikasi',
    verificationResentSuccess: 'Email verifikasi telah dikirim ulang! Silakan periksa folder spam jika belum masuk.',
    verificationNotYet: 'Email belum terverifikasi. Silakan klik tautan verifikasi di kotak masuk Anda.',
    verificationSuccessToast: 'Email berhasil diverifikasi! Selamat datang di CreateMy-QR.',
    continueToApp: 'Lanjutkan ke Aplikasi (Verifikasi Nanti)',
  },
  account: {
    title: 'Akun',
    unverified: 'Belum Terverifikasi',
    verifyBtn: 'Verifikasi',
    statusLabel: 'Status:',
    freeStarter: 'Pemula Gratis',
    proLifetime: 'PRO Seumur Hidup',
    proMonthly: 'PRO Aktif',
    upgradeToPro: 'Tingkatkan ke PRO',
    changePassword: 'Ganti Kata Sandi',
    deleteAccount: 'Hapus Akun',
    history: 'Riwayat QR Tersimpan',
    changePasswordModal: {
      title: 'Ganti Kata Sandi',
      currentPasswordLabel: 'Kata Sandi Sekarang',
      forgotCurrentLink: 'Lupa kata sandi sekarang? Kirim tautan reset ke email',
      newPasswordLabel: 'Kata Sandi Baru',
      newPasswordPlaceholder: 'Min. 6 karakter',
      confirmPasswordLabel: 'Konfirmasi Kata Sandi Baru',
      updateBtn: 'Perbarui Kata Sandi',
      cancelBtn: 'Batal',
      fillCurrent: 'Silakan masukkan kata sandi Anda saat ini.',
      passwordMismatch: 'Kata sandi baru tidak cocok.',
      passwordUpdated: 'Kata sandi berhasil diperbarui!',
      resetSubtitle: 'Kirim tautan atur ulang yang aman ke email Anda untuk membuat kata sandi baru.',
      sendResetLinkBtn: 'Kirim Tautan Atur Ulang Kata Sandi',
      knowCurrentLink: 'Ingat kata sandi sekarang? Perbarui langsung',
      resetLinkSent: 'Tautan atur ulang kata sandi telah dikirim ke email Anda!',
    },
    deleteAccountModal: {
      title: 'Hapus Akun',
      warningTitle: 'Peringatan Penghapusan Permanen',
      warningDesc:
        'Tindakan ini tidak dapat dibatalkan. Karena akun Anda terhubung di seluruh ekosistem kami, menghapusnya akan menghapus profil, langganan, dan data Anda secara permanen di seluruh 4 situs web:',
      currentPasswordLabel: 'Kata Sandi Sekarang',
      currentPasswordPlaceholder: 'Masukkan kata sandi Anda saat ini',
      confirmTypeLabel: 'Untuk mengonfirmasi penghapusan, ketik DELETE dengan huruf kapital di bawah:',
      deleteBtn: 'Hapus Akun Secara Permanen',
      cancelBtn: 'Batal',
      deleting: 'Menghapus akun di 4 aplikasi...',
      incorrectPassword: 'Kata sandi saat ini salah. Silakan coba lagi.',
      typeDeleteError: 'Silakan ketik DELETE dengan huruf kapital untuk mengonfirmasi.',
    },
  },
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

function getLeafNodes(obj, prefix = '') {
  let leaves = [];
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      leaves = leaves.concat(getLeafNodes(val, pathKey));
    } else {
      leaves.push({ key: pathKey, value: String(val) });
    }
  }
  return leaves;
}

function getValueByPath(obj, pathKey) {
  const parts = pathKey.split('.');
  let curr = obj;
  for (const p of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[p];
  }
  return curr;
}

function setValueByPath(obj, pathKey, value) {
  const parts = pathKey.split('.');
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!curr[p] || typeof curr[p] !== 'object') {
      curr[p] = {};
    }
    curr = curr[p];
  }
  curr[parts[parts.length - 1]] = value;
}

async function translateSingle(text, targetLang) {
  const tl = targetLang === 'zh' ? 'zh-CN' : targetLang;
  const placeholders = [];
  const protectedText = text.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `XZQ${idx}QZX`;
  });

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(
    protectedText
  )}`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      let translated = data[0].map((item) => item[0]).join('');

      placeholders.forEach((orig, idx) => {
        const re = new RegExp(`XZQ\\s*${idx}\\s*QZX`, 'gi');
        translated = translated.replace(re, orig);
      });

      return translated;
    } catch (err) {
      if (attempt === 3) return text;
      await new Promise((r) => setTimeout(r, 600 * attempt));
    }
  }
}

async function translateBatch(items, targetLang) {
  if (items.length === 0) return [];
  if (items.length === 1) {
    const t = await translateSingle(items[0], targetLang);
    return [t];
  }

  const placeholders = [];
  const protectedLines = items.map((line) => {
    return line.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match) => {
      const idx = placeholders.length;
      placeholders.push(match);
      return `XZQ${idx}QZX`;
    });
  });

  const combined = protectedLines.join('\n');
  const tl = targetLang === 'zh' ? 'zh-CN' : targetLang;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(
    combined
  )}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    let translatedCombined = data[0].map((item) => item[0]).join('');

    placeholders.forEach((orig, idx) => {
      const re = new RegExp(`XZQ\\s*${idx}\\s*QZX`, 'gi');
      translatedCombined = translatedCombined.replace(re, orig);
    });

    const lines = translatedCombined.split('\n');
    if (lines.length === items.length) {
      return lines;
    }
  } catch (e) {
    // fallback
  }

  const results = [];
  for (const item of items) {
    results.push(await translateSingle(item, targetLang));
  }
  return results;
}

(async () => {
  console.log('🚀 Synchronizing Auth & Account Translations across 30 languages...');

  // 1. Merge into English (public and src)
  const enPath = path.join(localesDir, 'en', 'translation.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  deepMerge(enData, newEnKeys);
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf-8');

  const srcEn = path.join(rootDir, 'src', 'locales', 'en', 'translation.json');
  if (fs.existsSync(srcEn)) {
    const srcData = JSON.parse(fs.readFileSync(srcEn, 'utf-8'));
    deepMerge(srcData, newEnKeys);
    fs.writeFileSync(srcEn, JSON.stringify(srcData, null, 2), 'utf-8');
  }

  // 2. Merge Indonesian curated translation
  const idPath = path.join(localesDir, 'id', 'translation.json');
  const idData = JSON.parse(fs.readFileSync(idPath, 'utf-8'));
  deepMerge(idData, idOverrides);
  fs.writeFileSync(idPath, JSON.stringify(idData, null, 2), 'utf-8');
  console.log('✅ English & Indonesian merged directly.');

  // 3. For all other languages, find missing keys from newEnKeys and translate
  const leavesToTranslate = getLeafNodes(newEnKeys);

  for (const lang of langDirs) {
    if (lang === 'en' || lang === 'id') continue;

    const targetPath = path.join(localesDir, lang, 'translation.json');
    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

    const missingItems = leavesToTranslate.filter(
      (leaf) => getValueByPath(targetData, leaf.key) === undefined
    );

    if (missingItems.length === 0) {
      console.log(`✅ [${lang.toUpperCase()}] Already has all keys.`);
      continue;
    }

    console.log(`🌐 [${lang.toUpperCase()}] Translating ${missingItems.length} keys...`);

    const CHUNK_SIZE = 15;
    for (let i = 0; i < missingItems.length; i += CHUNK_SIZE) {
      const chunk = missingItems.slice(i, i + CHUNK_SIZE);
      const texts = chunk.map((c) => c.value);
      try {
        const translatedTexts = await translateBatch(texts, lang);
        for (let j = 0; j < chunk.length; j++) {
          setValueByPath(targetData, chunk[j].key, translatedTexts[j] || chunk[j].value);
        }
      } catch (err) {
        console.warn(`Warning translating chunk for ${lang}:`, err.message);
        for (let j = 0; j < chunk.length; j++) {
          setValueByPath(targetData, chunk[j].key, chunk[j].value);
        }
      }
    }

    fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2), 'utf-8');
    console.log(`✨ [${lang.toUpperCase()}] Complete!`);
  }

  // Audit
  console.log('\n================ AUDIT CHECK ================');
  let allGood = true;
  for (const lang of langDirs) {
    const p = path.join(localesDir, lang, 'translation.json');
    const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
    const missing = leavesToTranslate.filter(
      (leaf) => getValueByPath(data, leaf.key) === undefined
    );
    if (missing.length > 0) {
      allGood = false;
      console.log(`❌ ${lang}: Missing ${missing.length} keys!`);
    } else {
      console.log(`✅ ${lang.padEnd(5)}: 100% Complete`);
    }
  }

  if (allGood) {
    console.log('\n🏆 ALL 30 LANGUAGES SYNCED SUCCESSFULLY WITH ZERO MISSING KEYS!');
  } else {
    process.exitCode = 1;
  }
})();
