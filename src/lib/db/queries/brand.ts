import { RequestBody } from "../../../types/brand.js";
import { brand } from "../collections/index.js";

export const insertOne = async (body: RequestBody) => {
  const response = await brand.insertOne(body);

  const brandId = response.insertedId;
  const insertedBrand = await brand.findOne({ _id: brandId });

  return insertedBrand;
};
