"use client";

import { Home, CircleUser, CookingPot, Heart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Recipes",
    url: "/my-recipes",
    icon: CookingPot,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Recipe Box
            {pathname === "/" ? (
              <img
                src="/images/logo-transparent.png"
                alt="Recipe Box Icon"
                width={50}
                height={50}
              />
            ) : (
              <Link href="/" passHref>
                <img
                  src="/images/logo-transparent.png"
                  alt="Recipe Box Icon"
                  width={50}
                  height={50}
                  className="cursor-pointer"
                />
              </Link>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
