"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}

export function OTPInput({ value, onChange, maxLength }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (index: number, inputValue: string) => {
    const newValue = value.split("");
    newValue[index] = inputValue;
    const updatedValue = newValue.join("");
    onChange(updatedValue);

    // Move focus to next input
    if (inputValue && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, maxLength);
    onChange(pastedData);
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: maxLength }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleInput(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-10 h-12 text-lg text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-ring",
            "border-input bg-background",
            "transition-all duration-150"
          )}
        />
      ))}
    </div>
  );
}