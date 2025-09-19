import React from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
export function WorkerJobConfirmationPage({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  // Sample job data
  const job = {
    title: "ซ่อมแซมห้องน้ำ คอนโดมิเนียม A",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    location: "ลาดพร้าว, กรุงเทพฯ",
    budget: "15,000",
    client: "คุณสมศักดิ์ บริษัท ABC",
  };
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h2 className="text-center text-lg font-semibold text-[#0061A8] mb-1">
            คุณมีงานใหม่
          </h2>
          <p className="text-center text-sm text-gray-600">
            กรุณาตอบรับหรือปฏิเสธงานภายใน 24 ชั่วโมง
          </p>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {job.title}
        </h3>
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <Calendar size={20} className="text-[#0061A8] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">วันที่ทำงาน</p>
              <p className="text-gray-600">
                {new Date(job.startDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(job.endDate).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin size={20} className="text-[#0061A8] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">สถานที่</p>
              <p className="text-gray-600">{job.location}</p>
            </div>
          </div>
          <div className="flex items-start">
            <DollarSign size={20} className="text-[#0061A8] mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">ค่าตอบแทน</p>
              <p className="text-gray-600">{job.budget} บาท</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6">
          <p className="font-medium text-gray-800 mb-1">ผู้ว่าจ้าง</p>
          <p className="text-gray-600">{job.client}</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors shadow-sm flex items-center justify-center"
          >
            <CheckCircle size={18} className="mr-2" />
            รับงาน
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-sm flex items-center justify-center"
          >
            <XCircle size={18} className="mr-2" />
            ปฏิเสธงาน
          </button>
        </div>
      </div>
    </div>
  );
}
