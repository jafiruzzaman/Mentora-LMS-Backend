/**
 * @file auth-controller.test.ts
 * @description unit tests for auth controller
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

import type { Request, Response } from "express";
import { describe, vi, it, beforeEach, expect } from "vitest";

import { authService } from "../../../src/modules/auth/auth-service";
import { authController } from "../../../src/modules/auth/auth-controller";
import { apiResponse } from "../../../src/shared/lib/api-response";

// prepare mock data
vi.mock("../../../src/modules/auth/auth-service", () => ({
  authService: {
    signUp: vi.fn(),
  },
}));

vi.mock("../../../src/shared/lib/api-response", () => ({
  apiResponse: vi.fn(),
}));

// test data
const signUpData = {
  first_name: "Mohammad",
  last_name: "jafiruzzaman",
  user_name: "jafiruzzaman",
  email: "jafiruzzaman@example.com",
  password: "password123!",
};

const createdUserData = {
  first_name: "Mohammad",
  last_name: "jafiruzzaman",
  user_name: "jafiruzzaman",
  email: "jafiruzzaman@example.com",
};

// Test Suite
describe("auth controller unit testing", () => {
  // clean mock calls
  beforeEach(() => {
    vi.clearAllMocks();
  });
  // sign for valid data
  it("should create a new user", async () => {
    // Arrange =>
    const req = {
      body: signUpData,
    } as Request;

    const res = {} as Response;
    vi.mocked(authService.signUp).mockResolvedValue(createdUserData);

    // Act =>
    await authController.signUp(req, res);

    // Assert => compare
    expect(authService.signUp).toHaveBeenCalledWith(signUpData);

    expect(apiResponse).toHaveBeenCalledWith({
      res,
      statusCode: 201,
      message: "sign-up successfully",
      data: createdUserData,
    });
  });
  // what if data is not valid
  it("should reject when data is invalid", async () => {
    // arrange
    // create invalid data
    const invalidData = {
      ...signUpData,
      email: "invalid-email",
    };
    // create request
    const req = {
      body: invalidData,
    } as Request;
    // create response
    const res = {} as Response;
    // create next
    const next = vi.fn();

    // act
    // call controller
    await authController.signUp(req, res, next);

    // assert
    // next should be called
    expect(next).toHaveBeenCalled();
    // service should not be called
    expect(next).toHaveBeenCalledWith(expect.any(Error));

    expect(authService.signUp).not.toHaveBeenCalled();
  });
  it("should pass service error to next middlewares", async () => {
    // Arrange
    const req = {
      body: signUpData,
    } as Request;

    const res = {} as Response;
    const next = vi.fn();
    const serviceError = new Error("failed to create user");
    vi.mocked(authService.signUp).mockRejectedValue(serviceError);

    // Act
    await authController.signUp(req, res, next);

    // Assert
    await expect(authService.signUp).toHaveBeenCalledWith(signUpData);

    expect(next).toHaveBeenCalledWith(serviceError);
    expect(apiResponse).not.toHaveBeenCalled();
  });
});
