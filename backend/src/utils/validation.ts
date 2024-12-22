import { isValid, parseISO } from "date-fns";
import { validate } from "email-validator";

export const validateSlotRequest = (data: { ownerId: string; date: string }): string[] | null => {
  const errors: string[] = [];

  if (!data.ownerId || typeof data.ownerId !== "string") {
    errors.push("Owner ID must be a valid number.");
  }

  if (!data.date || !isValid(parseISO(data.date))) {
    errors.push("Date must be a valid ISO 8601 format.");
  }

  return errors.length ? errors : null;
};

export const validateRegisterInputs = (name: string, email: string, password: string): string[] => {
  const errors: string[] = [];

  if (!validate(email)) {
    errors.push("Invalid email address.");
  }
  if (name.length < 3) {
    errors.push("Name must be at least 3 characters long.");
  }
  if (
    password.length < 6 ||
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errors.push("Password must be at least 6 characters long, include an uppercase letter, and a special character.");
  }

  return errors;
};