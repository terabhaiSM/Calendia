import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateRegisterInputs } from "../utils/validation";

// Helper to generate a unique username
const generateUniqueUsername = async (name: string, prisma: PrismaClient): Promise<string> => {
  let username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
  const existingUser = await prisma.calendarOwner.findUnique({ where: { username } });
  while (existingUser) {
    username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
  }
  return username;
};

export const registerUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  const validationErrors = validateRegisterInputs(name, email, password);
  if (validationErrors.length) {
    return res.status(400).json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUniqueUsername(name, prisma);

    const user = await prisma.calendarOwner.create({
      data: { name, email, password: hashedPassword, username },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};