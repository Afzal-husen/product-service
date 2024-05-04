import { RequestBody } from "../../../types/brand.js";
import { collection } from "../collections/index.js";

export const insertOne = async (body: RequestBody) => {
  const response = await collection.insertOne(body);

  const collectionId = response.insertedId;
  const insertedCollection = await collection.findOne({ _id: collectionId });

  return insertedCollection;
};
