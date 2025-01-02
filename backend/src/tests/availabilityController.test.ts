import { setAvailability } from "../controllers/availabilityController";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const prismaMock = mockDeep<PrismaClient>();

describe("Set Availability API", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should successfully set availability", async () => {
    const ownerId = uuidv4(); // Mock UUID for owner
    const availabilityMock = [
      { dayOfWeek: "Monday", startTime: "10:00", endTime: "14:00" },
      { dayOfWeek: "Tuesday", startTime: "10:00", endTime: "14:00" },
    ];

    // Mock finding the owner
    prismaMock.calendarOwner.findUnique.mockResolvedValue({
      id: ownerId,
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date(),
    });

    // Mock creating availability records
    prismaMock.availability.createMany.mockResolvedValue({ count: availabilityMock.length });

    mockRequest.body = { ownerId, availability: availabilityMock };

    await setAvailability(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.calendarOwner.findUnique).toHaveBeenCalledWith({
      where: { id: ownerId },
    });
    expect(prismaMock.availability.createMany).toHaveBeenCalledWith({
      data: availabilityMock.map((slot) => ({
        ownerId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Availability setup successfully",
      records: { count: availabilityMock.length },
    });
  });

  it("should return 404 if the Calendar Owner does not exist", async () => {
    const ownerId = uuidv4();

    // Mock Calendar Owner not found
    prismaMock.calendarOwner.findUnique.mockResolvedValue(null);

    mockRequest.body = {
      ownerId,
      availability: [
        { dayOfWeek: "Monday", startTime: "10:00", endTime: "14:00" },
      ],
    };

    await setAvailability(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.calendarOwner.findUnique).toHaveBeenCalledWith({
      where: { id: ownerId },
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Calendar Owner not found",
    });
  });

  it("should handle database errors gracefully", async () => {
    const ownerId = uuidv4();
    const availabilityMock = [
      { dayOfWeek: "Monday", startTime: "10:00", endTime: "14:00" },
    ];

    // Mock finding the owner
    prismaMock.calendarOwner.findUnique.mockResolvedValue({
      id: ownerId,
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date(),
    });

    // Mock a database error during createMany
    prismaMock.availability.createMany.mockRejectedValue(new Error("Database error"));

    mockRequest.body = { ownerId, availability: availabilityMock };

    await setAvailability(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.availability.createMany).toHaveBeenCalledWith({
      data: availabilityMock.map((slot) => ({
        ownerId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error setting availability",
      error: expect.anything(),
    });
  });
});
