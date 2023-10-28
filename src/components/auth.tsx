"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase.js";
import { User, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image.js";
import petr from "../public/images/petr.png";

export const Auth = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  const signInWithGoogle = async () => {
    try {
      if (user) {
        console.log("Already logged in!");
        console.log(user);
        return;
      }

      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  return (
    <>
      <div className="text-lg">
        {!user ? (
          <div className="flex flex-row gap-6">
            <button onClick={signInWithGoogle} className="text-primary">
              Sign In
            </button>
            <button
              onClick={signInWithGoogle}
              className="rounded-xl border-solid bg-primary px-5 py-2 text-background drop-shadow-lg"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <button
              onClick={logout}
              className="rounded-xl border-solid bg-primary px-5 py-2 text-background drop-shadow-lg"
            >
              Logout
            </button>
            <div className="h-11 w-11">
              <Image
                src={user.photoURL ? user.photoURL : petr}
                alt={"Profile Picture"}
                width={100}
                height={100}
                className="rounded-full border-2 border-solid border-primary"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
