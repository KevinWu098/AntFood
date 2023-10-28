"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import eatr from "../../../public/images/eatr.png";
import { saveUserData, auth, getUserData } from "@/config/firebase";
import { DocumentData } from "firebase/firestore";

const Genders = ["Male", "Female", "Non-Binary"];
const DietaryRestrictions = ["None", "Vegetarian", "Vegan"];
const DietaryGoals = ["Gain", "Maintain", "Lose"];

const ArrowIcon = () => {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  );
};

const Stats = () => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [gender, setGender] = useState<"Male" | "Female" | "Non-Binary">(
    "Male",
  );
  const [diet, setDiet] = useState<"None" | "Vegetarian" | "Vegan">("None");
  const [goal, setGoal] = useState<"Gain" | "Maintain" | "Lose">("Gain");

  const handleHeightChange = useCallback(
    (e: any) => {
      setHeight(e.target.value);
    },
    [setHeight],
  );
  const handleWeightChange = useCallback(
    (e: any) => {
      setWeight(e.target.value);
    },
    [setWeight],
  );
  const handleGenderChange = useCallback(
    (e: any) => {
      setGender(e.target.value);
    },
    [setGender],
  );
  const handleDietChange = useCallback(
    (e: any) => {
      setDiet(e.target.value);
    },
    [setDiet],
  );
  const handleGoalChange = useCallback(
    (e: any) => {
      setGoal(e.target.value.split(" ")[0]);
    },
    [setGoal],
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const userData = { height, weight, gender, diet, goal };

    if (user) {
      saveUserData(user.uid, user.email, userData);
    } else {
      console.log("User is not authenticated/logged in...");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserData(user.uid);

        setUserData(data);

        setHeight(userData?.height);
        setWeight(userData?.weight);
        setGender(userData?.gender);
        setDiet(userData?.diet);
        setGoal(userData?.goal);
      }
    };

    fetchData();
  }, [
    user,
    userData?.diet,
    userData?.gender,
    userData?.goal,
    userData?.height,
    userData?.weight,
  ]);

  return (
    <>
      <div className="= flex h-[40rem] w-[25%] flex-col gap-6 rounded-xl bg-neutral-300 p-4 text-primary drop-shadow-lg">
        <div className="flex place-content-center text-2xl font-medium">
          Your Profile
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col place-content-center gap-4"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Height {"(inches)"}
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                type="number"
                placeholder="60"
                value={height}
                onChange={handleHeightChange}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Weight {"(lbs)"}
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                type="number"
                placeholder="100"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Gender
              </label>
              <div className="relative">
                <select
                  onChange={handleGenderChange}
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                >
                  {Genders.map((gender) => (
                    <option key={gender}>{gender}</option>
                  ))}
                </select>
                <ArrowIcon />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Dietary Restriction
              </label>
              <div className="relative">
                <select
                  onChange={handleDietChange}
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                >
                  {DietaryRestrictions.map((restriction) => (
                    <option key={restriction}>{restriction}</option>
                  ))}
                </select>
                <ArrowIcon />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Dietary Goal
              </label>
              <div className="relative">
                <select
                  onChange={handleGoalChange}
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                >
                  {DietaryGoals.map((goal) => (
                    <option key={goal}>{goal} Weight</option>
                  ))}
                </select>
                <ArrowIcon />
              </div>
            </div>
          </div>

          {/*TODO: ADD PROPER DISABLED STATE AND ERROR MESSAGES */}
          <button
            disabled={auth.currentUser ? false : true}
            className="mx-auto flex w-32 place-content-center rounded-xl border-2 border-solid border-primary py-1 text-primary drop-shadow-md"
          >
            Save Profile
          </button>
        </form>

        {/* <div className="flex place-content-center">
          <Image
            src={eatr}
            alt={"Anteater with food"}
            width={100}
            height={100}
            className="w-28"
          />
        </div> */}
      </div>
    </>
  );
};

export default Stats;
