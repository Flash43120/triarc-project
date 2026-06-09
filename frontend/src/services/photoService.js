// ดึงรูปงาน
export const getJobPhotos =
  async (jobId) => {

  const res = await fetch(
    `/api/jobphotos/${jobId}`
  );

  if (!res.ok)
    throw new Error(
      "โหลดรูปไม่สำเร็จ"
    );

  return await res.json();
};

// อัปโหลดรูป
export const uploadPhoto =
  async (jobId, file) => {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const res = await fetch(
    `/api/jobphotos/upload?jobId=${jobId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res;
};