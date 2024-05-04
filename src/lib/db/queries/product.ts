import { ObjectId } from "mongodb";
import { RequestBody } from "../../../types/brand.js";
import { product } from "../collections/index.js";

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
