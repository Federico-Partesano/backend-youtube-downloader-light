import { Request, Response } from "express";
import * as yt from "youtube-search-without-api-key";
import youtubedl, { YtResponse } from "youtube-dl-exec";

// @ts-ignore
import youtubedls from "youtube-dl";

import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import fs from "fs";
import { Error, SuccessMessage } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { setStatusServer, socketConnection, statusServer } from "..";

let processingFile: string[] = [];

const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise: undefined | Promise<void> = ffmpegInstance.load();

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}

const startDownload = async (getFileName: string, videoId: string) =>
  new Promise(async (resolve) => {
    setStatusServer("downloading")
    socketConnection?.emit(`status`, {status: "downloading"});
    socketConnection?.broadcast.emit(`status`, {status: "downloading"});
    await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, {
      format: "mp4",
    });
    fs.renameSync(getFileName, `video.mp4`);
    setTimeout(async () => {
      const ffmpeg = await getFFmpeg();
      const tt = await ffmpeg.FS(
        "writeFile",
        `video.mp4`,
        await fetchFile(`video.mp4`)
      );
      await ffmpeg.run("-i", `video.mp4`, `audio.mp3`);
      await fs.promises.writeFile(
        `./audio.mp3`,
        ffmpeg.FS("readFile", `audio.mp3`)
      );
      setTimeout(() => {
        socketConnection?.emit(`status`, {status: "await"});
        socketConnection?.broadcast.emit(`status`, {status: "await"});
      }, 500)
    setStatusServer("await")
      resolve(0);
    }, 500);
  });

export const youtubeController = {
  getSongs: async (
    { query: { term } }: Request<{}, {}, {}, { term: string }>,
    res: Response<Error | any | SuccessMessage>
  ) => {
    const videos = await yt.search(term);
    return res.json(videos);
  },
  getStatus: async (
    {}: Request,
    res: Response<Error | any | SuccessMessage>
  ) => {
    return res.json({status: statusServer});
  },
  downloadSong: async (
    { query: { videoId } }: Request<{}, {}, {}, { videoId: string }>,
    res: Response<Error | any | SuccessMessage>
  ) => {
    if(statusServer !== "await") return res.json({status: "await"})
    const getFileName = (await youtubedl(
      `https://www.youtube.com/watch?v=${videoId}`,
      { getFilename: true, format: "mp4" }
    )) as any as string;
    // const format = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, { getFormat: true, format: "mp4"})  as any as string;
    // const info: any = await youtubedl(`https://www.youtube.com/watch?v=${videoId}`, { dumpJson: true ,format: "mp4"});

    // const size = info.formats.find(({format: formatVideo}: {format: string}) => formatVideo === format )

     startDownload(getFileName, videoId);
    return res.json({ status: "in downloading" });
  },
  getDownloadedAudio:  async (
    {}: Request,
    res: Response<Error | any | SuccessMessage>
  ) => {
    res.sendFile(__dirname, "/src/audio.mp3");
   }
};
