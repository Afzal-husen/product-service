import { MongoClient } from "mongodb";

const DB_URI = "mongodb://localhost:27017/product-service";
const mongodbClient = new MongoClient(DB_URI);

const dbName = "product-service";
export const db = mongodbClient.db(dbName);

export const connectDb = async () => {
  try {
    await mongodbClient.connect();
    console.log("connected to DB");
  } catch (error) {
    mongodbClient.close();
    console.log(error);
  }
};
