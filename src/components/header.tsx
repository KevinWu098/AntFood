import React from "react";
import { Auth } from "./auth";

const Header = () => {
  return (
    <div className="flex h-16 items-center justify-between px-16 py-12 lg:px-24">
      <div className="text-3xl font-semibold tracking-wide text-primary">
        🐜 AntFood
      </div>
      <div className="">
        <Auth />
      </div>
    </div>
  );
};

export default Header;
