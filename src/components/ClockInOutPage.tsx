import React, { useState } from "react";
import { ChevronLeft, Clock, CheckCircle, Calendar } from "lucide-react";
export function ClockInOutPage({ onBack }: { onBack: () => void }) {
  const [clockedIn, setClockedIn] = useState(false);
  // Sample job data
  const job = {
    title: "ซ่อมแซมห้องน้ำ คอนโดมิเนียม A",
    location: "ลาดพร้าว, กรุงเทพฯ",
  };
  // Sample work history
  const workHistory = [
    {
      id: 1,
      date: "2023-10-14",
      clockIn: "08:30",
      clockOut: "17:45",
      jobTitle: "ซ่อมแซมห้องน้ำ คอนโดมิเนียม A",
    },
    {
      id: 2,
      date: "2023-10-13",
      clockIn: "09:15",
      clockOut: "18:30",
      jobTitle: "ซ่อมแซมห้องน้ำ คอนโดมิเนียม A",
    },
  ];
  const handleClockIn = () => {
    setClockedIn(true);
    console.log("Clocked in at:", new Date().toLocaleTimeString());
  };
  const handleClockOut = () => {
    setClockedIn(false);
    console.log("Clocked out at:", new Date().toLocaleTimeString());
  };
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
      {/* Current Job */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          งานปัจจุบัน
        </h2>
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-[#0061A8] mb-1">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.location}</p>
        </div>
        {/* Clock In/Out Buttons */}
        {!clockedIn ? (
          <button
            onClick={handleClockIn}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-colors shadow-sm flex items-center justify-center"
          >
            <Clock size={20} className="mr-2" />
            Clock-in เริ่มงาน
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 rounded-lg p-3 flex items-center">
              <CheckCircle size={18} className="text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  คุณเริ่มงานเมื่อ
                </p>
                <p className="text-sm text-green-700">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleClockOut}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-colors shadow-sm flex items-center justify-center"
            >
              <Clock size={20} className="mr-2" />
              Clock-out เลิกงาน
            </button>
          </div>
        )}
      </div>
      {/* Work History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          ประวัติการทำงานล่าสุด
        </h2>
        <div className="space-y-4">
          {workHistory.map((entry) => (
            <div
              key={entry.id}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-[#0061A8] mr-2" />
                <span className="font-medium text-gray-800">
                  {new Date(entry.date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{entry.jobTitle}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>เข้างาน: {entry.clockIn}</span>
                <span>ออกงาน: {entry.clockOut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
