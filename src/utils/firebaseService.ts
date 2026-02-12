import { collection, addDoc, query, orderBy, Timestamp, onSnapshot } from 'firebase/firestore';
import { db, isDevMode } from '../config/firebase';
import type { RSVPFormData } from '../types';

// Define the shape of the data stored in Firestore
export interface RSVPRecord extends RSVPFormData {
  id: string;
  createdAt: Timestamp;
}

export interface UserProfile {
  email: string;
  requiresPasswordChange: boolean;
  role?: 'admin' | 'user';
}

const COLLECTION_NAME = 'rsvps';

// In-memory storage for development mode
let devModeRSVPs: RSVPRecord[] = [];

/**
 * Add a new RSVP response to Firestore (or mock in dev mode)
 */
export const saveRSVPToFirebase = async (data: RSVPFormData): Promise<{ success: boolean; error?: string }> => {
  // Development mode - simulate Firebase without actual connection
  if (isDevMode || !db) {
    console.log('💻 DEV MODE: Simulating RSVP save...', data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Add to in-memory storage
    const mockRecord: RSVPRecord = {
      ...data,
      id: `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Timestamp.now(),
    };
    devModeRSVPs.unshift(mockRecord);

    console.log('✅ DEV MODE: RSVP saved to memory (not persisted)', mockRecord);
    return { success: true };
  }

  // Production mode - actual Firebase
  try {
    console.log('Attempting to save RSVP to Firebase...', { collection: COLLECTION_NAME });

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: Timestamp.now(),
    });

    console.log('RSVP saved successfully with ID:', docRef.id);
    return { success: true };
  } catch (error: any) {
    console.error("Error adding document: ", error);

    // Provide specific error messages
    let errorMessage = 'Възникна грешка при изпращане на RSVP.';

    if (error.code === 'permission-denied') {
      errorMessage = 'Няма достъп до базата данни. Моля, свържете се с администратор.';
      console.error('Firebase permission denied. Check Firestore security rules.');
    } else if (error.code === 'unavailable') {
      errorMessage = 'Няма връзка с интернет. Моля, проверете връзката си.';
    } else if (error.code === 'not-found') {
      errorMessage = 'База данни не е намерена. Моля, свържете се с администратор.';
    } else {
      errorMessage = `Грешка: ${error.message || 'Неизвестна грешка'}`;
    }

    return { success: false, error: errorMessage };
  }
};

/**
 * Subscribe to real-time updates for RSVPs (or mock in dev mode)
 */
export const subscribeToRSVPs = (
  callback: (data: RSVPRecord[]) => void,
  onError?: (error: unknown) => void
) => {
  // Development mode - return mock data
  if (isDevMode || !db) {
    console.log('💻 DEV MODE: Using in-memory RSVPs');

    // Immediately call callback with current dev mode data
    callback(devModeRSVPs);

    // Return a mock unsubscribe function
    return () => {
      console.log('💻 DEV MODE: Unsubscribed from mock RSVPs');
    };
  }

  // Production mode - actual Firebase subscription
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (querySnapshot) => {
      const rsvps: RSVPRecord[] = [];
      querySnapshot.forEach((doc) => {
        rsvps.push({ id: doc.id, ...doc.data() } as RSVPRecord);
      });
      callback(rsvps);
    },
    (error) => {
      onError?.(error);
    }
  );
};

// --- User Profile & Password Management ---

/**
 * Get user profile from Firestore
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword, type User } from 'firebase/auth';

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  if (isDevMode || !db) {
    console.log('💻 DEV MODE: getUserProfile', user.uid);
    // Mock profile for dev mode
    return {
      email: user.email || 'admin@dev.local',
      requiresPasswordChange: false // Change to true to test forced change in dev mode
    };
  }

  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log('User profile not found. Creating one...');
      // Auto-create profile if it doesn't exist
      const newProfile: UserProfile = {
        email: user.email || '',
        requiresPasswordChange: true, // Default to true for new users
        role: 'admin' // Default to admin for the first user
      };

      await setDoc(docRef, newProfile);
      console.log('User profile created successfully.');
      return newProfile;
    }
  } catch (error) {
    console.error('Error getting/creating user profile:', error);
    // If we can't create it (e.g. permission denied because rule requires uid match but maybe something else is wrong), return null
    return null;
  }
};

/**
 * Update user profile in Firestore
 */
export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<boolean> => {
  if (isDevMode || !db) {
    console.log('💻 DEV MODE: updateUserProfile', uid, data);
    return true;
  }

  try {
    const docRef = doc(db, 'users', uid);
    // Use set with merge: true to create if not exists or update if exists
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

/**
 * Update user password
 */
export const updateUserPassword = async (user: User, newPassword: string): Promise<{ success: boolean; error?: string }> => {
  if (isDevMode) {
    console.log('💻 DEV MODE: updateUserPassword', newPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating password:', error);
    let errorMessage = 'Failed to update password.';

    if (error.code === 'auth/requires-recent-login') {
      errorMessage = 'Please log out and log in again to change your password.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    }

    return { success: false, error: errorMessage };
  }
};

