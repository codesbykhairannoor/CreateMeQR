// src/context/AuthContext.jsx
// Global Firebase Authentication & Firestore User Context for CreateMy-QR

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  confirmPasswordReset,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Sparkles, X } from 'lucide-react';
import { auth, db, googleProvider, isFirebaseConfigured } from '../config/firebase';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proModalFeature, setProModalFeature] = useState('');

  const openProModal = useCallback((feature = '') => {
    setProModalFeature(feature);
    setIsProModalOpen(true);
  }, []);

  const closeProModal = useCallback(() => {
    setIsProModalOpen(false);
    setProModalFeature('');
  }, []);

  const fetchOrCreateProfile = useCallback(async (firebaseUser) => {
    const isVipLifetime = firebaseUser.email?.toLowerCase() === 'erstaunenn@gmail.com';

    const fallbackProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      plan: isVipLifetime ? 'pro' : 'free',
      planType: isVipLifetime ? 'lifetime' : undefined,
      subscriptionType: isVipLifetime ? 'lifetime' : undefined,
      subscriptionStatus: isVipLifetime ? 'active' : 'inactive',
      suiteAccess: isVipLifetime ? 'all_access' : undefined,
      createmyqr_trials_used: 0,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
    };

    if (!db) {
      return fallbackProfile;
    }

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        let currentPlan = isVipLifetime ? 'pro' : (data.plan || 'free');
        let currentStatus = isVipLifetime ? 'active' : (data.subscriptionStatus || 'inactive');

        const isLifetime = isVipLifetime || data.planType === 'lifetime' || data.subscriptionType === 'lifetime';

        // Check expiration if set (Lifetime plans never expire)
        if (data.plan === 'pro' && !isLifetime && data.expiresAt && Date.now() > data.expiresAt) {
          currentPlan = 'free';
          currentStatus = 'inactive';
          await updateDoc(userDocRef, {
            plan: 'free',
            subscriptionStatus: 'inactive',
            lastLoginAt: Date.now(),
          });
        } else {
          const updatePayload = {
            lastLoginAt: Date.now(),
            displayName: firebaseUser.displayName || data.displayName || null,
            photoURL: firebaseUser.photoURL || data.photoURL || null,
          };
          if (isVipLifetime && (data.plan !== 'pro' || data.planType !== 'lifetime')) {
            updatePayload.plan = 'pro';
            updatePayload.planType = 'lifetime';
            updatePayload.subscriptionType = 'lifetime';
            updatePayload.subscriptionStatus = 'active';
            updatePayload.suiteAccess = 'all_access';
          }
          await updateDoc(userDocRef, updatePayload);
        }

        return {
          ...data,
          plan: currentPlan,
          planType: isLifetime ? 'lifetime' : data.planType,
          subscriptionType: isLifetime ? 'lifetime' : data.subscriptionType,
          subscriptionStatus: currentStatus,
          suiteAccess: isLifetime ? 'all_access' : data.suiteAccess,
          createmyqr_trials_used: typeof data.createmyqr_trials_used === 'number' ? data.createmyqr_trials_used : 0,
          lastLoginAt: Date.now(),
        };
      } else {
        await setDoc(userDocRef, fallbackProfile);
        return fallbackProfile;
      }
    } catch (firestoreError) {
      console.warn('[Firestore] Profile sync fallback:', firestoreError);
      return fallbackProfile;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    try {
      const refreshed = await fetchOrCreateProfile(user);
      setProfile(refreshed);
    } catch (err) {
      console.error('[Auth] Failed to refresh profile:', err);
    }
  }, [user, fetchOrCreateProfile]);

  useEffect(() => {
    if (typeof window === 'undefined' || !auth || !isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    // Handle Google redirect sign-in result if popup was blocked
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          try {
            const userProfile = await fetchOrCreateProfile(result.user);
            setProfile(userProfile);
            setIsAuthModalOpen(false);
          } catch (e) {
            console.error('[Auth] Error fetching profile from redirect result:', e);
          }
        }
      })
      .catch((err) => {
        if (err?.code !== 'auth/popup-closed-by-user') {
          console.error('[Auth] Google Redirect Sign-In Error:', err);
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAuthModalOpen(false);
        try {
          const userProfile = await fetchOrCreateProfile(currentUser);
          setProfile(userProfile);
        } catch (error) {
          console.error('[Auth] Error fetching user profile:', error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchOrCreateProfile]);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error('Firebase credentials not configured.');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userProfile = await fetchOrCreateProfile(result.user);
      setProfile(userProfile);
      setIsAuthModalOpen(false);
    } catch (error) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return;
      }
      if (error?.code === 'auth/popup-blocked') {
        console.warn('[Auth] Popup blocked. Falling back to signInWithRedirect...');
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      console.error('[Auth] Google Sign-In Error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase credentials not configured.');
    }

    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    const userProfile = await fetchOrCreateProfile(result.user);
    setProfile(userProfile);
    setIsAuthModalOpen(false);
  };

  const signUpWithEmail = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase credentials not configured.');
    }

    const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const userProfile = await fetchOrCreateProfile(result.user);
    setProfile(userProfile);
    setIsAuthModalOpen(false);
  };

  const sendPasswordReset = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase credentials not configured.');
    }

    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://createmy-qr.com';

    // Call serverless Resend API endpoint (matching trailingSlash: false in vercel.json)
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), origin }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data.error || 'Failed to send password reset email');
      if (response.status === 404) {
        err.code = 'auth/user-not-found';
      } else if (response.status === 429) {
        err.code = 'auth/too-many-requests';
      }
      throw err;
    }
  };

  const confirmNewPassword = async (oobCode, newPassword) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase credentials not configured.');
    }

    await confirmPasswordReset(auth, oobCode, newPassword);
  };

  const signOut = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('[Auth] Sign Out Error:', error);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const isLifetime = Boolean(
    profile?.plan === 'pro' &&
    (profile?.planType === 'lifetime' || profile?.subscriptionType === 'lifetime')
  );

  const isPro = Boolean(
    profile?.plan === 'pro' && (
      isLifetime ||
      profile?.suiteAccess === 'all_access' ||
      (profile?.subscriptionStatus === 'active' && (!profile.expiresAt || profile.expiresAt > Date.now()))
    )
  );

  const FREE_TRIALS_MAX = 2;
  const trialsUsed = typeof profile?.createmyqr_trials_used === 'number' ? profile.createmyqr_trials_used : 0;
  const freeTrialsRemaining = isPro ? Infinity : Math.max(0, FREE_TRIALS_MAX - trialsUsed);

  const [toastMessage, setToastMessage] = useState(null);

  const consumeProFeature = useCallback(async (featureName = '') => {
    if (isPro) return true;

    if (!user) {
      openProModal(featureName);
      return false;
    }

    if (freeTrialsRemaining <= 0) {
      openProModal(featureName);
      return false;
    }

    const nextUsed = trialsUsed + 1;
    const remainingAfter = Math.max(0, FREE_TRIALS_MAX - nextUsed);

    try {
      if (db && user.uid) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          createmyqr_trials_used: nextUsed,
          lastTrialUsedAt: Date.now(),
        });
      }
    } catch (err) {
      console.warn('[Firestore] Update trial count error:', err);
    }

    setProfile(prev => prev ? ({ ...prev, createmyqr_trials_used: nextUsed }) : prev);

    setToastMessage(
      remainingAfter > 0
        ? `🎉 Free trial used (1 of ${FREE_TRIALS_MAX}). 1 free export remaining!`
        : `🎉 Free trial used (2 of ${FREE_TRIALS_MAX}). You've used your free exports. Upgrade for unlimited access!`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);

    return true;
  }, [isPro, user, freeTrialsRemaining, trialsUsed, openProModal]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isPro,
        isLifetime,
        FREE_TRIALS_MAX,
        trialsUsed,
        freeTrialsRemaining,
        consumeProFeature,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        confirmNewPassword,
        signOut,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isProModalOpen,
        openProModal,
        closeProModal,
        proModalFeature,
        refreshProfile,
      }}
    >
      {children}

      {/* Freemium Trial Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-[#0c1831]/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 backdrop-blur-xl animate-fade-in-down max-w-[90vw]">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-slate-400 hover:text-white ml-2 text-xs cursor-pointer p-1"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      profile: null,
      loading: false,
      isPro: false,
      isLifetime: false,
      FREE_TRIALS_MAX: 2,
      trialsUsed: 0,
      freeTrialsRemaining: 0,
      consumeProFeature: async () => false,
      signInWithGoogle: async () => { },
      signInWithEmail: async () => { },
      signUpWithEmail: async () => { },
      sendPasswordReset: async () => { },
      confirmNewPassword: async () => { },
      signOut: async () => { },
      isAuthModalOpen: false,
      openAuthModal: () => { },
      closeAuthModal: () => { },
      isProModalOpen: false,
      openProModal: () => { },
      closeProModal: () => { },
      proModalFeature: '',
      refreshProfile: async () => { },
    };
  }
  return context;
};
