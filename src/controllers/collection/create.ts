import { Request, Response, NextFunction } from "express";
import { RequestError } from "../../lib/error/request-error.js";
import { insertOne } from "../../lib/db/queries/collection.js";

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

    const collectionRes = await insertOne(body);

    if (!collectionRes)
      return next(
        new RequestError({
          code: 500,
          message: "Error while creating collection",
        }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Collection created successfully" });
  } catch (error) {
    next(error);
  }
};
