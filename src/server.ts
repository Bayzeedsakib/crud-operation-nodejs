import { json } from "stream/consumers";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./Routes/route";
import config from "./Config/Index";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request: ", req);
    // console.log(req.url);
    // console.log(req.method);

    routeHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`Surver is running on the port ${config.port}`);
});
