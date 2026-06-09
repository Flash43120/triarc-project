import Layout from "../components/Layout";
import { useEffect, useState } from "react";

import { getJobs }
  from "../services/jobService";

import { getJobPhotos }
  from "../services/photoService";
  // หน้า Home ของลูกค้า
  export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobCode, setJobCode] = useState("");
    const [product, setProduct] = useState("");
    useEffect(() => {

  getJobs()
    .then((data) => {
      setJobs(data);
    });

}, []);

    const createJob = async () => {

    const res = await fetch(
  "/api/jobs",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customerId: 1,
          product: product,
          status: "ใหม่",
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    setJobs([...jobs, data]);

    setProduct("");
  };
  
const steps = [
  "ตัด",
  "ประกอบ",
  "กำลังเชื่อม",
  "ขัดเงา",
  "ติดตั้ง"
];

const getStepIndex = (status) => {
  return steps.indexOf(status);
};



// เก็บรูปล่าสุดของงาน
const [latestPhoto, setLatestPhoto] =
  useState(null);


  // ค้นหา Job
const searchJob = async () => {

  const found = jobs.find(
    job => job.jobCode === jobCode
  );

  setSelectedJob(found);

  // ถ้าไม่เจอ
  if (!found) return;

  // ดึงรูปของงาน

const photos =
  await getJobPhotos(
    found.id
  );

  // มีรูป
  if (photos.length > 0)
  {
    setLatestPhoto(
      photos[0]
    );
  }
  else
  {
    setLatestPhoto(
      null
    );
  }
};

  
    return (
      // ใช้ Layout กลางของระบบ
      <Layout>
        {/* Header */}
        <div className="p-6 text-center border-b">
          {/* ชื่อบริษัท */}
          <h1 className="text-3xl font-bold">TRIARC</h1>

          {/* คำอธิบาย */}
          <p className="text-gray-500 mt-1">Stainless System</p>
        </div>

        {/* Tracking Section */}
        <div className="p-5">
          {/* หัวข้อ */}
          <h2 className="text-xl font-semibold mb-3">ติดตามงาน</h2>

          {/* ช่องกรอกรหัสใบเสนอราคา */}
          <input
  type="text"
  placeholder="กรอกเลขงาน"
  value={jobCode}
  onChange={(e) => setJobCode(e.target.value)}
  className="w-full border rounded-2xl p-4 text-lg"
/>
        
          {/* ปุ่มตรวจสอบ */}
         <button
  onClick={searchJob}
  className="w-full bg-black text-white mt-4 p-4 rounded-2xl text-lg font-semibold"
>
  ตรวจสอบสถานะ
</button>
        </div>

      
  {/* Backend Jobs */}
  <div className="p-5">

    <h2 className="text-xl font-bold mb-4">
      งานจาก Backend
    </h2>

    {selectedJob && (

<div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

  <div className="mb-6">
    <h3 className="text-xl font-bold">
      สถานะงาน
    </h3>

    {
  latestPhoto && (

    <div className="mt-6">

      <h3 className="font-bold mb-2">

        ภาพล่าสุด

      </h3>

      <img
  src={latestPhoto.imageUrl}

        alt="job"

        className="
        w-full
        rounded-3xl
        shadow
        "

      />

    </div>

  )
}

    <p className="text-gray-500 text-sm mt-1">
      เลขงาน {selectedJob.jobCode}
    </p>
  </div>

  <div className="relative">

    {steps.map((step, index) => {

      const current =
        getStepIndex(selectedJob.status);

      const isDone = index < current;
      const isActive = index === current;

      return (

        <div
          key={step}
          className="flex gap-4 relative"
        >

          {/* Line */}
         {index !== steps.length - 1 && (
  <div
    className={`
      absolute
      left-[13px]
      top-7
      w-[2px]

      ${
        index < current
          ? "bg-black"
          : "bg-gray-200"
      }

      ${
        index === current - 1
          ? "h-10"
          : "h-16"
      }
    `}
  />
)}

          {/* Dot */}
         <div
  className={`
    w-7 h-7 rounded-full flex items-center
    justify-center relative z-10

    ${
      isDone
        ? "bg-black text-white"
        : isActive
        ? "border-2 border-black bg-white status-active"
        : "border-2 border-gray-300 bg-white"
    }
  `}
>
  {isDone ? (
    "✓"
  ) : isActive ? (
    <div className="w-2.5 h-2.5 rounded-full bg-black" />
  ) : null}
</div>

          {/* Content */}
          <div className="pb-10">

            <h4
              className={`
                font-semibold

                ${
                  isActive
                    ? "text-black"
                    : "text-gray-700"
                }
              `}
            >
              {step}
            </h4>

            {isActive && (
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs">
                กำลังดำเนินการ
              </div>
            )}

          </div>

        </div>

      );
    })}

  </div>

</div>

)}

  </div>
        {/* Product Section */}
        <div className="p-5 flex-1">
          {/* หัวข้อสินค้า */}
          <h2 className="text-xl font-semibold mb-4">สินค้า</h2>

          {/* Grid สินค้า */}
          <div className="grid grid-cols-2 gap-4">
            {/* Product Card */}
            <div className="bg-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
              {/* Placeholder รูปสินค้า */}
              <div className="h-28 bg-gray-300 rounded-2xl mb-3"></div>

              {/* ชื่อสินค้า */}
              <p className="font-semibold text-center">ประตูสแตนเลส</p>
            </div>

            {/* Product Card */}
            <div className="bg-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
              <div className="h-28 bg-gray-300 rounded-2xl mb-3"></div>

              <p className="font-semibold text-center">ราวบันได</p>
            </div>

            {/* Product Card */}
            <div className="bg-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
              <div className="h-28 bg-gray-300 rounded-2xl mb-3"></div>

              <p className="font-semibold text-center">ช่องรั้ว</p>
            </div>

            {/* Product Card */}
            <div className="bg-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
              <div className="h-28 bg-gray-300 rounded-2xl mb-3"></div>

              <p className="font-semibold text-center">งานสั่งทำ</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
