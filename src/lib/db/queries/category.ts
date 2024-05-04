import { RequestBody } from "../../../types/brand.js";
import { category } from "../collections/index.js";

export const insertOne = async (body: RequestBody) => {
  const response = await category.insertOne(body);

  const categoryId = response.insertedId;
  const insertedCategory = await category.findOne({ _id: categoryId });

  return insertedCategory;
};
