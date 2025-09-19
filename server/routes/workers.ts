import { Router } from "express";

const router = Router();

// mock data
const workers = [
  { id: 1, name: "Alice", skill: "Plumber" },
  { id: 2, name: "Bob", skill: "Electrician" },
];

router.get("/", (_req, res) => {
  res.json(workers);
});

router.post("/", (req, res) => {
  const newWorker = req.body;
  workers.push(newWorker);
  res.status(201).json(newWorker);
});

export default router;
