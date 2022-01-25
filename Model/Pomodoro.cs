public class Pomodoro
{
    [Key]
    public int Id {get;set;}
    public string UserId {get;set;} = string.Empty;
    public int Work {get;set;}
    public int Relax {get;set;}
}