import { isValid, parseISO } from "date-fns";

export const validateRequest = (data: { ownerId: number; date: string }): string[] | null => {
  const errors: string[] = [];

  if (!data.ownerId || typeof data.ownerId !== "number") {
    errors.push("Owner ID must be a valid number.");
  }

  if (!data.date || !isValid(parseISO(data.date))) {
    errors.push("Date must be a valid ISO 8601 format.");
  }

  return errors.length ? errors : null;
};