// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export const saveUserData = async (userData) => {
  const db = getFirestore(app);
  const usersCollection = collection(db, "users");

  try {
    const docRef = await addDoc(usersCollection, userData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
