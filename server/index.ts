import express from "express";
import cors from "cors";
import { connectDB } from "./db.ts";

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes ตัวอย่าง
app.get("/", (_req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
