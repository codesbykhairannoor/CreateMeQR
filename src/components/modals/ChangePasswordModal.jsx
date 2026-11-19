// src/components/modals/ChangePasswordModal.jsx
// Change Password Modal matching user reference screenshots (Direct Update & Send Reset Link)

import React, { useState } from 'react';
import { X, KeyRound, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { user, changePassword, sendPasswordReset } = useAuth();
  const { t } = useTranslation();

  const [mode, setMode] = useState('direct'); // 'direct' | 'reset_link'
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen || !user) return null;

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(false);
    setMode('direct');
    onClose();
  };

  const handleDirectUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPassword) {
      setErrorMsg(t('account.changePasswordModal.fillCurrent', 'Please enter your current password.'));
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg(t('auth.weakPassword', 'Password must be at least 6 characters.'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t('account.changePasswordModal.passwordMismatch', 'New passwords do not match.'));
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccessMsg(t('account.changePasswordModal.passwordUpdated', 'Password updated successfully!'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      const code = err?.code;
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setErrorMsg(t('account.deleteAccountModal.incorrectPassword', 'Incorrect current password. Please try again.'));
      } else if (code === 'auth/weak-password') {
        setErrorMsg(t('auth.weakPassword', 'Password must be at least 6 characters.'));
      } else {
        setErrorMsg(err?.message || 'Failed to update password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    if (!user.email) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await sendPasswordReset(user.email);
      setSuccessMsg(t('account.changePasswordModal.resetLinkSent', 'Password reset link sent to your email!'));
    } catch (err) {
      setErrorMsg(err?.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#081226] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#102040] p-6 md:p-8 z-10 overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-[#0c1831] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>
          <div className="min-w-0 pr-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {t('account.changePasswordModal.title', 'Change Password')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode: Direct Update */}
        {mode === 'direct' && (
          <form onSubmit={handleDirectUpdate} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('account.changePasswordModal.currentPasswordLabel', 'Current Password')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all font-medium"
                />
              </div>
              <div className="mt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setMode('reset_link');
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:underline cursor-pointer font-medium"
                >
                  {t('account.changePasswordModal.forgotCurrentLink', 'Forgot current password? Send reset link to email')}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('account.changePasswordModal.newPasswordLabel', 'New Password')}
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('account.changePasswordModal.newPasswordPlaceholder', 'Min. 6 characters')}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all font-medium"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('account.changePasswordModal.confirmPasswordLabel', 'Confirm New Password')}
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-900/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{t('account.changePasswordModal.updateBtn', 'Update Password')}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {t('account.changePasswordModal.cancelBtn', 'Cancel')}
              </button>
            </div>
          </form>
        )}

        {/* Mode: Send Reset Link */}
        {mode === 'reset_link' && (
          <form onSubmit={handleSendResetLink} className="space-y-4">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(
                'account.changePasswordModal.resetSubtitle',
                'Send a secure reset link to your email to create a new password.'
              )}
            </p>

            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                disabled
                value={user.email || ''}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-100 dark:bg-[#0c1831] text-slate-600 dark:text-slate-300 font-medium cursor-not-allowed"
              />
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-900/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>
                      {t('account.changePasswordModal.sendResetLinkBtn', 'Send Password Reset Link')}
                    </span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    setMode('direct');
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer font-medium"
                >
                  {t(
                    'account.changePasswordModal.knowCurrentLink',
                    'Know your current password? Update directly'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
