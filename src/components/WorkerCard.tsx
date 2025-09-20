import React from "react";
import { UserIcon, BriefcaseIcon, MapPinIcon, StarIcon } from "lucide-react";
export function WorkerCard({
  worker,
  onClick,
}: {
  worker: {
    id: string;
    name: string;
    picture?: string;
    rating: number;
    reviews?: { id: string; comment: string }[];
    skill: string;
    location: string;
    status: "available" | "busy";
  };
  onClick: (workerId: string) => void;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center border border-gray-100 hover:shadow-md transition-shadow active:bg-gray-50"
      onClick={() => onClick(worker.id)}
    >
      <div className="flex items-start">
        <div className="bg-gray-100 rounded-full p-2 mr-3 w-12 h-12 flex items-center justify-center overflow-hidden">
          {worker.picture ? (
            <img
              src={worker.picture}
              alt={worker.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <UserIcon size={24} className="text-blue-600" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{worker.name}</h3>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={12}
                  className={
                    i < worker.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({worker.reviews?.length || 0})
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            <BriefcaseIcon size={14} className="mr-1" />
            {worker.skill} • <MapPinIcon size={14} className="mx-1" />{" "}
            {worker.location}
          </p>
        </div>
      </div>
      <div>
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
  );
}
