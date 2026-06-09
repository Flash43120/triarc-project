// ดึงงานทั้งหมด
export const getJobs = async () => {
  const res = await fetch("/api/jobs");

  if (!res.ok)
    throw new Error("โหลดงานไม่สำเร็จ");

  return await res.json();
};

// อัปเดตสถานะงาน
export const updateJobStatus = async (
  jobId,
  status
) => {

  const res = await fetch(
    `/api/jobs/${jobId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  return res;
};