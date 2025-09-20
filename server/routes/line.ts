import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const TOKEN = process.env.LINE_ACCESS_TOKEN as string;

// POST /api/line/push
router.post("/push", async (req: Request, res: Response) => {
  if (!TOKEN) {
    return res.status(500).json({ error: "LINE_ACCESS_TOKEN is not set" });
  }

  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "userId and message are required" });
  }

  try {
    console.log("📩 Sending message to:", userId, message);

    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: userId,
        messages: [{ type: "text", text: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ LINE API Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
