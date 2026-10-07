/**
 * @file enrollment-validation.ts
 * @description enrollment validation using zod
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October
 */

import { z } from "zod";

const enrollmentParamsSchema = z.object({
  id: z.uuid().min(4).describe("course id is required"),
});

export { enrollmentParamsSchema };
