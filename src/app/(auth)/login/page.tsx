import LoginForm from "@/app/(auth)/login/LoginForm";
import loginImage from "@/assets/login-image.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to WeChat</h1>
            <p className="text-muted-foreground">
              A place for sharing your thoughts and ideas
            </p>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <span className="text-md block text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Button
                asChild
                variant="transparentNeutral"
                className="ml-2 font-semibold"
              >
                <Link href="/signup">
                  Get access
                  <ArrowRight />
                </Link>
              </Button>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;