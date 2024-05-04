import { db } from "../connectdb.js";

export const product = db.collection("product");
export const brand = db.collection("brand");
export const collection = db.collection("collection");
export const category = db.collection("category");
