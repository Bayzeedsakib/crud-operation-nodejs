import type { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { productService } from "../Services/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    // const products = [
    //   {
    //     id: 1,
    //     name: "Product-1",
    //     price: 30,
    //   },

    //   {
    //     id: 2,
    //     name: "Product-2",
    //     price: 30,
    //   },
    // ];

    const products = productService();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "Products are retireved", data: products }),
    );
  }
};

export default productController;
