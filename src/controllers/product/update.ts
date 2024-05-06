import { Request, Response, NextFunction } from "express";
import { RequestError } from "../../lib/error/request-error.js";
import { updateOne } from "../../lib/db/queries/product.js";
import { isValidObjectId } from "../../lib/utils/validate.js";

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const body = req.body;

    if (!isValidObjectId(id))
      return next(
        new RequestError({ code: 400, message: "Product is invalid" }),
      );

    const updatedProduct = await updateOne(id, body);

    if (!updatedProduct)
      return next(
        new RequestError({
          code: 500,
          message: "Error while updating product",
        }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
