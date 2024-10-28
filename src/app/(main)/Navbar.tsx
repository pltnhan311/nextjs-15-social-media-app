import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-5 py-3 gap-5">
        <div className="flex items-center gap-5">
          <Link href="/" className="text-2xl font-bold text-primary">
          WeChat
          </Link>
          <SearchField />
        </div>
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
