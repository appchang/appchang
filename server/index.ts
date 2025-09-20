import "dotenv/config";
import express from "express";
import workersRouter from "./routes/workers";
import lineRouter from "./routes/line";
import cors from "cors";
import { connectDB } from "./db";

console.log("🚀 Starting server..."); // ✅ Step 1

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

app.use("/api/workers", workersRouter);
app.use("/api/line", lineRouter);

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log("🔑 LINE_ACCESS_TOKEN:", process.env.LINE_ACCESS_TOKEN);
});
