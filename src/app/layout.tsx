import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Header } from "./components/header";
import { UserProvider } from "./components/user-context";

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
  const signedIn = false;

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <div className="flex items-center">
                <SidebarTrigger className="ml-1" />
                <Header />
              </div>
              {children}
            </main>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
