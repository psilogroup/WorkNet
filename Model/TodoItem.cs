
public class TodoItem
{
    
    [Key]
    public int Id {get;set;}
    public string UserId {get;set;}
    public string Description {get;set;}
    
    public TodoItem(string userId,string description)
    {
        UserId = userId;
        Description = description;
    }
}