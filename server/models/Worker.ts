import mongoose from "mongoose";

const { Schema, model, models } = mongoose;
interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
}

const WorkerSchema = new Schema(
  {
    name: { type: String, required: true },
    skill: { type: String, required: true },
    location: { type: String, required: true },
    userId: { type: String, required: true },
    picture: { type: String, required: true },
    status: { type: String, default: "Available" },
    rating: { type: Number, default: 4.5 },
    reviews: { type: [Object] as unknown as Review[], default: [] },
    documents: [
      {
        name: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

// ✅ บังคับใช้ collection ชื่อ workers
const Worker = models.Worker || model("Worker", WorkerSchema, "workers");
export default Worker;
