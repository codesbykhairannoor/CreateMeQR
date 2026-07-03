import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function EmbedWidgetModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="https://www.createmy-qr.com" width="100%" height="800" frameborder="0" scrolling="no" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>\n<div style="text-align: center; font-size: 11px; margin-top: 8px;">Powered by <a href="https://www.createmy-qr.com" target="_blank" style="color: #2563eb; text-decoration: none;">CreateMy-QR Generator</a></div>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Embed Generator on Your Website</h3>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-zinc-600 dark:text-zinc-300 mb-6">
            Want to offer a free QR code generator to your visitors? Copy and paste the HTML snippet below into your website or blog. 
          </p>

          <div className="relative">
            <div className="absolute top-3 right-3 flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl text-sm text-zinc-800 dark:text-zinc-300 overflow-x-auto border border-zinc-200 dark:border-zinc-800 font-mono">
              <code>{embedCode}</code>
            </pre>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Why use our widget?</h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>100% Free for your users</li>
              <li>No ads or popups inside the widget</li>
              <li>Responsive design fits any container</li>
              <li>Enhances your website's utility instantly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
