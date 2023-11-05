"use client";

import { useEffect, useState } from "react";
import PopularComponent from "./popularComponent";
import ProfileComponent from "./profileComponent";
import { auth } from "@/config/firebase";
import { User } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

  return (
    <>
      <div className="mt-4 flex h-[calc(100vh-6rem)] flex-col items-center gap-x-24 px-36">
        <div className="mb-6 flex w-[100%] text-left text-2xl font-medium md:text-3xl">
          Welcome back{user ? `, ${user.displayName?.split(" ")[0]}` : ""}!
        </div>

        <div className="flex w-[100%] flex-row gap-6">
          <div className="w-96">
            <ProfileComponent />
          </div>
          {/* <PopularComponent /> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
