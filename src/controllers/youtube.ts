import { Request, Response } from "express";
import { API_HOST, API_KEY } from "../enviroument";
import * as yt from "youtube-search-without-api-key";

// @ts-ignore
import youtubedls from "youtube-dl";

import { createFFmpeg } from "@ffmpeg/ffmpeg";
import fs from "fs";
import { Error, SuccessMessage } from "../models/types";
import { v4 as uuidv4 } from "uuid";

let processingFile: string[] = [];

const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise: undefined | Promise<void> = ffmpegInstance.load();

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = undefined;
  }
}
export const youtubeController = {
  getSongs: async (
    {query:{term}}: Request<{},{},{},{term: string}>,
    res: Response<Error | any | SuccessMessage>
  ) => {
    const videos = await yt.search(term);

    return res.json(videos);


  },
};
