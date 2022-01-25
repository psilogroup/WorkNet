public class TaskItem
{
    [Key]
    public int Id {get;set;}
    public int ListId {get;set;}
    public string  Description { get; set; } = string.Empty;
    public bool Completed {get;set;}
    public DateTime CreatedAt {get;set;}
}