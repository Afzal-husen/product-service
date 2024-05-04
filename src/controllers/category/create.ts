import { Request, Response, NextFunction } from "express";
import { RequestError } from "../../lib/error/request-error.js";
import { insertOne } from "../../lib/db/queries/category.js";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return next(
        new RequestError({ code: 400, message: "All fields are required" }),
      );
    }

    const categoryRes = await insertOne(body);

    if (!categoryRes)
      return next(
        new RequestError({
          code: 500,
          message: "Error while creating category",
        }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};
