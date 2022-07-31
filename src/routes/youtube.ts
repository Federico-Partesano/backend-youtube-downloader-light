import express from "express";
import { youtubeController } from "../controllers/youtube";
const router = express.Router();
const { getSongs } = youtubeController;


router.get("/songs", getSongs);





export default router;
