import { bookAppointment, listUpcomingAppointments } from "../controllers/appointmentsController";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const prismaMock = mockDeep<PrismaClient>();

describe("Appointment Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("bookAppointment", () => {
    it("should book an appointment successfully", async () => {
      const ownerId = uuidv4();
      const appointmentDate = "2024-12-22";
      const timeSlot = "10:00-11:00";

      // Mock owner validation
      prismaMock.calendarOwner.findUnique.mockResolvedValue({
        id: ownerId,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date(),
      });

      // Mock availability
      prismaMock.availability.findMany.mockResolvedValue([
        { id: uuidv4(), ownerId, dayOfWeek: "Sunday", startTime: "10:00", endTime: "12:00", createdAt: new Date() },
      ]);

      // Mock no conflicting appointment
      prismaMock.appointments.findFirst.mockResolvedValue(null);

      // Mock successful appointment creation
      prismaMock.appointments.create.mockResolvedValue({
        id: uuidv4(),
        ownerId,
        inviteeName: "Jane Doe",
        inviteeEmail: "jane.doe@example.com",
        date: new Date(appointmentDate),
        timeSlot,
        createdAt: new Date(),
      });

      mockRequest.body = {
        ownerId,
        inviteeName: "Jane Doe",
        inviteeEmail: "jane.doe@example.com",
        date: appointmentDate,
        timeSlot,
      };

      await bookAppointment(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );

      expect(prismaMock.calendarOwner.findUnique).toHaveBeenCalledWith({
        where: { id: ownerId },
      });
      expect(prismaMock.availability.findMany).toHaveBeenCalledWith({
        where: { ownerId, dayOfWeek: "Sunday" },
      });
    expect(prismaMock.appointments.findFirst).toHaveBeenCalledWith({
      where: { 
        ownerId, 
        date: new Date(new Date(appointmentDate).getTime() - 5.5 * 60 * 60 * 1000), 
        timeSlot 
      },
    });
      expect(prismaMock.appointments.create).toHaveBeenCalledWith({
        data: {
          ownerId,
          inviteeName: "Jane Doe",
          inviteeEmail: "jane.doe@example.com",
          date: new Date(new Date(appointmentDate).getTime() - 5.5 * 60 * 60 * 1000),
          timeSlot,
        },
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Appointment booked successfully.",
        appointment: expect.any(Object),
      });
    });

    it("should return 404 if Calendar Owner is not found", async () => {
      prismaMock.calendarOwner.findUnique.mockResolvedValue(null);

      mockRequest.body = {
        ownerId: uuidv4(),
        inviteeName: "Jane Doe",
        inviteeEmail: "jane.doe@example.com",
        date: "2024-12-22",
        timeSlot: "10:00-11:00",
      };

      await bookAppointment(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Calendar Owner not found." });
    });

    it("should return 409 if the time slot is already booked", async () => {
      const ownerId = uuidv4();
      const appointmentDate = "2024-12-22";
      const timeSlot = "10:00-11:00";

      prismaMock.calendarOwner.findUnique.mockResolvedValue({
        id: ownerId,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date(),
      });

      prismaMock.availability.findMany.mockResolvedValue([
        { id: uuidv4(), ownerId, dayOfWeek: "Sunday", startTime: "10:00", endTime: "12:00", createdAt: new Date() },
      ]);

      prismaMock.appointments.findFirst.mockResolvedValue({
        id: uuidv4(),
        ownerId,
        inviteeName: "Jane Doe",
        inviteeEmail: "jane.doe@example.com",
        date: new Date(appointmentDate),
        timeSlot,
        createdAt: new Date(),
      });

      mockRequest.body = {
        ownerId,
        inviteeName: "Jane Doe",
        inviteeEmail: "jane.doe@example.com",
        date: appointmentDate,
        timeSlot,
      };

      await bookAppointment(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Time slot is already booked." });
    });
  });

  describe("listUpcomingAppointments", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
  
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });
  
    it("should retrieve upcoming appointments successfully", async () => {
      const ownerId = uuidv4();
  
      prismaMock.calendarOwner.findUnique.mockResolvedValue({
        id: ownerId,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date(),
      });
  
      prismaMock.appointments.findMany.mockResolvedValue([
        {
          id: uuidv4(),
          ownerId,
          inviteeName: "Jane Doe",
          inviteeEmail: "jane.doe@example.com",
          date: new Date("2024-12-22"),
          timeSlot: "10:00-11:00",
          createdAt: new Date(),
          owner: {
            id: ownerId,
            name: "John Doe",
            email: "john.doe@example.com",
          } as any,
        } as any,
      ]);
  
      mockRequest.query = { ownerId };
  
      await listUpcomingAppointments(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        appointments: [
          {
            id: expect.any(String),
            date: "2024-12-22",
            timeSlot: "10:00-11:00",
            inviteeName: "Jane Doe",
            inviteeEmail: "jane.doe@example.com",
            owner: {
              id: ownerId,
              name: "John Doe",
              email: "john.doe@example.com",
            } as any,
          } as any,
        ],
      });
    });
  
    it("should return 404 if Calendar Owner is not found", async () => {
      prismaMock.calendarOwner.findUnique.mockResolvedValue(null);
  
      mockRequest.query = { ownerId: uuidv4() };
  
      await listUpcomingAppointments(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );
  
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Calendar Owner not found.",
      });
    });
  
    it("should handle no upcoming appointments", async () => {
      const ownerId = uuidv4();
  
      prismaMock.calendarOwner.findUnique.mockResolvedValue({
        id: ownerId,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date(),
      });
  
      prismaMock.appointments.findMany.mockResolvedValue([]);
  
      mockRequest.query = { ownerId };
  
      await listUpcomingAppointments(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No upcoming appointments found.",
        appointments: [],
      });
    });
  
    it("should handle internal errors gracefully", async () => {
      const ownerId = uuidv4();
  
      prismaMock.calendarOwner.findUnique.mockRejectedValue(new Error("Database error"));
  
      mockRequest.query = { ownerId };
  
      await listUpcomingAppointments(
        mockRequest as Request,
        mockResponse as Response,
        prismaMock as unknown as PrismaClient
      );
  
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error retrieving upcoming appointments.",
        error: expect.any(Object),
      });
    });
  });
});
