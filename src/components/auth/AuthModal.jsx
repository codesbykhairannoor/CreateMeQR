// src/components/auth/AuthModal.jsx
// Clean authentication modal for CreateMy-QR (Login, Register, Email Verification, Forgot Password, Google Auth)

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Lock,
  ArrowLeft,
  KeyRound,
  Send,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { isFirebaseConfigured } from '../../config/firebase';

export default function AuthModal() {
  const {
    user,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendVerificationEmail,
    reloadUser,
    sendPasswordReset,
    confirmNewPassword,
  } = useAuth();
  const { t } = useTranslation();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'reset' | 'verification_sent'
  const [resetCode, setResetCode] = useState(null);
  const [email, setEmail] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Cooldown timer for resend verification
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Check URL query parameters for reset password link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('mode');
    const oobCode = urlParams.get('oobCode');

    if (urlMode === 'resetPassword' && oobCode) {
      setResetCode(oobCode);
      setMode('reset');
      openAuthModal();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [openAuthModal]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(false);
    setCheckLoading(false);
  }, []);

  // Close modal ONLY when user explicitly signs in (mode === 'signin')
  useEffect(() => {
    if (user && isAuthModalOpen && mode === 'signin') {
      resetForm();
      closeAuthModal();
    }
  }, [user, isAuthModalOpen, mode, closeAuthModal, resetForm]);

  if (!isAuthModalOpen || typeof document === 'undefined') return null;
  if (user && mode === 'signin') return null;

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isFirebaseConfigured) {
      setErrorMsg(
        t('auth.notConfigured', {
          defaultValue: 'Firebase is not configured. Please verify your environment keys.',
        })
      );
      return;
    }

    // In-app Reset Password confirmation flow
    if (mode === 'reset') {
      if (!resetCode) {
        setErrorMsg('Invalid or expired password reset link.');
        return;
      }
      if (!password || password.length < 6) {
        setErrorMsg(t('auth.weakPassword', { defaultValue: 'Password must be at least 6 characters.' }));
        return;
      }

      setLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      try {
        await confirmNewPassword(resetCode, password);
        setSuccessMsg(
          t('auth.passwordResetSuccess', {
            defaultValue: 'Password updated successfully! Please sign in.',
          })
        );
        setTimeout(() => {
          setMode('signin');
          setPassword('');
          setErrorMsg(null);
        }, 1500);
      } catch (err) {
        setErrorMsg(err?.message || 'Failed to reset password. Link may have expired.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim()) {
      setErrorMsg(t('auth.fillEmail', { defaultValue: 'Please enter your email address.' }));
      return;
    }

    // Forgot password flow
    if (mode === 'forgot') {
      setLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);
      try {
        await sendPasswordReset(email);
        setSuccessMsg(
          t('auth.resetEmailSent', {
            defaultValue: 'Password reset link sent to your email. Please check your inbox.',
          })
        );
      } catch (err) {
        const code = err?.code;
        if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
          setErrorMsg(t('auth.userNotFound', { defaultValue: 'No account found with this email address.' }));
        } else {
          setErrorMsg(err?.message || 'Error sending password reset email.');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setErrorMsg(t('auth.fillAllFields', { defaultValue: 'Please fill in all fields.' }));
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t('auth.weakPassword', { defaultValue: 'Password must be at least 6 characters.' }));
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        resetForm();
        closeAuthModal();
      } else {
        // Manual Sign Up flow:
        // Set mode to 'verification_sent' immediately and register user so onAuthStateChanged does NOT close the modal
        const targetEmail = email.trim();
        setRegisteredEmail(targetEmail);
        setMode('verification_sent');
        setResendCooldown(30);

        try {
          await signUpWithEmail(targetEmail, password, false);
        } catch (signUpErr) {
          setMode('signup');
          throw signUpErr;
        }
      }
    } catch (err) {
      const code = err?.code;
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-email'
      ) {
        setErrorMsg(t('auth.invalidCredentials', { defaultValue: 'Invalid email or password.' }));
      } else if (code === 'auth/email-already-in-use') {
        setErrorMsg(t('auth.emailInUse', { defaultValue: 'This email is already registered. Please sign in.' }));
      } else if (code === 'auth/weak-password') {
        setErrorMsg(t('auth.weakPassword', { defaultValue: 'Password must be at least 6 characters.' }));
      } else {
        setErrorMsg(err?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await sendVerificationEmail();
      setSuccessMsg(
        t('auth.verificationResentSuccess', {
          defaultValue: 'Verification email resent! Please check your inbox or spam folder.',
        })
      );
      setResendCooldown(45);
    } catch (err) {
      setErrorMsg(err?.message || 'Failed to resend verification email.');
    }
  };

  const handleCheckVerification = async () => {
    setCheckLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const refreshed = await reloadUser();
      if (refreshed?.emailVerified) {
        setSuccessMsg(
          t('auth.verificationSuccessToast', {
            defaultValue: 'Email verified successfully! Welcome aboard.',
          })
        );
        setTimeout(() => {
          resetForm();
          closeAuthModal();
        }, 1500);
      } else {
        setErrorMsg(
          t('auth.verificationNotYet', {
            defaultValue: 'Email not verified yet. Please click the verification link sent to your inbox.',
          })
        );
      }
    } catch (err) {
      setErrorMsg(err?.message || 'Failed to refresh verification status.');
    } finally {
      setCheckLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured) {
      setErrorMsg(
        t('auth.notConfigured', {
          defaultValue: 'Firebase is not configured. Please verify your environment keys.',
        })
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      resetForm();
      closeAuthModal();
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/popup-blocked') {
        setErrorMsg(err?.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const activeEmail = registeredEmail || email || user?.email || '';

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          resetForm();
          closeAuthModal();
        }}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Window - Perfectly Centered via Portal */}
      <div className="relative w-full max-w-md my-auto bg-white dark:bg-[#081226] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#102040] p-6 md:p-8 z-10 overflow-hidden animate-fade-in-up">
        {/* Subtle Brand Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 dark:bg-blue-500/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900/10 dark:bg-blue-700/10 blur-3xl pointer-events-none rounded-full" />

        {/* Close button */}
        <button
          onClick={() => {
            resetForm();
            closeAuthModal();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-[#0c1831] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode: Verification Sent Notice Screen */}
        {mode === 'verification_sent' ? (
          <div className="text-center relative z-10 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-1 border border-blue-100 dark:border-blue-900/50 shadow-md">
              <Mail className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('auth.verificationSentTitle', { defaultValue: 'Verify Your Email' })}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {t('auth.verificationSentDesc', {
                  email: activeEmail,
                  defaultValue: `We've sent a verification link to ${activeEmail}. Please check your inbox and verify your account.`,
                })}
              </p>
            </div>

            {/* Email Target Card */}
            <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-[#0c1831] border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 font-semibold break-all flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{activeEmail}</span>
            </div>

            {/* Helpful Spam Note */}
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed px-2">
              {t('auth.checkSpamNote', {
                defaultValue: 'If you do not see the email in your inbox, please check your spam or junk folder.',
              })}
            </p>

            {/* Error Alert */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 text-left animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Alert */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 text-left">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Verification Actions (CreateMy-QR Brand Royal Blue) */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleCheckVerification}
                disabled={checkLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {checkLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>{t('auth.verificationCheckBtn', { defaultValue: "I've Verified My Email" })}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendCooldown > 0}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1831] dark:hover:bg-[#102040] text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : t('auth.verificationResendBtn', { defaultValue: 'Resend Verification Email' })}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  closeAuthModal();
                }}
                className="w-full py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {t('auth.continueToApp', { defaultValue: 'Continue to App (Verify Later)' })}
              </button>
            </div>
          </div>
        ) : (
          /* Normal Sign In / Sign Up / Forgot / Reset Flow */
          <>
            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-3 border border-blue-100 dark:border-blue-900/50 shadow-sm">
                {mode === 'forgot' || mode === 'reset' ? (
                  <KeyRound className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {mode === 'signin' && t('auth.signInTitle', { defaultValue: 'Sign In to CreateMy-QR' })}
                {mode === 'signup' && t('auth.signUpTitle', { defaultValue: 'Create an Account' })}
                {mode === 'forgot' && t('auth.forgotPasswordTitle', { defaultValue: 'Reset Password' })}
                {mode === 'reset' && t('auth.resetNewPasswordTitle', { defaultValue: 'Set New Password' })}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {mode === 'signin' &&
                  t('auth.signInSubtitle', {
                    defaultValue: 'Access your account, sync history, and unlock PRO Lifetime features.',
                  })}
                {mode === 'signup' &&
                  t('auth.signUpSubtitle', {
                    defaultValue: 'Sign up to manage QR codes, history sync, and PRO export formats.',
                  })}
                {mode === 'forgot' &&
                  t('auth.forgotPasswordSubtitle', {
                    defaultValue: 'Enter your registered email to receive a secure password reset link.',
                  })}
                {mode === 'reset' &&
                  t('auth.resetNewPasswordSubtitle', {
                    defaultValue: 'Choose a strong new password for your account.',
                  })}
              </p>
            </div>

            {/* Error Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400">
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

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4 mb-4 relative z-10">
              {mode !== 'reset' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    {t('auth.emailLabel', { defaultValue: 'Email Address' })}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('auth.emailPlaceholder', { defaultValue: 'you@domain.com' })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-600 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      {mode === 'reset'
                        ? t('auth.newPasswordLabel', { defaultValue: 'New Password' })
                        : t('auth.passwordLabel', { defaultValue: 'Password' })}
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('forgot')}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                      >
                        {t('auth.forgotPasswordLink', { defaultValue: 'Forgot password?' })}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.passwordPlaceholder', { defaultValue: '••••••••' })}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#102040] bg-slate-50 dark:bg-[#040a18] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-600 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 hover:from-slate-800 hover:to-blue-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>
                      {mode === 'signin' && t('auth.signingIn', { defaultValue: 'Signing in...' })}
                      {mode === 'signup' && t('auth.creatingAccount', { defaultValue: 'Creating account...' })}
                      {mode === 'forgot' && t('auth.sendingReset', { defaultValue: 'Sending link...' })}
                      {mode === 'reset' && t('auth.savingPassword', { defaultValue: 'Saving password...' })}
                    </span>
                  </>
                ) : (
                  <span>
                    {mode === 'signin' && t('auth.submitSignIn', { defaultValue: 'Sign In' })}
                    {mode === 'signup' && t('auth.submitSignUp', { defaultValue: 'Create Free Account' })}
                    {mode === 'forgot' && t('auth.submitReset', { defaultValue: 'Send Password Reset Link' })}
                    {mode === 'reset' && t('auth.submitNewPassword', { defaultValue: 'Save New Password' })}
                  </span>
                )}
              </button>
            </form>

            {/* Forgot / Reset Back Button */}
            {(mode === 'forgot' || mode === 'reset') && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signin')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer uppercase tracking-wider"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('auth.backToSignIn', { defaultValue: 'Back to Sign In' })}</span>
                </button>
              </div>
            )}

            {/* Social Sign-in & Switchers */}
            {mode !== 'forgot' && mode !== 'reset' && (
              <div className="relative z-10">
                {/* Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-200 dark:border-[#102040] w-full" />
                  <span className="bg-white dark:bg-[#081226] px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest shrink-0">
                    {t('auth.orDivider', { defaultValue: 'OR' })}
                  </span>
                </div>

                {/* Google Sign In */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-[#0c1831] dark:hover:bg-[#102040] text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl border border-slate-200 dark:border-[#102040] shadow-sm hover:shadow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{t('auth.googleBtn', { defaultValue: 'Continue with Google' })}</span>
                  </button>

                  {/* Mode switch */}
                  <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                    {mode === 'signin' ? (
                      <>
                        <span>{t('auth.noAccount', { defaultValue: "Don't have an account?" })}{' '}</span>
                        <button
                          type="button"
                          onClick={() => handleSwitchMode('signup')}
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          {t('auth.switchToSignUp', { defaultValue: 'Sign up free' })}
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{t('auth.hasAccount', { defaultValue: 'Already have an account?' })}{' '}</span>
                        <button
                          type="button"
                          onClick={() => handleSwitchMode('signin')}
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          {t('auth.switchToSignIn', { defaultValue: 'Sign in' })}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Note on security */}
                  <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed px-2 pt-2 border-t border-slate-100 dark:border-[#102040]">
                    {t('auth.privacyNote', {
                      defaultValue: '100% Client-Side Privacy. Your QR data and history never leave your browser.',
                    })}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
