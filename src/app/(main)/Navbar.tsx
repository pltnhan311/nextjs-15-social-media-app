import SearchField from "@/components/SearchField";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <div className="flex items-center gap-5">
          <Link href="/" className="text-2xl font-bold text-primary">
            WeChat
          </Link>
          <SearchField />
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
