import express from "express";
import cors from "cors";
import uploadRoute from "../routes/uplode.router.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* API Routes */
app.use("/api/upload", uploadRoute);

/* Static Frontend */
app.use(express.static(path.join(__dirname, "../public")));


app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;