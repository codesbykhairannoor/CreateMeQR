// src/components/auth/UserMenu.jsx
// User Avatar, Pro status indicator, and Authentication Dropdown matching user reference screenshots

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  User,
  LogOut,
  Crown,
  Clock,
  KeyRound,
  Trash2,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import SignOutConfirmModal from '../modals/SignOutConfirmModal';

export default function UserMenu({ currentLangCode, onOpenHistory }) {
  const {
    user,
    isPro,
    isLifetime,
    signOut,
    openAuthModal,
    sendVerificationEmail,
  } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifySent, setVerifySent] = useState(false);

  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-xs md:text-sm transition-all shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <User className="w-4 h-4" />
        <span>{t('auth.signInBtn', 'Sign In')}</span>
      </button>
    );
  }

  const initial = (
    user.displayName?.[0] ||
    user.email?.[0] ||
    'U'
  ).toUpperCase();

  const username =
    user.displayName ||
    (user.email ? user.email.split('@')[0] : 'User');

  const handleUpgrade = () => {
    setIsOpen(false);
    const prefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
    navigate(`${prefix}/pricing`);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  const handleSendVerification = async (e) => {
    e.stopPropagation();
    if (verifying || verifySent) return;

    setVerifying(true);
    try {
      await sendVerificationEmail();
      setVerifySent(true);
      setTimeout(() => setVerifySent(false), 5000);
    } catch (err) {
      console.error('[Auth] Verification email error:', err);
    } finally {
      setVerifying(false);
    }
  };

  const isVerified = Boolean(user.emailVerified);

  return (
    <>
      <div className="relative flex items-center shrink-0" ref={menuRef}>
        {/* Navbar Profile Icon Only (Guaranteed 1:1 circle, never oval/lonjong) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-9 h-9 min-w-9 min-h-9 aspect-square rounded-full overflow-hidden shrink-0 p-0 hover:ring-2 hover:ring-blue-500/50 hover:bg-slate-100 dark:hover:bg-[#0c1831] transition-all cursor-pointer active:scale-95 shadow-xs"
          aria-label="User Menu"
          title={username}
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={username}
              className="w-full h-full aspect-square rounded-full object-cover border-2 border-blue-600 dark:border-blue-500 shrink-0 block"
            />
          ) : (
            <div className="w-full h-full aspect-square rounded-full bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs border-2 border-blue-600/40 dark:border-blue-500/40 select-none leading-none">
              {initial}
            </div>
          )}
        </button>

        {/* Dropdown Menu (Matching Image 1 Reference) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#081226] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#102040] p-4 z-50 animate-fade-in-up">
            {/* Header: Account & Email */}
            <div className="pb-3 border-b border-slate-100 dark:border-[#102040]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('account.title', 'Account')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                {user.email}
              </p>

              {/* Unverified Pill with Verify Button (Shown if not verified) */}
              {!isVerified && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    {t('account.unverified', 'Unverified')}
                  </span>
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={verifying || verifySent}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 active:scale-95 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-75 cursor-pointer flex items-center gap-1.5"
                  >
                    {verifying ? (
                      <Loader2 className="w-3 h-3 animate-spin text-white" />
                    ) : verifySent ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Sent!</span>
                      </>
                    ) : (
                      <span>{t('account.verifyBtn', 'Verify')}</span>
                    )}
                  </button>
                </div>
              )}

              {/* Status Row */}
              <div className="mt-3 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">
                  {t('account.statusLabel', 'Status:')}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {isPro
                    ? isLifetime
                      ? t('account.proLifetime', 'PRO Lifetime')
                      : t('account.proMonthly', 'PRO Active')
                    : t('account.freeStarter', 'Free Starter')}
                </span>
              </div>

              {/* Upgrade to PRO Button (if not pro) - CreateMy-QR Brand */}
              {!isPro && (
                <button
                  onClick={handleUpgrade}
                  className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-900/20 active:scale-[0.99]"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>{t('account.upgradeToPro', 'Upgrade to PRO')}</span>
                </button>
              )}
            </div>

            {/* Menu Actions List */}
            <div className="pt-2 space-y-1">
              {/* Change Password */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsChangePasswordOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#102040] rounded-xl transition-colors cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t('account.changePassword', 'Change Password')}</span>
              </button>

              {/* Saved QR History */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenHistory?.();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#102040] rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{t('account.history', 'Saved QR History')}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Local</span>
              </button>

              {/* Sign Out (Opens confirmation modal) */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSignOutConfirmOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#102040] rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>{t('auth.signOut', 'Sign Out')}</span>
              </button>

              {/* Delete Account */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsDeleteAccountOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>{t('account.deleteAccount', 'Delete Account')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* Sign Out Confirmation Modal */}
      <SignOutConfirmModal
        isOpen={isSignOutConfirmOpen}
        onClose={() => setIsSignOutConfirmOpen(false)}
        onConfirm={handleSignOut}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteAccountOpen}
        onClose={() => setIsDeleteAccountOpen(false)}
      />
    </>
  );
}
