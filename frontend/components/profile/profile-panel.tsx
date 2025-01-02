"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProfileForm } from "@/components/profile/profile-form";
import { useProfilePanel } from "@/hooks/use-profile-panel";

export function ProfilePanel() {
  const { isOpen, closePanel } = useProfilePanel();

  return (
    <Sheet open={isOpen} onOpenChange={closePanel}>
      <SheetContent className="w-full sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Profile Settings</SheetTitle>
        </SheetHeader>
        <ProfileForm />
      </SheetContent>
    </Sheet>
  );
}