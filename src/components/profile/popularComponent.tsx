import React from "react";
import Image from "next/image";
import Anteatery3 from "src/public/images/Anteatery3.jpg";

const PopularComponent = () => {
  const favoriteMeals = [];
  const date = new Date().toLocaleDateString();

  return (
    <>
      <div className="flex w-[100%] flex-col">
        <div className="relative z-10 flex h-[20%] flex-col overflow-hidden rounded-xl border-4 border-solid border-primary">
          <div className="h-[20%]">
            <Image
              src={Anteatery3}
              alt="Anteatery"
              className="absolute -z-10 h-[100%] object-cover brightness-[0.7]"
            />
            <div className="absolute mt-auto flex h-[100%] flex-col place-content-end p-2 leading-none text-white">
              <div className="text-lg font-medium">Favorite Eatery:</div>
              <div className="text-3xl font-medium">Anteatery</div>
            </div>
          </div>
        </div>
        <div className="h-[80%]"></div>
      </div>
    </>
  );
};

export default PopularComponent;
