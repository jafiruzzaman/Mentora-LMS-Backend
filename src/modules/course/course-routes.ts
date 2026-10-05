/**
 * @file course-routes.ts
 * @description course API routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "course created successfully",
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "get all courses successfully",
  });
});
router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "fetch course details successfully",
  });
});
router.patch("/:id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "course updated successfully",
  });
});
router.delete("/:id", (req: Request, res: Response) => {
  res.status(204).json({
    success: true,
    message: "course deleted successfully",
  });
});

export { router as courseRoutes };
