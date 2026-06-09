namespace backend.Models
{
    public class JobPhoto
    {
        // Primary Key
        public int Id { get; set; }

        // Foreign Key
        public int JobId { get; set; }

        // Navigation Property
        public Job? Job { get; set; }

        // Path รูปภาพ
        public string ImageUrl { get; set; } = "";

        // วันที่อัปโหลด
        public DateTime CreatedAt { get; set; }
            = DateTime.Now;
    }
}