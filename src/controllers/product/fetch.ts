import { Request, Response, NextFunction } from "express";
import { findAll, findOne } from "../../lib/db/queries/product.js";
import { RequestError } from "../../lib/error/request-error.js";
import { ObjectId } from "mongodb";

// get all products
export const allProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await findAll(
      [
        {
          $lookup: {
            from: "brand",
            localField: "brandId",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $lookup: {
            from: "collection",
            localField: "collectionId",
            foreignField: "_id",
            as: "collection",
          },
        },
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$brand",
            preserveNullAndEmptyArrays: true, // Preserve documents even if there's no match
          },
        },
        {
          $unwind: {
            path: "$collection",
            preserveNullAndEmptyArrays: true, // Preserve documents even if there's no match
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true, // Preserve documents even if there's no match
          },
        },
      ],
      {},
    );
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getproductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const product = await findOne(id);

    if (!product)
      return next(new RequestError({ code: 404, message: "No product found" }));
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getproductsByCollection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const products = await findAll(
      [
        {
          $match: {
            collectionId: id,
          },
        },
      ],
      { collectionId: id },
    );

    if (!products)
      return next(new RequestError({ code: 404, message: "No product found" }));
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getproductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { products, count } = await findAll(
      [
        {
          $match: {
            categoryId: id,
          },
        },
      ],

      { categoryId: id },
    );

    if (!products)
      return next(new RequestError({ code: 404, message: "No product found" }));
    return res.status(200).json({ products, count });
  } catch (error) {
    next(error);
  }
};

export const getproductsByBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { products, count } = await findAll(
      [
        {
          $match: {
            brandId: id,
          },
        },
      ],

      { brandId: id },
    );

    if (!products)
      return next(new RequestError({ code: 404, message: "No product found" }));
    return res.status(200).json({ products, count });
  } catch (error) {
    next(error);
  }
};
