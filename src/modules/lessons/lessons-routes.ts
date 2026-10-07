/**
 * @file lessons-routes.ts
 * @description Lesson API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/modules/:module_id/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "lesson created successfully",
  });
});
router.get("/modules/:module_id/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "fetch lessons successfully",
  });
});
router.get("/:lesson_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "fetch lesson successfully",
  });
});
router.patch("/:lesson_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "lesson updated successfully",
  });
});
router.delete("/:lesson_id", (req: Request, res: Response) => {
  res.status(204).send();
});

export { router as lessonRoutes };
