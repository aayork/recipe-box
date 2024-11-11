import { useState } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "./components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipe Box",
  description: "Recipes for college students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [signedIn, setSignedIn] = useState(false);

  const toggleSignIn = () => {
    setSignedIn((prev) => !prev);
  };
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="flex items-center">
              <SidebarTrigger className="ml-1" />
              <Header signedIn={signedIn} onSignInToggle={toggleSignIn} />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
