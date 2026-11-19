import type { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { productService } from "../Services/product.service";
import type { IProduct } from "../Types/product";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  // console.log(url) -> /products/1

  const urlParams = url?.split("/");
  // console.log(urlParams) -> [ '', 'products', '1' ]

  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // console.log(id);

  //Get All Products
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
  } else if (method === "GET" && id != null) {
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "Products are retireve", data: product }),
    );
  }
};

export default productController;
