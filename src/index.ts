import express from "express";
import youtube from "./routes/youtube";
import cors from "cors";
import { Request } from "express";
import {
  errorHandler,
  ResponseSuccessJson,
  toExpressHandler,
} from "./utils/express.utils";
import * as socketio from "socket.io";
import * as http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const port = 3000;
export let statusServer = "await";

export const setStatusServer = (newStatus: "downloading" | "await") =>
  (statusServer = newStatus);
export let socketConnection: socketio.Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> | null = null;

let connectionSocket: Record<string, string> = {};

const app = express();
const server = http.createServer(app);
app.use(cors());
app.options("*", cors() as any);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//  let connections: Record<string, string> = {}
io.on("connection", (socket) => {
  socketConnection = socket;
  socket.on("conn", (message) => {
    if (
      Object.values(connectionSocket).some(
        (connection) => connection === message.id
      )
    ) {
      socketConnection?.emit("disconnectClient");
    } else {
      connectionSocket[socket.id] = message.id;
    }
  });

  socket.on("disconnect", () => {
    delete connectionSocket[socket.id];
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/youtube", youtube);
app.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

class TestController {
  static testEndpoint = async (req: Request) => {
    if (req.query.fail) throw new Error("simulated error");
    return ResponseSuccessJson({ message: "ok" });
  };
}

app.get(
  "/hello",
  // ----
  (request, response) => {
    response.json({ message: "ok" });
  }
);

app.get(
  "/test",
  // ----
  toExpressHandler(TestController.testEndpoint, TestController)
);
app.use(errorHandler);

server.listen(port, () => console.log("Server is running"));

export default app;
