"use client";

import * as React from "react";
import { OTPInput } from "input-otp";
import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, ...props }, ref) => (
    <OTPInput ref={ref} {...props} />
  )
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-10 text-center border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    />
  )
);
InputOTPSlot.displayName = "InputOTPSlot";

export { InputOTP, InputOTPGroup, InputOTPSlot };