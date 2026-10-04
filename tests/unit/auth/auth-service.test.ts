/**
 * @file auth-service.test.ts
 * @description unit tests for auth service
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 3rd October
 */

// import required dependencies
import { describe, it, vi, beforeEach, expect } from "vitest";

import { userRepository } from "../../../src/modules/user/user.repository";
import { authService } from "../../../src/modules/auth/auth-service";
import { hashPassword } from "../../../src/shared/lib/password";

/**
 * Mock password hashing.
 *
 * We don't want to execute the real hashing algorithm
 * in every auth service unit test.
 */
vi.mock("../../../src/shared/lib/password", () => ({
  hashPassword: vi.fn(),
}));

/**
 * Mock user repository.
 *
 * The auth service depends on the repository for database operations.
 *
 * We mock it because this is a UNIT test.
 *
 */
vi.mock("../../../src/modules/user/user.repository", () => ({
  userRepository: {
    findByEmail: vi.fn(),
    findByUserName: vi.fn(),
    create: vi.fn(),
  },
}));

/* ================================================================= */
// Test Data
/* ================================================================= */
const testData = {
  first_name: "Mohammad",
  last_name: "jafiruzzaman",
  user_name: "jafiruzzaman",
  email: "jafiruzzaman@example.com",
  password: "Password123!",
};

const createdUser = {
  id: "user-1",
  first_name: "Mohammad",
  last_name: "jafiruzzaman",
  user_name: "jafiruzzaman",
  email: "jafiruzzaman@example.com",
  password: "hashed-password",
};

/* ================================================================= */
// Actual Test
/* ================================================================= */
describe("auth service unit test", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should create a new user successfully", async () => {
    // first implement the business logic flow
    vi.mocked(userRepository.findByEmail).mockResolvedValue(undefined);
    vi.mocked(userRepository.findByUserName).mockResolvedValue(undefined);
    vi.mocked(hashPassword).mockResolvedValue("hashed-password"); // should i matched with created user data
    vi.mocked(userRepository.create).mockResolvedValue(createdUser);

    // call unit test
    const result = await authService.signUp(testData);

    // match result
    expect(result).toEqual(createdUser);
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(testData.email);
    expect(userRepository.findByUserName).toHaveBeenCalledTimes(1);
    expect(userRepository.findByUserName).toHaveBeenCalledWith(
      testData.user_name
    );
    expect(hashPassword).toHaveBeenCalledTimes(1);
    expect(hashPassword).toHaveBeenCalledWith(testData.password);

    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith({
      first_name: testData.first_name,
      last_name: testData.last_name,
      user_name: testData.user_name,
      email: testData.email,
      password: "hashed-password",
    });
  });
  it("it should reject sign-up when email already exist", async () => {
    // arrange
    vi.mocked(userRepository.findByEmail).mockResolvedValue({
      id: "existing-user",
      email: testData.email,
    });
    await expect(authService.signUp(testData)).rejects.toMatchObject({
      statusCode: 409,
      message: "Email already exists.",
    });

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByUserName).not.toHaveBeenCalled();
    expect(hashPassword).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it("should reject sign-up when user-name already exist", async () => {
    // arrange
    vi.mocked(userRepository.findByEmail).mockResolvedValue(undefined);
    vi.mocked(userRepository.findByUserName).mockResolvedValue({
      id: "existing-user-name",
      user_name: testData.user_name,
    });

    // act
    await expect(authService.signUp(testData)).rejects.toMatchObject({
      statusCode: 409,
      message: "Username already exists.",
    });
    /*
     * Email check should happen first.
     */

    expect(userRepository.findByEmail).toHaveBeenCalledWith(testData.email);

    /*
     * Username check should then happen.
     */

    expect(userRepository.findByUserName).toHaveBeenCalledWith(
      testData.user_name
    );

    /*
     * User creation must stop here.
     */

    expect(hashPassword).not.toHaveBeenCalled();

    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
