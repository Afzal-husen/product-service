import { ObjectId } from "mongodb";

export const isValidObjectId = (id: string) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};
