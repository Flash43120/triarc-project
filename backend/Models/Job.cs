namespace backend.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string JobCode { get; set; } = "";

        // FK
        public int CustomerId { get; set; }

        // Navigation Property
       public Customer? Customer { get; set; }

        public string Product { get; set; } = "";

        public string Status { get; set; } = "";
    }
}

