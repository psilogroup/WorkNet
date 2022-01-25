using Microsoft.EntityFrameworkCore;


public class WorkContextDb : DbContext
{
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<TaskItem> TaskItems => Set<TaskItem>();
    public DbSet<Memo> Memos => Set<Memo>();
    public DbSet<Pomodoro> Pomodoros => Set<Pomodoro>();
    public WorkContextDb(DbContextOptions<WorkContextDb> options) : base(options) {}
}