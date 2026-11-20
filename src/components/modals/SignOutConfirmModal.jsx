// src/components/modals/SignOutConfirmModal.jsx
// Dedicated Sign Out Confirmation Modal (CreateMeQR Royal Blue brand styling)
// Matches visual reference Screenshot_20261119_180940_Chrome.jpg

import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignOutConfirmModal({ isOpen, onClose, onConfirm }) {
  const { t } = useTranslation();
  const { user, isSignOutModalOpen, closeSignOutModal, signOut } = useAuth();

  const activeIsOpen = isOpen !== undefined ? isOpen : isSignOutModalOpen;
  const activeClose = onClose || closeSignOutModal;

  if (!activeIsOpen || !user || typeof document === 'undefined') return null;

  const initials = user?.displayName
    ? user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0] || 'U').toUpperCase();

  const handleConfirmSignOut = async () => {
    activeClose();
    if (onConfirm) {
      await onConfirm();
    } else {
      await signOut();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sign-out-modal-title"
    >
      <div
        onClick={activeClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md animate-fade-in transition-opacity"
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div
          className="relative w-full max-w-sm sm:max-w-md my-8 bg-white dark:bg-[#081226] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#102040] p-6 text-left overflow-hidden text-slate-900 dark:text-white animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header with Icon and Title */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/40 shadow-xs">
              <LogOut className="w-5 h-5" />
            </div>
            <h2 id="sign-out-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t('account.signOutModal.title', t('auth.signOutModal.title', 'Log Out of Your Account?'))}
            </h2>
          </div>
          <button
            onClick={activeClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#102040] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Account Info Card */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1831] border border-slate-200/80 dark:border-[#1e2d4a] flex items-center gap-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-9 h-9 rounded-full object-cover border border-blue-500 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              {t('account.title', t('auth.account', 'Account'))}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Confirmation Description */}
        <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t(
            'account.signOutModal.desc',
            t(
              'auth.signOutModal.desc',
              'Are you sure you want to log out? You will need to sign in again to access PRO features and your account settings.'
            )
          )}
        </p>

        {/* Action Buttons: Cancel + Royal Blue Yes, Log Out */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={activeClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-[#102040] transition-colors cursor-pointer text-center"
          >
            {t('account.signOutModal.cancelBtn', t('auth.signOutModal.cancel', 'Cancel'))}
          </button>
          <button
            type="button"
            onClick={handleConfirmSignOut}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('account.signOutModal.confirmBtn', t('auth.signOutModal.confirm', 'Yes, Log Out'))}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  );

  return createPortal(modalContent, document.body);
}
