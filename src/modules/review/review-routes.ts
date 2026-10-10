/**
 * @file review-routes.ts
 * @description review API Routes
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 10th October
 */

import { Router, type Request, type Response } from "express";
const router = Router();

router.post("/course/:course_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "review posted successfully.",
    data: {},
  });
});
router.get("/course/:course_id/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "retrieved all the reviews successfully.",
    data: {},
  });
});
router.get("/:review_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "fetch review successfully.",
    data: {},
  });
});
router.patch("/:review_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "review updated successfully.",
    data: {},
  });
});
router.delete("/:review_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "review deleted successfully.",
    data: {},
  });
});

export { router as reviewRoutes };
