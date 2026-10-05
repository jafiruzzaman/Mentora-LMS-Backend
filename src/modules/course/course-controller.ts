/**
 * @file course-controller.ts
 * @description course API controllers
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 5th October
 */

import { apiResponse } from "@/shared/lib/api-response";
import type { Request, Response } from "express";

const createCourse = async (req: Request, res: Response) => {
  const instructor = req.user;
  const parsedData = 
  apiResponse({
    res,
    statusCode: 201,
    message: "course created successfully",
  });
};

const getAllCourses = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "fetch all courses",
  });
};

const getCourse = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "fetch course details successfully",
  });
};

const updateCourse = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 200,
    message: "course updated successfully",
  });
};

const deleteCourse = async (req: Request, res: Response) => {
  apiResponse({
    res,
    statusCode: 204,
    message: "course deleted successfully",
  });
};

export const courseController = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
