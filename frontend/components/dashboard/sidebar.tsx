"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navigation = [
  { name: "Availability", href: "/dashboard", icon: Clock },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();
  const { clearAuthToken } = useAuth();
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  return (
    <div className="flex flex-col w-64 border-r bg-white dark:bg-gray-800">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex-shrink-0 px-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
        <nav className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 px-2">
          <Link
            href="/dashboard/settings"
            className={cn(
              pathname === "/dashboard/settings"
                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          <button
            onClick={() => clearAuthToken()}
            className="w-full mt-2 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}