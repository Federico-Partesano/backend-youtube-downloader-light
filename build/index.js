"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnection = exports.setStatusServer = exports.statusServer = void 0;
var express_1 = __importDefault(require("express"));
var youtube_1 = __importDefault(require("./routes/youtube"));
var cors_1 = __importDefault(require("cors"));
var express_utils_1 = require("./utils/express.utils");
var socketio = __importStar(require("socket.io"));
var http = __importStar(require("http"));
var port = 3000;
exports.statusServer = "await";
var setStatusServer = function (newStatus) {
    return (exports.statusServer = newStatus);
};
exports.setStatusServer = setStatusServer;
exports.socketConnection = null;
var connectionSocket = {};
var app = (0, express_1.default)();
var server = http.createServer(app);
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
var io = new socketio.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});
//  let connections: Record<string, string> = {}
io.on("connection", function (socket) {
    exports.socketConnection = socket;
    socket.on("conn", function (message) {
        if (Object.values(connectionSocket).some(function (connection) { return connection === message.id; })) {
            exports.socketConnection === null || exports.socketConnection === void 0 ? void 0 : exports.socketConnection.emit("disconnectClient");
        }
        else {
            connectionSocket[socket.id] = message.id;
        }
    });
    socket.on("disconnect", function () {
        delete connectionSocket[socket.id];
    });
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/youtube", youtube_1.default);
app.get("/", function (req, res) {
    return res.json({ message: "ok" });
});
var TestController = /** @class */ (function () {
    function TestController() {
    }
    var _a;
    _a = TestController;
    TestController.testEndpoint = function (req) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            if (req.query.fail)
                throw new Error("simulated error");
            return [2 /*return*/, (0, express_utils_1.ResponseSuccessJson)({ message: "ok" })];
        });
    }); };
    return TestController;
}());
app.get("/hello", 
// ----
function (request, response) {
    response.json({ message: "ok" });
});
app.get("/test", 
// ----
(0, express_utils_1.toExpressHandler)(TestController.testEndpoint, TestController));
app.use(express_utils_1.errorHandler);
server.listen(port, function () { return console.log("Server is running"); });
exports.default = app;
