"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutDashboard, Link2, Settings, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ProfileButton } from "@/components/profile/profile-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const sidebarItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Availability",
    icon: Calendar,
    href: "/availability",
  },
  {
    title: "Appointments",
    icon: Users,
    href: "/appointments",
  },
  {
    title: "Booking Links",
    icon: Link2,
    href: "/booking-links",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="md:w-64 lg:w-72 md:relative fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:border-t-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="hidden md:block border-b">
          <ProfileButton />
        </div>
        <nav className={cn(
          "flex md:flex-col gap-1 p-2 md:p-4",
          "overflow-x-auto md:overflow-x-visible scrollbar-none",
          "justify-around md:justify-start flex-1"
        )}>
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "flex-1 md:flex-none justify-center md:justify-start gap-2 min-w-[auto]",
                pathname === item.href && "bg-secondary"
              )}
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.title}</span>
            </Button>
          ))}
        </nav>
        <div className="hidden md:block border-t p-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}