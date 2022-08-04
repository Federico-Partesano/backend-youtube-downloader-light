import express from "express";
import { youtubeController } from "../controllers/youtube";
const router = express.Router();
const { getSongs, downloadSong, getStatus, getDownloadedAudio } = youtubeController;


router.get("/songs", getSongs);
router.get("/song", downloadSong);
router.get("/status", getStatus);
router.get("/downloaded-song", getDownloadedAudio);





export default router;
