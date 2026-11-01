import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/service/firebaseauth';

const session = { name: '', email: '', photo: '' };

export function initSession(onChange: () => void): void {
  onAuthStateChanged(auth, (user) => {
    session.name = user ? (user.displayName ?? user.email ?? '') : '';
    session.email = user?.email ?? '';
    session.photo = user?.photoURL ?? '';
    onChange();
  });
}

export function isSignedIn(): boolean {
  return session.name !== '';
}

export function getUsername(): string {
  return session.name;
}

export function getUserEmail(): string {
  return session.email;
}

export function getUserPhoto(): string {
  return session.photo;
}
