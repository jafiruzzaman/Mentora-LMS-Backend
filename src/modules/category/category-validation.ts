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
    .min(3, { message: "category name have to at-least characters long" }),
});

type categoryDTO = z.infer<typeof categorySchema>;
export { categorySchema, type categoryDTO };
