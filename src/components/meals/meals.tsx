"use client";

import React, { useCallback, useState } from "react";
import axios from "axios";
import { queryBard } from "./mealsUtils.js";

const Eateries = ["Brandywine", "Anteatery"];
const Meals = ["breakfast", "lunch", "dinner"];

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

function getFormattedDate() {
  const today = new Date().toLocaleDateString().split("/");

  const month = parseInt(today[0]);
  const day = today[1];
  const year = today[2];

  return `${month}%2F${day}%2F${year}`;
}

async function queryZotMeal(location: string, time: string) {
  const url = "https://zotmeal-backend.vercel.app/api";

  const meal = time == "breakfast" ? "0" : time == "lunch" ? "1" : "2";

  const params = {
    location: location,
    meal: meal,
    date: getFormattedDate(),
  };

  return await axios
    .get(url, { params })
    .then(async (response) => {
      const filteredMenuData = response.data.all
        .map((station: any) => {
          const entreesMenu = station.menu.find(
            (category: any) => category.category === "Entrées",
          );

          if (entreesMenu) {
            const filteredItems = entreesMenu.items.map((item: any) => ({
              name: item.name,
              nutrition: {
                calories: item.nutrition.calories,
                isVegan: item.nutrition.isVegan,
                isVegetarian: item.nutrition.isVegetarian,
                protein: item.nutrition.protein,
                totalCarbohydrates: item.nutrition.totalCarbohydrates,
              },
            }));

            return {
              station: station.station,
              menu: [
                {
                  category: "Entrées",
                  items: filteredItems,
                },
              ],
            };
          }

          return null;
        })
        .filter(Boolean);

      const itemsArray = filteredMenuData.flatMap((station: any) =>
        station.menu.flatMap((menu: any) => menu.items),
      );
      const meal = await queryBard(itemsArray);

      return meal;
    })
    .catch((error) => {
      console.error(error);
    });
}

interface Meal {
  name: string;
  nutrition: {
    calories: string;
    isVegan: boolean;
    isVegetarian: boolean;
    protein: string;
    totalCarbohydrates: string;
  };
}

const Meal = () => {
  const [breakfastData, setBreakfastData] = useState<Meal>();
  const [lunchData, setLunchData] = useState<Meal>();
  const [dinnerData, setDinnerData] = useState<Meal>();
  const [location, setLocation] = useState("brandywine");

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    Meals.forEach(async (meal) => {
      let data = await queryZotMeal(location, meal);

      if (meal == "breakfast") {
        try {
          setBreakfastData(JSON.parse(data));
          console.log(data);
        } catch (error) {
          setBreakfastData(data);
          console.log(data);
        }
      }

      if (meal == "lunch") {
        try {
          setLunchData(JSON.parse(data));
          console.log(data);
        } catch (error) {
          setLunchData(data);
          console.log(data);
        }
      }

      if (meal == "dinner") {
        try {
          setDinnerData(JSON.parse(data));
          console.log(data);
        } catch (error) {
          setDinnerData(data);
          console.log(data);
        }
      }
    });

    setLoading(false);
  };

  const handleLocationChange = useCallback(
    (e: any) => {
      setLocation(e.target.value);
    },
    [setLocation],
  );

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mt-4 flex min-h-[calc(100vh-6rem)] justify-between gap-4 gap-x-24 px-36">
        <div className="flex w-[50%] flex-col place-content-center gap-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Eatery
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 drop-shadow-sm focus:border-gray-500 focus:bg-white focus:outline-none"
                >
                  {Eateries.map((eatery) => (
                    <option key={eatery}>{eatery}</option>
                  ))}
                </select>
                <ArrowIcon />
              </div>
            </div>
          </form>

          <button
            onClick={handleClick}
            className="flex place-content-center rounded-xl border-2 border-solid border-white bg-primary px-4 py-2 text-white active:border-primary active:bg-background active:text-primary"
          >
            {loading ? "Generating..." : "Generate a meal! 😋"}
          </button>
        </div>

        <div className="flex w-[50%] flex-col place-content-center gap-2">
          {breakfastData && (
            <>
              <div className="flex w-[100%] flex-col place-content-center rounded-lg border-2 border-solid border-primary px-4 py-2 ">
                <div className="flex text-2xl">
                  {breakfastData?.name ?? "ERROR"}
                </div>
                <div>
                  Calories: {breakfastData?.nutrition?.calories ?? "ERROR"} kCal
                </div>
                <div>
                  {breakfastData?.nutrition?.isVegan
                    ? "Vegan"
                    : "Not Vegan" ?? "ERROR"}
                </div>
                <div>
                  {breakfastData?.nutrition?.isVegetarian
                    ? "Vegetarian"
                    : "Not Vegetarian"}
                </div>
                <div>
                  Protein: {breakfastData?.nutrition?.protein ?? "ERROR"} g
                </div>
                <div>
                  Carbs:{" "}
                  {breakfastData?.nutrition?.totalCarbohydrates ?? "ERROR"} g
                </div>
                <div>
                  Servings:{" "}
                  {Math.floor(
                    500 / parseInt(breakfastData?.nutrition?.calories),
                  ) ?? "ERROR"}{" "}
                  Servings
                </div>
              </div>
            </>
          )}
          {lunchData && (
            <>
              <div className="flex w-[100%] flex-col place-content-center rounded-lg border-2 border-solid border-primary px-4 py-2 ">
                <div className="flex text-2xl">
                  {lunchData?.name ?? "ERROR"}
                </div>
                <div>
                  Calories: {lunchData?.nutrition?.calories ?? "ERROR"} kCal
                </div>
                <div>
                  {lunchData?.nutrition?.isVegan
                    ? "Vegan"
                    : "Not Vegan" ?? "ERROR"}
                </div>
                <div>
                  {lunchData?.nutrition?.isVegetarian
                    ? "Vegetarian"
                    : "Not Vegetarian"}
                </div>
                <div>Protein: {lunchData?.nutrition?.protein ?? "ERROR"} g</div>
                <div>
                  Carbs: {lunchData?.nutrition?.totalCarbohydrates ?? "ERROR"} g
                </div>
                <div>
                  Servings:{" "}
                  {Math.floor(700 / parseInt(lunchData?.nutrition?.calories)) ??
                    "ERROR"}{" "}
                  Servings
                </div>
              </div>
            </>
          )}
          {dinnerData && (
            <>
              <div className="flex w-[100%] flex-col place-content-center rounded-lg border-2 border-solid border-primary px-4 py-2 ">
                <div className="flex text-2xl">
                  {dinnerData?.name ?? "ERROR"}
                </div>
                <div>
                  Calories: {dinnerData?.nutrition?.calories ?? "ERROR"} kCal
                </div>
                <div>
                  {dinnerData?.nutrition?.isVegan
                    ? "Vegan"
                    : "Not Vegan" ?? "ERROR"}
                </div>
                <div>
                  {dinnerData?.nutrition?.isVegetarian
                    ? "Vegetarian"
                    : "Not Vegetarian"}
                </div>
                <div>
                  Protein: {dinnerData?.nutrition?.protein ?? "ERROR"} g
                </div>
                <div>
                  Carbs: {dinnerData?.nutrition?.totalCarbohydrates ?? "ERROR"}{" "}
                  g
                </div>
                <div>
                  Servings:{" "}
                  {Math.floor(
                    800 / parseInt(dinnerData?.nutrition?.calories),
                  ) ?? "ERROR"}{" "}
                  Servings
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Meal;
