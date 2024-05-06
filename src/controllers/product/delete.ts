import { Request, Response, NextFunction } from "express";
import { RequestError } from "../../lib/error/request-error.js";
import { deleteOne, updateOne } from "../../lib/db/queries/product.js";
import { isValidObjectId } from "../../lib/utils/validate.js";

export const deleteProd = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;

    if (!isValidObjectId(id))
      return next(
        new RequestError({ code: 400, message: "Product is invalid" }),
      );

    const result = await deleteOne(id);

    if (!result)
      return next(
        new RequestError({
          code: 500,
          message: "Error while deleting product",
        }),
      );

    return res
      .status(201)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
