import React from "react";
import Stats from "./stats/stats";

const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-[100%] place-content-center justify-between px-64">
      <Stats />
      <div>HERO</div>
    </div>
  );
};

export default Hero;
