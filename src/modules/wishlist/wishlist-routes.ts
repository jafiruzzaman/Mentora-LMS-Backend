/**
 * @file wishlist-routes.ts
 * @description wishlist API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 9th October 2026
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/:course_id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "add to wishlist",
    data: {},
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "fetch all wishlist",
    data: {},
  });
});
router.delete("/:course_id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "remove from wishlist",
    data: {},
  });
});

export { router as wishlistRoutes };
