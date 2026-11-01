import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import type { TranslationKey } from '@/i18n';
import { auth } from './firebaseauth';

const ERROR_KEYS: Record<string, TranslationKey> = {
  'auth/email-already-in-use': 'auth.error.emailInUse',
  'auth/invalid-email': 'auth.error.invalidEmail',
  'auth/invalid-credential': 'auth.error.invalidCredential',
  'auth/weak-password': 'auth.error.weakPassword',
  'auth/too-many-requests': 'auth.error.tooManyRequests',
  'auth/network-request-failed': 'auth.error.network',
  'auth/popup-closed-by-user': 'auth.error.popupClosed',
  'auth/popup-blocked': 'auth.error.popupBlocked',
};

function toErrorKey(error: unknown): TranslationKey {
  const code =
    typeof error === 'object' && error && 'code' in error
      ? String(error.code)
      : '';

  return ERROR_KEYS[code] ?? 'auth.error.unknown';
}

export async function signInWithGoogle(): Promise<TranslationKey | undefined> {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());

    return;
  } catch (error) {
    return toErrorKey(error);
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<TranslationKey | undefined> {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return;
  } catch (error) {
    return toErrorKey(error);
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<TranslationKey | undefined> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(credential.user, { displayName: name });

    return;
  } catch (error) {
    return toErrorKey(error);
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}
