import { Request, Response, NextFunction } from "express";
import { RequestError } from "../../lib/error/request-error.js";
import { insertOne } from "../../lib/db/queries/product.js";
import { isValidObjectId } from "../../lib/utils/validate.js";

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

    const ObjectIds = [
      { name: "Collection", id: body?.collectionId },
      { name: "Category", id: body?.categoryId },
      { name: "Brand", id: body?.brandId },
    ];

    for (const obj of ObjectIds) {
      const isValid = isValidObjectId(obj.id);
      if (!isValid)
        return next(
          new RequestError({
            code: 400,
            message: `Please select a valid ${obj.name}`,
          }),
        );
    }

    const productRes = await insertOne(body);

    if (!productRes)
      return next(
        new RequestError({
          code: 500,
          message: "Error while creating product",
        }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};
