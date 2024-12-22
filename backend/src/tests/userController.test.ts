import { registerUser } from "../controllers/userController";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid"; // Use to simulate UUIDs

const prismaMock = mockDeep<PrismaClient>();

describe("Register User API", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should register a new user and return the user details", async () => {
    const mockId = uuidv4(); // Generate a mock UUID for the test
    const mockUser = {
      id: mockId,
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date(),
    };

    // Mock Prisma's create function
    prismaMock.calendarOwner.create.mockResolvedValue(mockUser);

    mockRequest.body = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    await registerUser(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.calendarOwner.create).toHaveBeenCalledWith({
      data: { name: "John Doe", email: "john.doe@example.com" },
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      user: {
        id: mockId,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: expect.any(Date),
      },
    });
  });

  it("should handle errors when the email already exists", async () => {
    // Mock Prisma's create function to throw an error
    prismaMock.calendarOwner.create.mockRejectedValue(new Error("Unique constraint failed"));

    mockRequest.body = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    await registerUser(
      mockRequest as Request,
      mockResponse as Response,
      prismaMock as unknown as PrismaClient
    );

    // Assertions
    expect(prismaMock.calendarOwner.create).toHaveBeenCalledWith({
      data: { name: "John Doe", email: "john.doe@example.com" },
    });

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error registering user",
      error: expect.any(Error),
    });
  });
});
