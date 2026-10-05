/**
 * @file course-validation.ts
 * @description course API validation
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October
 */

import z from "zod";

const createCourseSchema = z.object({
  title: z.string().min(3).max(100).describe("course title"),
  description: z.string().min(10).max(1000).describe("course description"),
  category_id: z.uuid().describe("category id is required"),
  sub_category_id: z.uuid().describe("sub-category id is required"),
  discount: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe("course discount percentage"),
  thumbnail: z.url().optional().describe("course thumbnail url"),
  price: z.int().positive().describe("course price is required"),
  discount_price: z
    .int()
    .positive()
    .optional()
    .describe("course discount price"),
  level: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .describe("course level"),
  status: z
    .enum(["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED", "BANNED", "REJECTED"])
    .optional()
    .describe("course status is required"),
});

const courseParamsSchema = z.object({
  id: z.uuid().describe("course id is required"),
});

type createCourseDTO = z.infer<typeof createCourseSchema>;
type courseParamsDTO = z.infer<typeof courseParamsSchema>;

export {
  type createCourseDTO,
  type courseParamsDTO,
  createCourseSchema,
  courseParamsSchema,
};
