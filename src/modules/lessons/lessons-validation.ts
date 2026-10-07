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

const lessonParamsValidationSchema = z.object({
  lesson_id: z.uuid().min(8).describe("lesson id is required"),
});
const updateLessonValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .describe("lesson title is required")
    .optional(),
  description: z.string().trim().optional(),
  duration: z.coerce.number().positive().optional(),
});
type updateLessonInput = z.infer<typeof updateLessonValidationSchema>;

export {
  type updateLessonInput,
  lessonParamsValidationSchema,
  lessonValidationSchema,
  updateLessonValidationSchema,
};
