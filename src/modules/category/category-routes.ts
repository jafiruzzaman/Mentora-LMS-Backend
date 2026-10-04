/**
 * @file category-routes.ts
 * @description category routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `category created successfully`,
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `get all categories successfully`,
  });
});
router.get("/:id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `get category successfully`,
  });
});
router.patch("/:id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `category updated successfully`,
  });
});
router.delete("/:id", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: `category deleted successfully`,
  });
});

export { router as categoryRoutes };
