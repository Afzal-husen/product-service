import { ObjectId } from "mongodb";
import { RequestBody } from "../../../types/brand.js";
import { product } from "../collections/index.js";
import { Request } from "express";

interface DocumentAggregation {
  [key: string]: any;
}

interface countParams {
  [key: string]: string;
}

export const insertOne = async (body: RequestBody) => {
  const response = await product.insertOne(body);

  const brandId = response.insertedId;
  const insertedBrand = await product.findOne({ _id: brandId });

  return insertedBrand;
};

export const findAll = async (
  pipeline: DocumentAggregation[],
  id: countParams,
) => {
  const [products, count] = await Promise.all([
    product.aggregate(pipeline).toArray(),
    product.countDocuments(id),
  ]);

  return { products, count };
};

export const findOne = async (id: string) => {
  return await product.findOne({ _id: new ObjectId(id) });
};

export const updateOne = async (id: string, body: Request) => {
  await product.updateOne({ _id: new ObjectId(id) }, { $set: { ...body } });
  const updatedProduct = await product.findOne({ _id: new ObjectId(id) });
  return updatedProduct;
};

export const deleteOne = async (id: string) => {
  const result = await product.deleteOne({ _id: new ObjectId(id) });
  return result;
};
