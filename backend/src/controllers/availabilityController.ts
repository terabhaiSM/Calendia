import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const setAvailability = async (req: Request, res: Response, prisma: PrismaClient): Promise<Response | void> => {
  const { ownerId, availability }: { ownerId: string; availability: { dayOfWeek: string; startTime: string; endTime: string }[] } = req.body;

  try {
    const owner = await prisma.calendarOwner.findUnique({ where: { id: ownerId } });

    if (!owner) {
      return res.status(404).json({ message: "Calendar Owner not found" });
    }

    // Insert availability records
    const availabilityRecords = await prisma.availability.createMany({
      data: availability.map((slot) => ({
        ownerId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    });

    res.status(201).json({ message: "Availability setup successfully", records: availabilityRecords });
  } catch (error) {
    res.status(500).json({ message: "Error setting availability", error });
  }
};