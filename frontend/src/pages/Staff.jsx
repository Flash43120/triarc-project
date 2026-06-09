import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";

// หน้าพนักงาน
// หน้าพนักงาน
export default function Staff() {

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
  getJobs()
    .then((data) => {
      setJobs(data);
    });
}, []);
  // เก็บ id งานที่กำลังเปิดอยู่
  const [openJob, setOpenJob] = useState(null);

  // งานที่กำลังจะแก้ไขสถานะ
  const [selectedJob, setSelectedJob] = useState(null);

  const completedJobs = jobs.filter((job) => job.status === "ติดตั้ง").length;

  const progressMap = {
    ตัด: 20,
    ประกอบ: 40,
    กำลังเชื่อม: 60,
    ขัดเงา: 80,
    ติดตั้ง: 100,
  };

  // ฟังก์ชันอัปเดตสถานะงาน
  const updateStatus = async (jobId, newStatus) => {
    // เรียก PUT API
    await fetch(`/api/jobs/${jobId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status: newStatus,
      }),
    });

    // โหลดข้อมูลใหม่จาก Backend
    const res = await fetch("/api/jobs");

    const data = await res.json();

    // อัปเดต State
    setJobs(data);

    // ปิด Modal
    setSelectedJob(null);
  };

  // อัปโหลดรูปงาน
  const uploadPhoto = async (jobId, file) => {
    alert("เริ่มอัปโหลด");

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
      `/api/jobphotos/upload?jobId=${jobId}`,
      {
        method: "POST",
        body: formData,
      },
    );

    alert("Status = " + res.status);

    const text = await res.text();

    console.log(text);

    alert("อัปโหลดสำเร็จ");
  };

  return (
    <Layout>
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold">STAFF DASHBOARD</h1>

        <p className="text-gray-500 mt-1">TRIARC SYSTEM</p>
      </div>

      {/* Summary */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">สรุปงานวันนี้</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* งานทั้งหมด */}
          <div className="bg-black text-white rounded-3xl p-5">
            <p className="text-sm text-gray-300">งานทั้งหมด</p>

            <h1 className="text-3xl font-bold mt-2">{jobs.length}</h1>
          </div>

          {/* งานเสร็จ */}
          <div className="bg-green-500 text-white rounded-3xl p-5">
            <p className="text-sm text-green-100">งานเสร็จ</p>

            <h1 className="text-3xl font-bold mt-2">{completedJobs}</h1>
          </div>
        </div>
      </div>
      {/* รายการงานทั้งหมด */}
      <div className="px-5 pb-5">
        {/* หัวข้อ */}
        <h2 className="text-xl font-semibold mb-4">งานทั้งหมด</h2>

        {/* วนลูปแสดงงานจาก API */}
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setOpenJob(openJob === job.id ? null : job.id)}
            className="
  bg-gray-100
  rounded-3xl
  p-5
  mb-4
  cursor-pointer
  "
          >
            {/* ส่วนบนของ Card */}
            <div className="flex justify-between items-start">
              {/* ฝั่งซ้าย */}
              <div>
                {/* ชื่อสินค้า */}
                <h3 className="font-bold text-xl">{job.product}</h3>

                {/* รหัสงาน */}
                <span
                  className="
            inline-block
            mt-2
            bg-gray-100
            px-3
            py-1
            rounded-xl
            text-sm
            font-semibold
            "
                >
                  {job.jobCode}
                </span>
              </div>

              {/* ฝั่งขวา */}
              <div className="flex items-center gap-2">
                {/* สถานะงาน */}
                <div
                  className="
            bg-black
            text-white
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            "
                >
                  {job.status}
                </div>
              </div>
            </div>

            {/* แสดงเมื่อกดเปิด */}
            {openJob === job.id && (
              <div className="mt-5">
                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div
                    className="
                h-3
                bg-green-500
                rounded-full
                "
                    style={{
                      width: `${progressMap[job.status] || 0}%`,
                    }}
                  />
                </div>

                {/* เปอร์เซ็นต์ */}
                <p className="text-sm text-gray-500 mt-2">
                  ดำเนินการ {progressMap[job.status] || 0}%
                </p>

                {/* ปุ่มจัดการ */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={(e) => {
                      // ไม่ให้ Card ปิด
                      e.stopPropagation();

                      // เก็บงานที่เลือก
                      setSelectedJob(job);
                    }}
                    className="
  flex-1
  bg-black
  text-white
  p-3
  rounded-2xl
  "
                  >
                    อัปเดตสถานะ
                  </button>

                 <label
  onClick={(e) => {
    e.stopPropagation();
  }}
  className="
  flex-1
  border
  p-3
  rounded-2xl
  text-center
  cursor-pointer
  "
>

  ถ่ายรูปงาน

<input
  type="file"
  accept="image/*"
  hidden

  onClick={(e) => {
    e.stopPropagation();
  }}

  onChange={(e) => {

    alert("CHANGE");

    const file =
      e.target.files[0];

    if(file)
    {
      uploadPhoto(
        job.id,
        file
      );
    }

  }}
/>

</label>
                  
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal เปลี่ยนสถานะ */}
      {selectedJob && (
        <div
          className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      "
        >
          {/* กล่อง Modal */}
          <div
            className="
        bg-white
        p-6
        rounded-3xl
        w-80
        "
          >
            {/* หัวข้อ */}
            <h2
              className="
          text-xl
          font-bold
          mb-4
          "
            >
              เปลี่ยนสถานะงาน
            </h2>

            {/* รายการสถานะ */}
            {["ตัด", "ประกอบ", "กำลังเชื่อม", "ขัดเงา", "ติดตั้ง"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedJob.id, status)}
                  className="
              w-full
              border
              p-3
              rounded-2xl
              mb-2
              "
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
