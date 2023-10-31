import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ParkingSessionData } from "./types";
import { validateSessionData } from "./validation";

const firebaseConfig = {
  apiKey: "AIzaSyCruqmUI6RI9oh7sHP8H_3QhP3mtOWhLZg",
  authDomain: "vendpark-session-tracker.firebaseapp.com",
  projectId: "vendpark-session-tracker",
  storageBucket: "vendpark-session-tracker.appspot.com",
  messagingSenderId: "559989403660",
  appId: "1:559989403660:web:dec9c90856d4ea55f83e29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const COLLECTION_NAME = "parking_sessions";

async function getActiveSession(licensePlate: string) {
  // Session is active if no end time has been recorded
  const q = query(
    collection(db, COLLECTION_NAME),
    where("licensePlate", "==", licensePlate.toLowerCase()),
    where("endTime", "==", null)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.length ? snapshot.docs[0] : null;
}

export async function getOrCreateSession(
  licensePlate: string,
  phoneNumber: string
): Promise<ParkingSessionData> {
  validateSessionData(licensePlate, phoneNumber);

  // If there's an active session, return it
  const activeSession = await getActiveSession(licensePlate);
  if (activeSession) {
    return activeSession.data() as ParkingSessionData;
  }

  // Otherwise, create a new session
  const doc = {
    licensePlate: licensePlate.toLowerCase(),
    phoneNumber,
    startTime: Date.now(),
    endTime: null,
  };

  await addDoc(collection(db, COLLECTION_NAME), doc);
  return doc;
}

export async function endSession(licensePlate: string) {
  // Update active session with current time as end time
  const activeSession = await getActiveSession(licensePlate);
  if (activeSession) {
    const docRef = doc(db, COLLECTION_NAME, activeSession.id);
    await updateDoc(docRef, {
      endTime: Date.now(),
    });
  }
  // todo: handle error
}

export function subscribeToSessions(
  callback: (sessions: ParkingSessionData[]) => void
) {
  // Subscribe to parking session collection changes
  return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ParkingSessionData)
    );
    callback(data);
  });
}
