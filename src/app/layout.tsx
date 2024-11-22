import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { UserProvider } from "@/components/user-context";
import { RecipeProvider } from "@/components/recipe-context";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
  return (
    <html lang="en">
      <body>
        {/* ThemeProvider for handling light/dark themes */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* UserProvider wraps the entire app to manage user state */}
          <UserProvider>
            {/* RecipeProvider wraps app to manage recipes */}
            <RecipeProvider>
              {/* SidebarProvider for sidebar state management */}
              <SidebarProvider>
                {/* Sidebar navigation */}
                <AppSidebar />
                <main className="w-full">
                  <div className="flex items-center">
                    {/* Sidebar trigger button */}
                    <SidebarTrigger className="ml-1" />
                    {/* Header of the app */}
                    <Header />
                  </div>
                  {/* Main content of the app */}
                  {children}
                </main>
              </SidebarProvider>
            </RecipeProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
