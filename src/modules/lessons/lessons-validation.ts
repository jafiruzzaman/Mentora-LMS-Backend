/**
 * @file lessons-validation.ts
 * @description lessons validation using zod
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { z } from "zod";

const lessonValidationSchema = z.object({
  title: z.string().trim().min(3).describe("lesson title is required"),
  description: z.string().trim(),
  duration: z.coerce.number().positive(),
});
