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
import { auth, db, googleProvider, isFirebaseConfigured } from '../config/firebase';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const fetchOrCreateProfile = useCallback(async (firebaseUser) => {
    const fallbackProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      plan: 'free',
      subscriptionStatus: 'inactive',
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
        let currentPlan = data.plan || 'free';
        let currentStatus = data.subscriptionStatus || 'inactive';

        const isLifetime = data.planType === 'lifetime' || data.subscriptionType === 'lifetime';

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
          await updateDoc(userDocRef, {
            lastLoginAt: Date.now(),
            displayName: firebaseUser.displayName || data.displayName || null,
            photoURL: firebaseUser.photoURL || data.photoURL || null,
          });
        }

        return {
          ...data,
          plan: currentPlan,
          subscriptionStatus: currentStatus,
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

    // Call serverless Resend API endpoint
    const response = await fetch('/api/reset-password/', {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isPro,
        isLifetime,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        confirmNewPassword,
        signOut,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        refreshProfile,
      }}
    >
      {children}
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
      signInWithGoogle: async () => {},
      signInWithEmail: async () => {},
      signUpWithEmail: async () => {},
      sendPasswordReset: async () => {},
      confirmNewPassword: async () => {},
      signOut: async () => {},
      isAuthModalOpen: false,
      openAuthModal: () => {},
      closeAuthModal: () => {},
      refreshProfile: async () => {},
    };
  }
  return context;
};
