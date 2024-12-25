"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProfileButton() {
  const router = useRouter();
  
  return (
    <Button 
      variant="ghost" 
      className="w-full flex items-center gap-2 p-2 md:p-4 h-auto" 
      onClick={() => router.push("/profile")}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col flex-1 items-start text-sm">
        <span className="font-medium">John Doe</span>
        <span className="text-muted-foreground text-xs">john@example.com</span>
      </div>
    </Button>
  );
}