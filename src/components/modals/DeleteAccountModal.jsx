// src/components/modals/DeleteAccountModal.jsx
// Permanent Account Deletion Modal across 4 connected platforms (CreateMy-QR, PDFEquips, TextEquips, ToolEquips)

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Lock, Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccountModal({ isOpen, onClose }) {
  const { user, deleteUserAccount } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen || !user || typeof document === 'undefined') return null;

  // Check if user has a password provider (email/password) or is Google only
  const hasPasswordProvider = user.providerData?.some(
    (p) => p.providerId === 'password'
  );

  const isDeleteEnabled =
    confirmText.trim() === 'DELETE' &&
    (!hasPasswordProvider || currentPassword.length >= 6);

  const handleClose = () => {
    setCurrentPassword('');
    setConfirmText('');
    setErrorMsg(null);
    setLoading(false);
    onClose();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!isDeleteEnabled) return;

    if (confirmText.trim() !== 'DELETE') {
      setErrorMsg(t('account.deleteAccountModal.typeDeleteError', 'Please type DELETE in uppercase to confirm.'));
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await deleteUserAccount(currentPassword);
      handleClose();
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('[Auth] Account deletion error:', err);
      const code = err?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setErrorMsg(
          t('account.deleteAccountModal.incorrectPassword', 'Incorrect current password. Please try again.')
        );
      } else if (code === 'auth/requires-recent-login') {
        setErrorMsg('Please sign in again before deleting your account.');
      } else {
        setErrorMsg(err?.message || 'Failed to delete account. Please verify credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-fade-in transition-opacity"
        aria-hidden="true"
      />

      {/* Centering layout container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        {/* Modal Card - Centered via Portal */}
        <div className="relative w-full max-w-lg my-8 bg-white dark:bg-[#081226] rounded-3xl shadow-2xl border border-rose-200 dark:border-rose-950/60 p-6 md:p-8 z-10 text-left overflow-hidden animate-fade-in-up">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 z-20 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-[#0c1831] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="min-w-0 pr-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('account.deleteAccountModal.title', 'Delete Account')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                {user.email}
              </p>
            </div>
          </div>

          {/* Ecosystem Multi-Site Warning Alert */}
          <div className="mb-5 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 relative z-10">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-2 leading-relaxed">
                <p className="font-bold text-rose-700 dark:text-rose-300">
                  {t('account.deleteAccountModal.warningTitle', 'Permanent Deletion Warning')}
                </p>
                <p>
                  {t(
                    'account.deleteAccountModal.warningDesc',
                    'This action cannot be undone. Because your account is linked across our ecosystem, deleting it will permanently erase your profile, subscriptions, and data across all 4 connected websites:'
                  )}
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1 font-semibold text-rose-800 dark:text-rose-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>CreateMy-QR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>PDFEquips</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>TextEquips</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>ToolEquips</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-100/80 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-shake relative z-10">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Confirmation Form */}
          <form onSubmit={handleDelete} className="space-y-4 relative z-10">
            {/* Current Password (if user has password login) */}
            {hasPasswordProvider && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                  {t('account.deleteAccountModal.currentPasswordLabel', 'Current Password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={t(
                      'account.deleteAccountModal.currentPasswordPlaceholder',
                      'Enter your current password'
                    )}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* Typing DELETE confirmation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                {t(
                  'account.deleteAccountModal.confirmTypeLabel',
                  'To confirm deletion, type DELETE in all uppercase below:'
                )}
              </label>
              <input
                type="text"
                required
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all font-mono font-bold tracking-wider"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={!isDeleteEnabled || loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-900/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>
                      {t('account.deleteAccountModal.deleting', 'Deleting account across 4 apps...')}
                    </span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>
                      {t('account.deleteAccountModal.deleteBtn', 'Permanently Delete Account')}
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t('account.deleteAccountModal.cancelBtn', 'Cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
