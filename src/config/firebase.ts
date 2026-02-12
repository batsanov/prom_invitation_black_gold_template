// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Check if we're in development mode
const isDevMode = import.meta.env.VITE_DEV_MODE === 'true' || 
                  import.meta.env.VITE_FIREBASE_API_KEY === 'dev-mode';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // Prefer non-"AUTH" env var name to avoid platform warnings.
  // Keep backward compatibility with older deployments.
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN ?? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration (only in production mode)
const validateConfig = () => {
  if (isDevMode) {
    console.info('🔧 Running in DEVELOPMENT MODE - Firebase is disabled. RSVPs will not be persisted.');
    return false;
  }

  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);
  
  if (missing.length > 0) {
    console.error('Missing Firebase configuration:', missing);
    console.error('To run in development mode without Firebase, copy .env.development to .env');
    throw new Error(`Missing Firebase config: ${missing.join(', ')}. Check DEVELOPMENT_GUIDE.md for setup instructions.`);
  }
  
  return true;
};

const isFirebaseEnabled = validateConfig();

// Initialize Firebase (only if not in dev mode)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (isFirebaseEnabled) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.info('🔥 Firebase initialized successfully');
}

export { db, auth, isDevMode, isFirebaseEnabled };

