// pages/api/process_audio.js
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import os from "os";
import OpenAI from "openai";
import ffmpeg from "fluent-ffmpeg";
import { fileTypeFromBuffer } from "file-type";

// These are the extensions we allow. Add or remove as desired.
const supportedExtensions = [
  "flac", "m4a", "mp3", "mp4", "mpeg", "mpga",
  "oga", "ogg", "wav", "webm", "mov"
];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1) Read the raw file data from the request
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const buffer = Buffer.concat(buffers);

    // 2) Detect the file type by looking at its binary signature
    const typeInfo = await fileTypeFromBuffer(buffer);
    // typeInfo will look like { ext: 'mov', mime: 'video/quicktime' } or null if unrecognized

    if (!typeInfo || !supportedExtensions.includes(typeInfo.ext)) {
      // Immediately return a 400 if it's not a recognized or allowed extension
      return res.status(400).json({
        error: `Unsupported or invalid file type. Allowed: ${supportedExtensions.join(", ")}`,
      });
    }

    // 3) Write the uploaded data to a temp file *with the detected extension*
    //    e.g., if it's recognized as .mov, name it accordingly
    const originalPath = path.join(
      os.tmpdir(),
      `upload-${Date.now()}.${typeInfo.ext}`
    );
    fs.writeFileSync(originalPath, buffer);

    // 4) Convert to .mp4 (or .wav) via ffmpeg
    const convertedPath = path.join(os.tmpdir(), `converted-${Date.now()}.mp4`);

    try {
      await new Promise((resolve, reject) => {
        ffmpeg(originalPath)
          .output(convertedPath)
          .on("end", resolve)
          .on("error", () => {
            reject(new Error("FFmpeg conversion failed – possibly invalid or corrupt file."));
          })
          .run();
      });
    } catch (conversionError) {
      // Clean up the original file if conversion fails
      if (fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
      }
      return res.status(400).json({
        error: conversionError.message || "Could not convert the file.",
      });
    }

    // 5) Create the OpenAI client (v4 usage)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? process.env.API_KEY,
    });

    // 6) Transcribe the newly converted .mp4
    let transcription;
    try {
      const fileStream = fs.createReadStream(convertedPath);
      transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: "whisper-1",
      });
    } catch (transcriptionError) {
      // Clean up and return an error if the transcription fails
      fs.unlinkSync(originalPath);
      fs.unlinkSync(convertedPath);
      return res.status(400).json({
        error: "Transcription failed. Possibly unsupported audio format.",
      });
    }

    // 7) Clean up temp files
    fs.unlinkSync(originalPath);
    fs.unlinkSync(convertedPath);
    console.log(transcription.text)
    // 8) Return the transcript
    return res.status(200).json({
      transcript: transcription.text,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Error processing file" });
  }
}
