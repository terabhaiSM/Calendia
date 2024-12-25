"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 border-b md:hidden">
      <h1 className="text-xl font-bold">Calendia</h1>
      <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </Button>
    </div>
  );
}