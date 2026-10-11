/**
 * @file review-validation.ts
 * @description review body validation using zod
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 11th October 2026
 */

import { z } from "zod";

const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .positive()
    .min(1)
    .max(5)
    .describe("review rating is required"),
  message: z.string().min(5).max(2000).describe("review message is required"),
});

type ReviewDTO = z.infer<typeof reviewSchema>;

export { type ReviewDTO, reviewSchema };
