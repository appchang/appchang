import React, { useState } from "react";
import { ChevronLeft, StarIcon, Send, UserIcon } from "lucide-react";
export function CustomerReviewPage({
  worker,
  onSubmit,
}: {
  worker: {
    id: string;
    name: string;
    avatar?: string;
  };
  onSubmit: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Review submitted:", {
      rating,
      comment,
      workerId: worker.id,
    });
    onSubmit();
  };
  return (
    <div className="flex flex-col w-full">
      {/* Back Button */}
      <button
        onClick={onSubmit}
        className="flex items-center text-[#0061A8] font-medium mb-4"
      >
        <ChevronLeft size={20} />
        กลับ
      </button>
      {/* Review Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">
          รีวิวการทำงานของช่าง
        </h2>
        <div className="flex items-center justify-center mb-2">
          <div className="bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center overflow-hidden">
            {worker?.avatar ? (
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <UserIcon size={28} className="text-[#0061A8]" />
            )}
          </div>
        </div>
        <p className="text-center font-medium text-gray-800 mb-6">
          {worker?.name || "ช่าง"}
        </p>
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="mx-1 focus:outline-none"
              >
                <StarIcon
                  size={36}
                  className={
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
          {/* Comment */}
          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ความคิดเห็นเพิ่มเติม
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="แสดงความคิดเห็นเกี่ยวกับการทำงานของช่าง..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8] min-h-[120px]"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-3 rounded-lg font-medium shadow-sm flex items-center justify-center ${
              rating > 0
                ? "bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white hover:from-[#004C85] hover:to-[#1976D2]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            <Send size={18} className="mr-2" />
            ส่งรีวิว
          </button>
        </form>
      </div>
    </div>
  );
}
