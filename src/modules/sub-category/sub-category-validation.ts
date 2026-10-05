/**
 * @file sub-category-validation.ts
 * @description sub-category validation
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October 2026
 */

import z from "zod";

const subCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Sub-category name must be at least 3 characters long.",
    })
    .max(100, {
      message: "Sub-category name must not exceed 100 characters.",
    }),
});

const categoryIdParamsSchema = z.object({
  categoryId: z.uuid({
    message: "Invalid category ID.",
  }),
});

const subCategoryIdParamsSchema = z.object({
  id: z.uuid({
    message: "Invalid sub-category ID.",
  }),
});

type subCategoryDTO = z.infer<typeof subCategorySchema>;

type categoryIdParamsDTO = z.infer<typeof categoryIdParamsSchema>;

type subCategoryIdParamsDTO = z.infer<typeof subCategoryIdParamsSchema>;

export {
  subCategorySchema,
  categoryIdParamsSchema,
  subCategoryIdParamsSchema,
  type subCategoryDTO,
  type categoryIdParamsDTO,
  type subCategoryIdParamsDTO,
};
