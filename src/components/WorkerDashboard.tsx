import React, { useEffect, useState } from "react";
import { Search, Filter, X, PlusCircleIcon } from "lucide-react";
import { WorkerCard } from "./WorkerCard";
export function WorkerDashboard({
  workers,
  onWorkerSelect,
  onAssignJob,
}: {
  workers: any[];
  onWorkerSelect: (worker: any) => void;
  onAssignJob: () => void;
}) {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    skill: "",
    location: "",
    status: "",
  });
  const [filteredWorkers, setFilteredWorkers] = useState(workers);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Get unique values for filter dropdowns
  const skills = [...new Set(workers.map((worker) => worker.skill))];
  const locations = [...new Set(workers.map((worker) => worker.location))];
  // Apply filters and search
  useEffect(() => {
    let result = [...workers];
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (worker) =>
          worker.name.toLowerCase().includes(term) ||
          worker.skill.toLowerCase().includes(term)
      );
    }
    // Apply filters
    if (filters.skill) {
      result = result.filter((worker) => worker.skill === filters.skill);
    }
    if (filters.location) {
      result = result.filter((worker) => worker.location === filters.location);
    }
    if (filters.status) {
      result = result.filter((worker) => worker.status === filters.status);
    }
    setFilteredWorkers(result);
  }, [searchTerm, filters, workers]);
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const clearFilters = () => {
    setFilters({
      skill: "",
      location: "",
      status: "",
    });
    setSearchTerm("");
  };
  const hasActiveFilters =
    filters.skill || filters.location || filters.status || searchTerm;
  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 bg-white z-10 pb-3">
        {/* Search Bar */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="ค้นหาชื่อหรือทักษะ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
          />
        </div>
        {/* Filter Button */}
        <div className="flex justify-between items-center mb-3">
          <button
            className="flex items-center text-sm text-gray-700 font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} className="mr-1" />
            ตัวกรอง
          </button>
          {hasActiveFilters && (
            <button
              className="flex items-center text-sm text-[#0061A8] font-medium"
              onClick={clearFilters}
            >
              <X size={16} className="mr-1" />
              ล้างตัวกรอง
            </button>
          )}
        </div>
        {/* Filter Dropdowns */}
        {isFilterOpen && (
          <div className="flex flex-col space-y-3 bg-gray-50 p-3 rounded-lg mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                ทักษะ
              </label>
              <select
                name="skill"
                value={filters.skill}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
              >
                <option value="">ทั้งหมด</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                พื้นที่
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
              >
                <option value="">ทั้งหมด</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                สถานะ
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
              >
                <option value="">ทั้งหมด</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {/* Worker List */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        รายชื่อแรงงาน{" "}
        {filteredWorkers.length > 0 && `(${filteredWorkers.length})`}
      </h2>
      {filteredWorkers.length > 0 ? (
        <div className="space-y-4">
          {filteredWorkers.map((worker: any) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onClick={onWorkerSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">ไม่พบรายชื่อแรงงาน</p>
        </div>
      )}
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <button
          onClick={onAssignJob}
          className="bg-[#0061A8] text-white rounded-full p-3 shadow-lg hover:bg-[#004C85] transition-colors"
        >
          <PlusCircleIcon size={24} />
        </button>
      </div>
    </div>
  );
}
