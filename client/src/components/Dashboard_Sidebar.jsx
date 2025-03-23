import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";

function Dashboard_Sidebar() {
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex gap-2">
              <SidebarGroupLabel className="font-poppins text-1xl">
                Navigate
              </SidebarGroupLabel>
              <ModeToggle />
            </div>
            <SidebarGroupContent className="mt-10 ">
              <SidebarMenu className="space-y-2 ">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="font-poppins ">
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
          <SidebarGroup className="mt-15">
            <SidebarGroupLabel className="text-1xl font-poppins">
              Contact
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-10">
              <SidebarMenu className="space-y-2 mx-1">
                <p className="text-gray-700 text-sm font-poppins dark:text-gray-100">
                  Galle Road, Colombo 03
                </p>
                <p className="text-gray-700 text-sm font-poppins dark:text-gray-100">
                  help@Farmsense.com
                </p>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter>
            <div className="flex justify-center mt-20 ">
              <p className="text-gray-500 text-sm font-poppins">
                © 2025 Farmsense
              </p>
            </div>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

export default Dashboard_Sidebar;
