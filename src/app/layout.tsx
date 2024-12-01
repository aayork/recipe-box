import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { UserProvider } from "@/components/user-context";

const baskervvilleSC = localFont({
  src: "./fonts/BaskervvilleSC-Regular.ttf",
  variable: "--font-baskervville-sc",
  weight: "400",
  style: "normal",
});

const wittgensteinVF = localFont({
  src: "./fonts/Wittgenstein-VariableFont_wght.ttf",
  variable: "--font-wittgenstein-vf",
  weight: "400",
  style: "normal",
});

const wittgensteinItalicVF = localFont({
  src: "./fonts/Wittgenstein-Italic-VariableFont_wght.ttf",
  variable: "--font-wittgenstein-italic-vf",
  weight: "400",
  style: "normal",
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
  return (
    <html lang="en">
      <body className={wittgensteinVF.variable}>
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
