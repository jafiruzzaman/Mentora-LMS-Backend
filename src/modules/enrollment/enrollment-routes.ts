/**
 * @file enrollment-routes.ts
 * @description enrollment-routes.ts
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 7th October 2026
 */

import { Router, type Request, type Response } from "express";

const router = Router();
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "enrolled successfully",
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "get all enrolled courses",
  });
});

router.get("/course/:course_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "get enrolled courses",
  });
});

router.get("/:enrollment_id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "fetch enrolled details",
  });
});


export { router as enrollmentRoutes };
