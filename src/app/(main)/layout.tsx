import MenuBar from "@/app/(main)/MenuBar";
import Navbar from "@/app/(main)/Navbar";
import { SessionProvider } from "@/app/(main)/SessionProvider";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="sticky top-[5.15rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex h-fit w-pa justify-center gap-5 bg-card p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
};

export default layout;
