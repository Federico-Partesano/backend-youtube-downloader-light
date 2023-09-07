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
exports.youtubeController = void 0;
var yt = __importStar(require("youtube-search-without-api-key"));
var youtube_dl_exec_1 = __importDefault(require("youtube-dl-exec"));
var path_1 = __importDefault(require("path"));
var ffmpeg_1 = require("@ffmpeg/ffmpeg");
var fs_1 = __importDefault(require("fs"));
var __1 = require("..");
var processingFile = [];
var songName = "";
var ffmpegInstance = (0, ffmpeg_1.createFFmpeg)({ log: true });
var ffmpegLoadingPromise = ffmpegInstance.load();
function getFFmpeg() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!ffmpegLoadingPromise) return [3 /*break*/, 2];
                    return [4 /*yield*/, ffmpegLoadingPromise];
                case 1:
                    _a.sent();
                    ffmpegLoadingPromise = undefined;
                    _a.label = 2;
                case 2: return [2 /*return*/, ffmpegInstance];
            }
        });
    });
}
var startDownload = function (getFileName, videoId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, youtube_dl_exec_1.default)("https://www.youtube.com/watch?v=".concat(videoId), {
                                format: "mp4",
                            })];
                        case 1:
                            _a.sent();
                            fs_1.default.renameSync(getFileName, "video.mp4");
                            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var ffmpeg, tt, _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0: return [4 /*yield*/, getFFmpeg()];
                                        case 1:
                                            ffmpeg = _d.sent();
                                            _b = (_a = ffmpeg).FS;
                                            _c = ["writeFile", "video.mp4"];
                                            return [4 /*yield*/, (0, ffmpeg_1.fetchFile)("video.mp4")];
                                        case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent()]))];
                                        case 3:
                                            tt = _d.sent();
                                            return [4 /*yield*/, ffmpeg.run("-i", "video.mp4", "audio.mp3")];
                                        case 4:
                                            _d.sent();
                                            return [4 /*yield*/, fs_1.default.promises.writeFile("./audio.mp3", ffmpeg.FS("readFile", "audio.mp3"))];
                                        case 5:
                                            _d.sent();
                                            setTimeout(function () {
                                                __1.socketConnection === null || __1.socketConnection === void 0 ? void 0 : __1.socketConnection.emit("status", { status: "await", videoId: videoId });
                                                __1.socketConnection === null || __1.socketConnection === void 0 ? void 0 : __1.socketConnection.broadcast.emit("status", { status: "await", videoId: videoId });
                                            }, 500);
                                            (0, __1.setStatusServer)("await");
                                            resolve(0);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 500);
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.youtubeController = {
    getSongs: function (_a, res) {
        var term = _a.query.term;
        return __awaiter(void 0, void 0, void 0, function () {
            var videos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, yt.search(term)];
                    case 1:
                        videos = _b.sent();
                        return [2 /*return*/, res.json(videos)];
                }
            });
        });
    },
    getStatus: function (_a, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, res.json({ status: __1.statusServer })];
        });
    }); },
    downloadSong: function (_a, res) {
        var videoId = _a.query.videoId;
        return __awaiter(void 0, void 0, void 0, function () {
            var getFileName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (__1.statusServer !== "await")
                            return [2 /*return*/, res.json({ status: "await" })];
                        __1.socketConnection === null || __1.socketConnection === void 0 ? void 0 : __1.socketConnection.emit("status", { status: "downloading" });
                        __1.socketConnection === null || __1.socketConnection === void 0 ? void 0 : __1.socketConnection.broadcast.emit("status", { status: "downloading" });
                        return [4 /*yield*/, (0, youtube_dl_exec_1.default)("https://www.youtube.com/watch?v=".concat(videoId), { getFilename: true, format: "mp4" })];
                    case 1:
                        getFileName = (_b.sent());
                        songName = getFileName;
                        // const format = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, { getFormat: true, format: "mp4"})  as any as string;
                        // const info: any = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, { dumpJson: true ,format: "mp4"});
                        // const size = info.formats.find(({format: formatVideo}: {format: string}) => formatVideo === format )
                        startDownload(getFileName, videoId);
                        return [2 /*return*/, res.json({ status: "in downloading" })];
                }
            });
        });
    },
    getDownloadedAudio: function (_a, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, res.download("".concat(path_1.default.join(__dirname).split("/").splice(0, path_1.default.join(__dirname).split("/").length - 2).join("/"), "/audio.mp3"))];
        });
    }); }
};
console.log();
