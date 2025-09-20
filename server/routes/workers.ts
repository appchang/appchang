import { Router, Request, Response } from "express";
import Worker from "../models/Worker";

const router = Router();

// GET api/workers
router.get("/", async (_req, res) => {
  try {
    const workers = await Worker.find({}).sort({ updatedAt: -1 });
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workers", error });
  }
});

// POST api/workers
router.post("/", async (req: Request, res: Response) => {
  try {
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json({ message: "Worker created successfully", worker });
  } catch (error) {
    res.status(400).json({ message: "Error creating worker", error });
  }
});

export default router;
