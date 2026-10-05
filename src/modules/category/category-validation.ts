/**
 * @file category-validation.ts
 * @description category validation
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import z from "zod";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Category name must be at least 3 characters long.",
    })
    .max(100, {
      message: "Category name must not exceed 100 characters.",
    }),
});

const categoryIdSchema = z.uuid({
  message: "Invalid category ID.",
});
type categoryParamsDTO = z.infer<typeof categoryIdSchema>;

type CategoryDTO = z.infer<typeof categorySchema>;

export {
  categorySchema,
  categoryIdSchema,
  type CategoryDTO,
  type categoryParamsDTO,
};
