/**
 * @file order-validation
 * @description order validation using zod
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { z } from "zod";

const orderValidationSchema = z.object({
  order_items: z.array(
    z.object({
      course_id: z.uuid().trim().min(4).describe("course id is required"),
    })
  ),
});

const orderParamsSchema = z.object({
  order_id: z.uuid().min(4).describe("order id is required"),
});

export { orderValidationSchema, orderParamsSchema };
