import { searchAvailableSlots } from "../controllers/slotsController";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const prismaMock = mockDeep<PrismaClient>();

describe("Search Available Slots API", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return available slots for a given date and owner", async () => {
    const ownerId = uuidv4(); // Mock UUID for ownerId
    const availabilityId = uuidv4();
    const appointmentId = uuidv4();

    // Mock Prisma's availability and appointments queries
    prismaMock.availability.findMany.mockResolvedValue([
      {
        id: availabilityId,
        ownerId,
        dayOfWeek: "Monday",
        startTime: "10:00",
        endTime: "13:00",
        createdAt: new Date(),
      },
    ]);
    prismaMock.appointments.findMany.mockResolvedValue([
      {
        id: appointmentId,
        ownerId,
        date: new Date("2024-12-22"),
        timeSlot: "10:00-11:00",
        createdAt: new Date(),
        inviteeName: "John Doe",
        inviteeEmail: "john.doe@example.com",
      },
    ]);

    mockRequest.body = {
      ownerId,
      date: "2024-12-22",
    };

    await searchAvailableSlots(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.availability.findMany).toHaveBeenCalledWith({
      where: { ownerId, dayOfWeek: "Sunday" },
    });
    expect(prismaMock.appointments.findMany).toHaveBeenCalledWith({
      where: { ownerId, date: new Date("2024-12-22") },
      select: { timeSlot: true },
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      availableSlots: [
        { startTime: "11:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "13:00" },
      ],
    });
  });

  it("should return a 404 error if no availability is found", async () => {
    prismaMock.availability.findMany.mockResolvedValue([]);

    mockRequest.body = {
      ownerId: uuidv4(),
      date: "2024-12-22",
    };

    await searchAvailableSlots(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "No availability found for this date.",
    });
  });

  it("should handle validation errors", async () => {
    mockRequest.body = {
      ownerId: "invalid_uuid",
      date: "invalid_date",
    };

    await searchAvailableSlots(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Validation errors",
      errors: expect.any(Array),
    });
  });
});
