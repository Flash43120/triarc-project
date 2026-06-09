using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetJobs()
        {
            var jobs = _context.Jobs
    .Include(j => j.Customer)
    .ToList();

            return Ok(jobs);
        }
        [HttpPost]
public IActionResult CreateJob(Job job)
{
    _context.Jobs.Add(job);

    _context.SaveChanges();

    var newJob = _context.Jobs
    .Include(j => j.Customer)
    .FirstOrDefault(j => j.Id == job.Id);

    return Ok(job);
}

// อัปเดตสถานะงาน
[HttpPut("{id}")]
public async Task<IActionResult> UpdateStatus(
    int id,
    Job updatedJob)
{
    var job =
        await _context.Jobs.FindAsync(id);

    if (job == null)
    {
        return NotFound();
    }

    job.Status = updatedJob.Status;

    await _context.SaveChangesAsync();

    return Ok(job);
}
    }
}

