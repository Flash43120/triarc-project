using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    // URL
    // /api/jobphotos
    [Route("api/[controller]")]
    [ApiController]
    public class JobPhotosController : ControllerBase
    {
        // เชื่อมฐานข้อมูล
        private readonly AppDbContext _context;

        // Constructor
        public JobPhotosController(
            AppDbContext context)
        {
            _context = context;
        }

        // Upload รูป
        [HttpPost("upload")]

        public async Task<IActionResult> UploadPhoto(

            // รับไฟล์รูป
            IFormFile file,

            // รับ Job Id
            int jobId)
        {
            // ไม่มีไฟล์
            if (file == null)
            {
                return BadRequest(
                    "ไม่พบไฟล์"
                );
            }

            // สร้างชื่อไฟล์ใหม่
            var fileName =
                Guid.NewGuid()
                + Path.GetExtension(
                    file.FileName
                );

            // path จริงบน server
            var filePath =
                Path.Combine(
                    "wwwroot/uploads",
                    fileName
                );

            // บันทึกไฟล์ลงเครื่อง
            using (
                var stream =
                new FileStream(
                    filePath,
                    FileMode.Create
                )
            )
            {
                await file.CopyToAsync(
                    stream
                );
            }

            // สร้างข้อมูลในฐานข้อมูล
            var photo =
                new JobPhoto
                {
                    JobId = jobId,

                    ImageUrl =
                        "/uploads/"
                        + fileName
                };

            // เพิ่มข้อมูล
            _context.JobPhotos.Add(
                photo
            );

            // Save MySQL
            await _context.SaveChangesAsync();

            return Ok(photo);
        }

        // ดึงรูปทั้งหมดของงาน
[HttpGet("{jobId}")]
public IActionResult GetPhotos(
    int jobId)
{
    var photos =
        _context.JobPhotos

        .Where(
            x => x.JobId == jobId
        )

        .OrderByDescending(
            x => x.CreatedAt
        )

        .ToList();

    return Ok(photos);
}
    }
}