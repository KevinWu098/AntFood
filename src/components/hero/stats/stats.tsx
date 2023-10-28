import Image from "next/image";
import React from "react";
import eatr from "../../../public/images/eatr.png";

const Genders = ["Male", "Female", "Non-Binary"];
const DietaryRestrictions = ["None", "Vegetarian", "Vegan"];
const DietaryGoals = ["Gain Weight", "Maintain Weight", "Lose Weight"];

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
  return (
    <>
      <div className="= flex h-[40rem] w-96 flex-col gap-10 rounded-xl bg-neutral-300 p-4 text-primary drop-shadow-lg">
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
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Gender
            </label>
            <div className="relative">
              <select className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none">
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
              <select className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none">
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
              <select className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none">
                {DietaryGoals.map((goal) => (
                  <option key={goal}>{goal}</option>
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
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
