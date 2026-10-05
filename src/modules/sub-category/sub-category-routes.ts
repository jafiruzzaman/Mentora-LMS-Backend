/**
 * @file sub-category-routes.ts
 * @description sub-category api routes
 * @author Mohammad-Jafiruzzaman
 * @date 5th October 2026
 */

import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "sub-category crated successfully",
    data: {},
  });
});
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "get all sub-categories successfully",
    data: {},
  });
});
router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "get sub-category successfully",
    data: {},
  });
});
router.patch("/:id", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "sub-category updated successfully",
    data: {},
  });
});
router.delete("/:id", (req: Request, res: Response) => {
  res.status(204).json({
    success: true,
    message: "sub-category deleted successfully",
    data: {},
  });
});

export { router as subCategoryRoutes };
