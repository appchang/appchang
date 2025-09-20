import React from "react";
import {
  UserIcon,
  BriefcaseIcon,
  MapPinIcon,
  StarIcon,
  ChevronLeft,
  FileTextIcon,
  PhoneIcon,
} from "lucide-react";
export function WorkerProfile({
  worker,
  onBack,
  onAssignJob,
}: {
  worker: any;
  onBack: () => void;
  onAssignJob: () => void;
}) {
  // Handle missing data gracefully
  const reviews = worker.reviews || [];
  const documents = worker.documents || [];
  return (
    <div className="flex flex-col w-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-[#0061A8] font-medium mb-4"
      >
        <ChevronLeft size={20} />
        กลับ
      </button>
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-start">
          <div className="bg-gray-100 rounded-full p-3 mr-4 w-20 h-20 flex items-center justify-center overflow-hidden">
            {worker.picture ? (
              <img
                src={worker.picture}
                alt={worker.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <UserIcon size={32} className="text-[#0061A8]" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-800 mb-1">
              {worker.name}
            </h1>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    className={
                      i < worker.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({reviews.length} รีวิว)
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <BriefcaseIcon size={16} className="mr-2" />
              <span>{worker.skill}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPinIcon size={16} className="mr-2" />
              <span>{worker.location}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                worker.status === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {worker.status === "available" ? "Available" : "Busy"}
            </span>
          </div>
        </div>
      </div>
      {/* Documents Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">เอกสาร</h2>
        <div className="flex flex-wrap gap-2">
          {documents.map((doc: any) => (
            <div
              key={doc.id}
              className="flex items-center bg-gray-100 rounded-full px-3 py-1.5"
            >
              <FileTextIcon size={14} className="mr-1.5 text-[#0061A8]" />
              <span className="text-sm">{doc.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          รีวิวจากลูกค้า
        </h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-800 mr-2">
                    {review.author}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={12}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">ยังไม่มีรีวิว</p>
          )}
        </div>
      </div>
      {/* Assign Job Button */}
      <button
        onClick={onAssignJob}
        className="w-full bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white py-3 rounded-lg font-medium shadow-sm hover:from-[#004C85] hover:to-[#1976D2] transition-colors mb-4"
      >
        Assign งานให้ช่างนี้
      </button>
      {/* Contact Button */}
      <button className="w-full bg-[#06C755] text-white py-3 rounded-lg font-medium shadow-sm flex items-center justify-center mb-4">
        <PhoneIcon size={18} className="mr-2" />
        ติดต่อทาง LINE
      </button>
    </div>
  );
}
