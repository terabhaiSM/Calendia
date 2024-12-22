"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

export default function AuthPage() {
  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[380px] sm:max-w-md mx-auto shadow-lg">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 rounded-b-none">
            <TabsTrigger value="login" className="flex items-center gap-2 text-sm sm:text-base">
              <LogIn className="h-4 w-4 hidden sm:inline" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2 text-sm sm:text-base">
              <UserPlus className="h-4 w-4 hidden sm:inline" />
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <CardHeader className="space-y-2 px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              <LoginForm />
            </CardContent>
          </TabsContent>

          <TabsContent value="register">
            <CardHeader className="space-y-2 px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              <RegisterForm />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}