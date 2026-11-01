import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDKCTeYy9A1kAyBFnl7eCqOTvBdkSiUUhc',
  authDomain: 'alchemist-b7d37.firebaseapp.com',
  projectId: 'alchemist-b7d37',
  storageBucket: 'alchemist-b7d37.firebasestorage.app',
  messagingSenderId: '1058993060408',
  appId: '1:1058993060408:web:cbe3dd3f353f10ee2e84cd',
  measurementId: 'G-FR7WRPN992',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
