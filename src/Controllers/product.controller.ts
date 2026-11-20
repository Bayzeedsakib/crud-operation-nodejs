import type { IncomingMessage, ServerResponse } from "http";
import { url } from "inspector";
import { createProduct, productService } from "../Services/product.service";
import type { IProduct } from "../Types/product";
import { bodyParser } from "../Utils/bodyParse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
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
  } else if (method === "POST" && url === "/products") {
    //"abcd" = "a" , "b" , "c" = "abc"

    const body = await bodyParser(req);
    // console.log(body);

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    // console.log(newProduct);

    const products = productService(); // [{} , {}]

    products.push(newProduct); // [{},{},{new}]

    createProduct(products);

    res.writeHead(201, { "Content-Type": "application.json" });
    res.end(
      JSON.stringify({
        message: "Prodcut created succefully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id != null) {
    const body = await bodyParser(req);
    const product = productService();

    const index = product.findIndex((p: IProduct) => p.id === id);

    // console.log(index);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }

    product[index] = { id: product[index].id, ...body };

    createProduct(product);

    res.writeHead(200, { "Content-Type": "application-json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully",
        data: product[index],
      }),
    );
  }
};

export default productController;
