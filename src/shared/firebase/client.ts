import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';
import { Firestore, connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { Functions, connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { FirebaseStorage, connectStorageEmulator, getStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export interface FirebaseServices { app: FirebaseApp; auth: Auth; db: Firestore; functions: Functions; storage: FirebaseStorage; }
let services: FirebaseServices | null = null;
let emulatorsConnected = false;

export function getFirebaseServices(): FirebaseServices | null {
  if (!config.projectId || !config.apiKey) return null;
  if (!services) {
    const app = getApps()[0] ?? initializeApp(config);
    services = { app, auth: getAuth(app), db: getFirestore(app), functions: getFunctions(app), storage: getStorage(app) };
  }
  if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true' && !emulatorsConnected) {
    connectAuthEmulator(services.auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(services.db, '127.0.0.1', 8080);
    connectFunctionsEmulator(services.functions, '127.0.0.1', 5001);
    connectStorageEmulator(services.storage, '127.0.0.1', 9199);
    emulatorsConnected = true;
  }
  return services;
}
