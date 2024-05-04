import express from "express";
import { create } from "../controllers/product/create.js";
import {
  allProducts,
  getproductsByCollection,
  getproductById,
  getproductsByCategory,
  getproductsByBrand,
} from "../controllers/product/fetch.js";

const router = express.Router();

// create product
router.post("/create", create);

// get all product
router.get("/all", allProducts);

// get product by id
router.get("/:id", getproductById);

// get products by collection id
router.get("/collection/:id", getproductsByCollection);

// get products by category id
router.get("/category/:id", getproductsByCategory);

// get products by brand id
router.get("/brand/:id", getproductsByBrand);

export default router;
