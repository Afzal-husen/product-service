import { Request, Response, NextFunction } from "express";
import { insertOne } from "../../lib/db/queries/brand.js";
import { RequestError } from "../../lib/error/request-error.js";

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

    const brandRes = await insertOne(body);

    if (!brandRes)
      return next(
        new RequestError({ code: 500, message: "Error while creating brand" }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Brand created successfully" });
  } catch (error) {
    next(error);
  }
};
