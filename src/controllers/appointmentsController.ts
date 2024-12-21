import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { parseISO, format } from "date-fns";

const prisma = new PrismaClient();

/**
 * Book an appointment for an Invitee.
 */
export const bookAppointment = async (req: Request, res: Response) => {
  const { ownerId, inviteeName, inviteeEmail, date, timeSlot }: { 
    ownerId: number; 
    inviteeName: string; 
    inviteeEmail: string; 
    date: string; // Format: YYYY-MM-DD
    timeSlot: string; // Format: "HH:mm-HH:mm"
  } = req.body;

  try {
    // Validate Calendar Owner
    const owner = await prisma.calendarOwner.findUnique({ where: { id: ownerId } });
    if (!owner) {
      return res.status(404).json({ message: "Calendar Owner not found." });
    }

    // Validate and parse date
    const appointmentDate = parseISO(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Validate time slot format
    const [startTime, endTime] = timeSlot.split("-");
    if (!startTime || !endTime) {
      return res.status(400).json({ message: "Invalid time slot format. Use HH:mm-HH:mm." });
    }

    // Check if the time slot exists in available slots
    const dayOfWeek = format(appointmentDate, "EEEE");
    const availability = await prisma.availability.findMany({
      where: { ownerId, dayOfWeek },
    });

    const generatedSlots = availability.flatMap((slot) => {
      const start = parseISO(`1970-01-01T${slot.startTime}:00`);
      const end = parseISO(`1970-01-01T${slot.endTime}:00`);
      const slots = [];
      let current = start;

      while (current < end) {
        const next = new Date(current.getTime() + 60 * 60 * 1000);
        if (next > end) break;
        slots.push(`${format(current, "HH:mm")}-${format(next, "HH:mm")}`);
        current = next;
      }
      return slots;
    });

    if (!generatedSlots.includes(timeSlot)) {
      return res.status(400).json({ message: "Invalid or unavailable time slot." });
    }

    // Check for conflicts with existing appointments
    const conflictingAppointment = await prisma.appointments.findFirst({
      where: { ownerId, date: appointmentDate, timeSlot },
    });

    if (conflictingAppointment) {
      return res.status(409).json({ message: "Time slot is already booked." });
    }

    // Book the appointment
    const appointment = await prisma.appointments.create({
      data: {
        ownerId,
        inviteeName,
        inviteeEmail,
        date: appointmentDate,
        timeSlot,
      },
    });

    res.status(201).json({ message: "Appointment booked successfully.", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment.", error });
  }
};