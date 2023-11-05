import React from "react";
import { Auth } from "./auth";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex h-16 items-center justify-between px-16 py-12 lg:px-24">
      <div className="hidden text-3xl font-semibold tracking-wide text-primary md:flex">
        <Link href="/">🐜 AntFood</Link>
      </div>
      <div className="flex text-3xl font-semibold tracking-wide text-primary md:hidden">
        <Link href="/">AntFood</Link>
      </div>
      <div className="flex flex-row items-center gap-6">
        <div className="flex flex-row gap-6 text-lg text-primary">
          <Link href="/profile">Profile</Link>
          <Link href="/meals">Meals</Link>
        </div>
        <Auth />
      </div>
    </div>
  );
};

export default Header;
