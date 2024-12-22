import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AvailableSlot } from "../types/types";
import { parseISO, format, addMinutes, isBefore, isAfter } from "date-fns";
import { validateSlotRequest } from "../utils/validation";

/**
 * Generate 60-minute interval time slots between start and end times.
 */
const generateTimeSlots = (startTime: string, endTime: string): AvailableSlot[] => {
  const slots: AvailableSlot[] = [];
  let current = parseISO(`1970-01-01T${startTime}:00`);
  const end = parseISO(`1970-01-01T${endTime}:00`);

  while (isBefore(current, end)) {
    const next = addMinutes(current, 60);
    if (isAfter(next, end)) break;
    slots.push({
      startTime: format(current, "HH:mm"),
      endTime: format(next, "HH:mm"),
    });
    current = next;
  }

  return slots;
};

/**
 * Search available time slots for a specific Calendar Owner and date.
 */
export const searchAvailableSlots = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { ownerId, date } = req.body;

  // Validate the incoming request
  const validationErrors = validateSlotRequest({ ownerId, date });
  if (validationErrors) {
    return res.status(400).json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    // Determine the day of the week
    const dayOfWeek = format(parseISO(date), "EEEE");

    // Fetch availability for the owner on the given day
    const availability = await prisma.availability.findMany({
      where: { ownerId, dayOfWeek },
    });

    if (!availability.length) {
      return res.status(404).json({ message: "No availability found for this date." });
    }

    // Fetch booked appointments for the date
    const appointments = await prisma.appointments.findMany({
      where: { ownerId, date: new Date(date) },
      select: { timeSlot: true },
    });
    const bookedSlots = appointments.map((a) => a.timeSlot);

    // Generate available slots and filter booked ones
    const availableSlots: AvailableSlot[] = [];
    for (const period of availability) {
      const slots = generateTimeSlots(period.startTime, period.endTime);
      const filteredSlots = slots.filter(
        (slot) => !bookedSlots.includes(`${slot.startTime}-${slot.endTime}`)
      );
      availableSlots.push(...filteredSlots);
    }

    res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving available slots", error });
  }
};
