/**
 * @file cart-routes.ts
 * @description cart API routes
 * @author Mohammad-Jafiruzzaman
 * @date 9th October 2026
 * @license Apache-2.0
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/:course_id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `added to cart successfully`,
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `retrieve cart successfully`,
  });
});

router.delete("/:course_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `remove from cart successfully`,
  });
});
router.delete("/clear", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `cart clear successfully`,
  });
});

export { router as cartRoutes };
