import React, { useState } from "react";
import { ChevronLeft, Calendar, MapPin, DollarSign } from "lucide-react";
export function JobAssignmentPage({
  worker,
  onBack,
  onSubmit,
}: {
  worker: {
    id: string;
    name: string;
    avatar?: string;
    userId: string;
  };
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [jobForm, setJobForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "",
    budget: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };
  const submitAssign = async (e: any) => {
    e.preventDefault();

    console.log("worker : ", worker);

    // แก้ format startDate และ endDate จาก YYYY-MM-DD เป็น DD/MM/YYYY
    const formatDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-");
      return `${day}/${month}/${year}`;
    };
    const formattedStartDate = formatDate(jobForm.startDate);
    const formattedEndDate = formatDate(jobForm.endDate);

    try {
      const res = await fetch("/api/line/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: worker.userId,
          message: `คุณได้รับมอบหมายงานใหม่:\n- ชื่องาน: ${jobForm.title}\n- สถานที่ทำงาน: ${jobForm.location}\n- วันที่เริ่มต้น: ${formattedStartDate}\n- วันที่สิ้นสุด: ${formattedEndDate}\n- งบประมาณ: ${jobForm.budget} บาท`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send LINE message");
      }
    } catch (err) {
      console.error("Error:", err);
    }

    onSubmit();
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
      {/* Job Assignment Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          Assign งานให้ {worker?.name || "ช่าง"}
        </h2>
        <form onSubmit={submitAssign}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ชื่องาน/โครงการ
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobForm.title}
              onChange={handleChange}
              placeholder="ชื่องาน/โครงการ"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              วันที่เริ่มงาน
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={jobForm.startDate}
                onChange={handleChange}
                className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              วันที่สิ้นสุด
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={jobForm.endDate}
                onChange={handleChange}
                className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location งาน
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={jobForm.location}
                onChange={handleChange}
                placeholder="สถานที่ทำงาน"
                className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Budget (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={18} className="text-gray-400" />
              </div>
              <input
                type="number"
                id="budget"
                name="budget"
                value={jobForm.budget}
                onChange={handleChange}
                placeholder="งบประมาณ (บาท)"
                className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white py-3 rounded-lg font-medium hover:from-[#004C85] hover:to-[#1976D2] transition-colors shadow-sm"
          >
            ส่งงานให้ช่าง
          </button>
        </form>
      </div>
    </div>
  );
}
