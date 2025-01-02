"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LogoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">You&apos;ve been logged out</h1>
          <p className="text-muted-foreground">We hope to see you again soon!</p>
        </div>
        <Button 
          onClick={() => router.push("/auth")} 
          className="w-full"
        >
          Go back to the login page
        </Button>
      </Card>
    </div>
  );
}