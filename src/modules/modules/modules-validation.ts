/**
 * @file modules-validation.ts
 * @description modules validation using zod
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October 2026
 */

import { z } from "zod";

const courseParams = z.object({
  course_id: z.uuid().min(4, { message: "course id required" }),
});
const moduleParams = z.object({
  module_id: z.uuid().min(4, { message: "course id required" }),
});

const moduleSchema = z.object({
  title: z.string().min(4, { message: "title required" }),
  description: z.string().min(4, { message: "description required" }),
  position: z.coerce.number().positive(),
});

type moduleInput = z.infer<typeof moduleSchema>;

export { type moduleInput, moduleSchema, moduleParams, courseParams };
