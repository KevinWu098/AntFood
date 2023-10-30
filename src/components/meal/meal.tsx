import Image from "next/image";
import React from "react";

// import Anteatery from "../../../public/images/Anteatery.jpg";
import Anteatery3 from "src/public/images/Anteatery3.jpg";
// import Brandywine from "../../../public/images/Brandywine.jpg";

const Meal = () => {
  const date = new Date().toLocaleDateString();

  return (
    <>
      <div className="= flex h-[40rem] w-[70%] flex-col gap-6 rounded-xl border-2 border-primary text-primary drop-shadow-lg">
        <Image
          src={Anteatery3}
          alt="Anteatery"
          className="absolute -z-10 h-32 w-[100%] object-cover brightness-50"
        />
        <div className="flex h-32 flex-col p-2 text-white">
          <div className="mt-auto flex flex-col">
            <div className="-mb-2 flex text-3xl font-semibold">Anteatery</div>
            <div className="flex text-lg font-semibold">
              {"Today's"} Date: {date}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
