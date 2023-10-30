"use client";

import React, { useEffect, useState } from "react";

import Profile from "../profile/profile";
import Meal from "../meal/meal";

import { auth } from "@/config/firebase";
import { User } from "firebase/auth";

const Hero = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-[calc(100vh-6rem)] w-[100%] justify-between px-32">
      <Profile />
      <Meal />
    </div>
  );
};

export default Hero;
