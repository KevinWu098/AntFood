"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import eatr from "../../../public/images/eatr.png";

const Genders = ["Male", "Female", "Non-Binary"];
const DietaryRestrictions = ["None", "Vegetarian", "Vegan"];
const DietaryGoals = ["Gain", "Maintain", "Lose"];

export const ArrowIcon = () => {
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
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [gender, setGender] = useState<"Male" | "Female" | "Non-Binary">();
  const [diet, setDiet] = useState<"None" | "Vegetarian" | "Vegan">();
  const [goal, setGoal] = useState<"Gain" | "Maintain" | "Lose">();

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
      setGoal(e.target.value);
    },
    [setGoal],
  );

  return (
    <>
      <div className="= flex h-[40rem] w-80 flex-col gap-6 rounded-xl bg-neutral-300 p-4 text-primary drop-shadow-lg">
        <div className="flex place-content-center text-2xl font-medium">
          Your Zot-Stats!
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Height {"(inches)"}
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
              type="text"
              placeholder="60"
              onChange={handleHeightChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Weight {"(lbs)"}
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
              type="text"
              placeholder="100"
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

        <div className="flex place-content-center">
          <Image
            src={eatr}
            alt={"Anteater with food"}
            width={100}
            height={100}
            className="w-36"
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
