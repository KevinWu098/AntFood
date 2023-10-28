// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoWWHmj7h6fU_sWW9mFiHS4kqlglOPoOk",
  authDomain: "antfood-403408.firebaseapp.com",
  projectId: "antfood-403408",
  storageBucket: "antfood-403408.appspot.com",
  messagingSenderId: "118969114564",
  appId: "1:118969114564:web:afe8d1cc1ca03567510e91",
  measurementId: "G-4E4F2K6TJ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export const saveUserData = async (uid, email, userData) => {
  const userRef = doc(db, "users", uid);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, { email, ...userData });
      console.log("Document updated for UID: ", uid);
    } else {
      await setDoc(userRef, { email, ...userData });
      console.log("Document created for UID: ", uid);
    }
  } catch (e) {
    console.error("Error saving/updating document: ", e);
  }
};

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);

  try {
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("User document not found");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};
