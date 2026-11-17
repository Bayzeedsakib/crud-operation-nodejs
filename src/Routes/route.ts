import type { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import productController from "../Controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url; // "/" , /product, /course
  const method = req.method; // POST, PUT, Patch

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });

    res.end(JSON.stringify({ message: "This is root route" }));
  } else if (url?.startsWith("/product")) {
    //GET, POST, PUT
    productController(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });

    res.end(JSON.stringify({ message: "This is not" }));
  }
};

export default routeHandler;
