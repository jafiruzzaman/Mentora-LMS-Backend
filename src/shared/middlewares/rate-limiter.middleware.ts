/**
 * @file rate-limiter.middleware.ts
 * @description rate limiter middleware
 * @author Mohammad-Jafiruzzaman
 * @date 4th October 2026
 */

import ratelimit from "express-rate-limit";

const createRateLimiter = ({
  limit,
  message,
}: {
  limit: number;
  message: string;
}) => {
  return ratelimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      success: false,
      message,
    },
  });
};
export const signInRateLimiter = createRateLimiter({
  limit: 10,
  message: "Too many login attempts. Please try again later.",
});

export const signUpRateLimiter = createRateLimiter({
  limit: 10,
  message: "Too many registration attempts. Please try again later.",
});

export const forgotPasswordRateLimiter = createRateLimiter({
  limit: 5,
  message: "Too many password reset requests. Please try again later.",
});

export const resendEmailRateLimiter = createRateLimiter({
  limit: 3,
  message: "Too many verification email requests. Please try again later.",
});

export const sendEmailRateLimiter = createRateLimiter({
  limit: 5,
  message: "Too many verification email requests. Please try again later.",
});
