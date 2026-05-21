import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import oAuth2Client from "../config/googledrive.js";
import { config } from "../config/config.js";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/", upload.array("file", 20), async (req, res) => {
  try {

    const driveService = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const uploadedFiles = [];

    for (const file of req.files) {

      const fileMetadata = {
        name: file.originalname,
        parents: [config.GOOGLE_DRIVE_FOLDER_ID],
      };

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      };

      const response = await driveService.files.create({
        resource: fileMetadata,
        media,
        fields: "id",
      });

      uploadedFiles.push({
        fileName: file.originalname,
        fileId: response.data.id,
      });

      fs.unlinkSync(file.path);
    }

    res.json({
      success: true,
      files: uploadedFiles,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const driveService = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    const response = await driveService.files.list({
      q: `'${config.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink, createdTime)",
      orderBy: "createdTime desc",
      pageSize: 100,
    });

    res.json({
      success: true,
      files: response.data.files,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;