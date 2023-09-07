"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var youtube_1 = require("../controllers/youtube");
var router = express_1.default.Router();
var getSongs = youtube_1.youtubeController.getSongs, downloadSong = youtube_1.youtubeController.downloadSong, getStatus = youtube_1.youtubeController.getStatus, getDownloadedAudio = youtube_1.youtubeController.getDownloadedAudio;
router.get("/songs", getSongs);
router.get("/song", downloadSong);
router.get("/status", getStatus);
router.get("/downloaded-song", getDownloadedAudio);
exports.default = router;
