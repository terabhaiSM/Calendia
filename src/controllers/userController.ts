import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RegisterUserRequest } from "types";

export const registerUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { name, email }: { name: string; email: string } = req.body;

  try {
    const user:RegisterUserRequest = await prisma.calendarOwner.create({
      data: { name, email },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
