/**
 * @file order-routes.ts
 * @description order API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 8th October
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `order created successfully`,
    data: {},
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `fetch all orders successfully`,
    data: {},
  });
});
router.get("/:order_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `fetch order successfully`,
    data: {},
  });
});

export { router as orderRoutes };
