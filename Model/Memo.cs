public class Memo
{
    [Key]
    public int Id { get; set; }
    public string UserId {get;set;} = string.Empty;
    public string? Text {get;set;}

}