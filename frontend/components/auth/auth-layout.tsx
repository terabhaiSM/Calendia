"use client";

import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[380px] sm:max-w-md mx-auto shadow-lg">
        {children}
      </Card>
    </div>
  );
}