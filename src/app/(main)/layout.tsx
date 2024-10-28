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
        <div className="max-w-7xl mx-auto p-5">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default layout;
