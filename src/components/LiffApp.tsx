import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import {
  UserIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "lucide-react";
import { WorkerDashboard } from "./WorkerDashboard";
import { WorkerProfile } from "./WorkerProfile";
import { JobAssignmentPage } from "./JobAssignmentPage";
import { WorkerJobConfirmationPage } from "./WorkerJobConfirmationPage";
import { ClockInOutPage } from "./ClockInOutPage";
import { CustomerReviewPage } from "./CustomerReviewPage";
import LoadingOverlay from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export function LiffApp() {
  // State for form values
  const [formValues, setFormValues] = useState({
    fullName: "",
    skill: "",
    location: "",
  });
  // State to toggle between views
  const [activeView, setActiveView] = useState("formRegister");
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [assigningJob, setAssigningJob] = useState(false);

  // Sample worker data with additional fields for profile
  const workersMock = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      skill: "ช่างปูน",
      location: "กรุงเทพฯ",
      status: "available",
      rating: 4,
      reviews: [
        {
          id: 1,
          author: "คุณมานี",
          rating: 4,
          text: "ทำงานดี ตรงเวลา",
        },
        {
          id: 2,
          author: "คุณสมศักดิ์",
          rating: 5,
          text: "ฝีมือดีมาก แนะนำ",
        },
      ],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
        {
          id: 2,
          name: "ใบรับรองฝีมือ",
          type: "certificate",
        },
      ],
      jobs: [],
    },
    {
      id: 2,
      name: "วิชัย รักงาน",
      skill: "ช่างไฟฟ้า",
      location: "นนทบุรี",
      status: "busy",
      rating: 5,
      reviews: [
        {
          id: 1,
          author: "คุณสมหมาย",
          rating: 5,
          text: "ทำงานเรียบร้อย แก้ปัญหาได้ดี",
        },
      ],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
        {
          id: 2,
          name: "ใบรับรองวิชาชีพ",
          type: "license",
        },
      ],
    },
    {
      id: 3,
      name: "มานะ ตั้งใจ",
      skill: "ช่างเหล็ก",
      location: "สมุทรปราการ",
      status: "available",
      rating: 3,
      reviews: [
        {
          id: 1,
          author: "คุณวิชัย",
          rating: 3,
          text: "งานพอใช้ได้ แต่ล่าช้า",
        },
      ],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
      ],
    },
    {
      id: 4,
      name: "สมศักดิ์ พากเพียร",
      skill: "ช่างไม้",
      location: "ปทุมธานี",
      status: "busy",
      rating: 4,
      reviews: [
        {
          id: 1,
          author: "คุณสมชาย",
          rating: 4,
          text: "ทำงานดี",
        },
        {
          id: 2,
          author: "คุณวิไล",
          rating: 4,
          text: "งานเรียบร้อย",
        },
      ],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
        {
          id: 2,
          name: "ใบอนุญาตขับขี่",
          type: "license",
        },
      ],
    },
    {
      id: 5,
      name: "จิรายุ ชำนาญงาน",
      skill: "ช่างปูน",
      location: "กรุงเทพฯ",
      status: "available",
      rating: 5,
      reviews: [
        {
          id: 1,
          author: "คุณพิชัย",
          rating: 5,
          text: "ทำงานดีมาก ละเอียด",
        },
        {
          id: 2,
          author: "คุณสมศรี",
          rating: 5,
          text: "บริการดีเยี่ยม แนะนำ",
        },
      ],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
        {
          id: 2,
          name: "ใบรับรองฝีมือ",
          type: "certificate",
        },
      ],
    },
  ];

  // const workers: Worker[] = [];
  // const [workers, setWorkers] = useState<Worker[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);

  interface Review {
    id: number;
    author: string;
    rating: number;
    text: string;
  }

  interface Document {
    id: number;
    name: string;
    type: string; // หรือใช้ union: "id" | "license"
  }

  interface Worker {
    id?: string;
    userId: string;
    picture: string;
    name: string;
    skill: string;
    location: string;
    status: "available" | "busy" | "offline"; // ใช้ union type จะชัดกว่า
    rating: number;
    reviews: Review[];
    documents: Document[];
  }

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // Handle form submission
  const submitRegister = async (e: any) => {
    e.preventDefault();

    const newWorker: Worker = {
      userId: lineAccount?.userId || "Ua2a34857a8072dde0e34f1ae2eb8f01d",
      name: formValues.fullName,
      skill: formValues.skill,
      location: formValues.location,
      picture:
        lineAccount?.picture ||
        "https://profile.line-scdn.net/0hIrNdtp34Fl1jHT_T95JoIhNNFTdAbE9PGChROAQdGD9fKgJcGC5YPwFNGzpXelZbHSlfPlQcHDlvDmE7fUvqaWQtS2xfJFEJTHpQvw",
      status: "available",
      rating: 0,
      reviews: [],
      documents: [
        {
          id: 1,
          name: "บัตรประชาชน",
          type: "id",
        },
        {
          id: 2,
          name: "ใบรับรองฝีมือ",
          type: "certificate",
        },
      ],
    };

    try {
      setLoading(true);
      const res = await fetch("/api/workers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newWorker,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register worker");
      }
      try {
        const res = await fetch("/api/line/push", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: newWorker.userId,
            message: `ลงทะเบียนสำเร็จ!\nชื่อ: ${newWorker.name}\nทักษะ: ${newWorker.skill}\nพื้นที่ทำงาน: ${newWorker.location}`,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to send LINE message");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }

    toast.success("ลงทะเบียนสำเร็จ!");

    // call fetch workers again
    try {
      setLoading(true);
      const res = await fetch("/api/workers");
      const data = await res.json();
      setWorkers(data);
    } catch (err) {
      console.error("Fetch workers error:", err);
    } finally {
      setLoading(false);
    }

    // == reset form register ==
    setFormValues({
      fullName: "",
      skill: "",
      location: "",
    });
    setActiveView("dashboard");
  };
  // Handle worker selection
  const handleWorkerSelect = (workerId: any) => {
    setSelectedWorkerId(workerId);
    setActiveView("profile");
  };
  // Handle job assignment
  const handleAssignJob = () => {
    setAssigningJob(true);
    setActiveView("job-assignment");
  };
  // Get selected worker
  const selectedWorker: any =
    workers.find((worker) => worker.id === selectedWorkerId) || workers[0];

  interface lineAccountType {
    name: string;
    picture: string;
    userId: string;
  }

  // === LIFF ===
  const [lineAccount, setLineAccount] = useState<lineAccountType | null>(null);

  // === Library ===
  const [loading, setLoading] = useState(false);

  // === LIFF connect Line account ===
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2008132085-Ex4bOk3P" });
        if (liff.isLoggedIn()) {
          const userInfoFromLine = await liff.getProfile();
          console.log("userInfoFromLine", userInfoFromLine);
          setLineAccount({
            name: userInfoFromLine.displayName,
            picture: userInfoFromLine.pictureUrl || "",
            userId: userInfoFromLine.userId || "",
          });
        } else {
          liff.login();
        }
      } catch (err) {
        console.error("LIFF init error:", err);
      }
    };
    initLiff();
  }, []);

  useEffect(() => {
    if (!lineAccount) return;
    const loadWorkers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workers");
        const data = await res.json();
        setWorkers(data);
      } catch (err) {
        console.error("Fetch workers error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadWorkers();
  }, [lineAccount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <LoadingOverlay
        active={loading}
        spinner={<FadeLoader color="#36d7b7" />}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
            zIndex: 9999,
          }),
          content: (base) => ({
            ...base,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }),
        }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        {/* Header */}
        <header className="bg-white shadow-sm py-5 px-4 text-center sticky top-0 z-20">
          <h1 className="text-2xl font-bold text-[#0061A8]">AppChang Pro</h1>
          <p className="text-sm text-gray-500">
            Construction Workforce Platform
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-grow px-4 py-6 max-w-lg mx-auto w-full">
          {activeView === "formRegister" && (
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                  ลงทะเบียนแรงงาน
                </h2>
                <form onSubmit={submitRegister}>
                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ชื่อ-นามสกุล
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleChange}
                        placeholder="ชื่อ-นามสกุล"
                        className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="skill"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ทักษะงาน
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseIcon size={18} className="text-gray-400" />
                      </div>
                      <select
                        id="skill"
                        name="skill"
                        value={formValues.skill}
                        onChange={handleChange}
                        className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8] appearance-none bg-no-repeat bg-right"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundSize: "1.5em 1.5em",
                        }}
                        required
                      >
                        <option value="" disabled>
                          เลือกทักษะงาน
                        </option>
                        <option value="ช่างปูน">ช่างปูน</option>
                        <option value="ช่างไฟฟ้า">ช่างไฟฟ้า</option>
                        <option value="ช่างเหล็ก">ช่างเหล็ก</option>
                        <option value="ช่างไม้">ช่างไม้</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      พื้นที่ทำงาน
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formValues.location}
                        onChange={handleChange}
                        placeholder="จังหวัด/พื้นที่ทำงาน"
                        className="w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0061A8]"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white py-3 rounded-lg font-medium hover:from-[#004C85] hover:to-[#1976D2] transition-colors shadow-sm"
                  >
                    บันทึกข้อมูล
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeView === "dashboard" && (
            <WorkerDashboard
              workers={workers}
              onWorkerSelect={handleWorkerSelect}
              onAssignJob={handleAssignJob}
            />
          )}

          {activeView === "profile" && (
            <WorkerProfile
              worker={selectedWorker}
              onBack={() => setActiveView("dashboard")}
              onAssignJob={handleAssignJob}
              setLoading={setLoading}
              showToast={(msg: string) => toast.success(msg)}
            />
          )}

          {activeView === "job-assignment" && (
            <JobAssignmentPage
              worker={selectedWorker}
              onBack={() => {
                setAssigningJob(false);
                setActiveView("profile");
              }}
              onSubmit={() => {
                setAssigningJob(false);
                setActiveView("dashboard");
              }}
              setLoading={setLoading}
              showToast={(msg: string) => toast.success(msg)}
            />
          )}

          {activeView === "job-confirmation" && (
            <WorkerJobConfirmationPage
              onAccept={() => setActiveView("clock-in-out")}
              onReject={() => setActiveView("dashboard")}
            />
          )}

          {activeView === "clock-in-out" && (
            <ClockInOutPage onBack={() => setActiveView("dashboard")} />
          )}

          {activeView === "review" && (
            <CustomerReviewPage
              worker={selectedWorker}
              onSubmit={() => setActiveView("dashboard")}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white shadow-lg px-4 py-3 sticky bottom-0 border-t border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView("formRegister")}
              className={`flex-1 py-2.5 rounded-lg font-medium text-center shadow-sm flex items-center justify-center ${
                activeView === "formRegister"
                  ? "bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ClipboardListIcon size={18} className="mr-2" />
              สมัครแรงงาน
            </button>
            <button
              onClick={() => setActiveView("dashboard")}
              className={`flex-1 py-2.5 rounded-lg font-medium text-center shadow-sm flex items-center justify-center ${
                activeView === "dashboard" ||
                activeView === "profile" ||
                activeView === "job-assignment" ||
                activeView === "job-confirmation" ||
                activeView === "clock-in-out" ||
                activeView === "review"
                  ? "bg-gradient-to-r from-[#0061A8] to-[#1E88E5] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <LayoutDashboardIcon size={18} className="mr-2" />
              Dashboard
            </button>
          </div>
        </nav>
      </LoadingOverlay>
    </div>
  );
}
