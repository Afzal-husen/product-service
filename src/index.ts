import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db/connectdb.js";
import { errorHandler } from "./middleware/error-handler.js";
import brandRouter from "./routes/brand.js";
import categoryRouter from "./routes/category.js";
import collectionRouter from "./routes/collection.js";
import productRouter from "./routes/product.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/brand", brandRouter);
app.use("/api/category", categoryRouter);
app.use("/api/collection", collectionRouter);
app.use("/api/product", productRouter);

app.use(errorHandler);

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => console.log(`Server running at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
