import fs from "fs";
import path from "node:path";
import type { IProduct } from "../Types/product";

const filePath = path.join(process.cwd(), "./src/Database/db.json");

export const productService = () => {
  console.log({ filePath });

  const result = fs.readFileSync(filePath, "utf-8");
  //   console.log(result.toString());
  //   console.log(result);

  return JSON.parse(result);
};

export const createProduct = (payload: IProduct[]) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
