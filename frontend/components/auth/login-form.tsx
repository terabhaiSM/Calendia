"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { loginSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/auth-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/lib/config";

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onUnverifiedEmail?: (email: string) => void;
}

export function LoginForm({ onUnverifiedEmail }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuthToken } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        const error = await response.json();
        if (error.message === "Please verify your email to continue.") {
          onUnverifiedEmail?.(data.email);
          return;
        }
        
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
          className: "shadow-lg",
        });
        throw new Error(error.message);
      }

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid credentials",
          className: "shadow-lg",
        });
        throw new Error("Login failed");
      }

      const { accessToken } = await response.json();
      setAuthToken(accessToken);
      toast({
        variant: "success",
        title: "Success",
        description: "Logged in successfully",
        className: "shadow-lg",
      });
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    className="pl-9 h-12 text-base"
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="pl-9 h-12 text-base"
                  />
                </FormControl>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 text-base"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}