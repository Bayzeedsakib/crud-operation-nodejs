import { json } from "stream/consumers";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./Routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request: ", req);
    // console.log(req.url);
    // console.log(req.method);

    routeHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("Surver is running successfully");
});
