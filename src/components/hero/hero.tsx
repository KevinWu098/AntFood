import React from "react";
import Stats from "./stats/stats";

const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-6rem)] w-[100%] items-center justify-between px-32">
      <Stats />
      <div>HERO</div>
    </div>
  );
};

export default Hero;
