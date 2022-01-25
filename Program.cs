using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
 
var connectionString = builder.Configuration.GetConnectionString("Work");

builder.Services.AddDbContext<WorkContextDb>(options 
    => options.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString))
        .LogTo(Console.WriteLine,LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors());

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/health", () => "Weee!");

app.MapGet("/todo",  async (WorkContextDb db,string userid) 
    =>  {

        var content = await db.TodoItems.Where(s => s.UserId == userid).ToListAsync();
        return Results.Ok(content);
    });

app.MapPost("/todo", async (WorkContextDb db,TodoItem todo) => {
    await db.TodoItems.AddAsync(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todo/{todo.Id}",todo);
});

app.MapPut("/todo/{id}", async (WorkContextDb db, TodoItem updateItem, int id) =>
{
    var item = await db.TodoItems.FindAsync(id);
    if (item is null) return Results.NotFound(id);    
    item.Description = updateItem.Description;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/todo/{id}", async (WorkContextDb db, int id) => {
    var item = await db.TodoItems.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.TodoItems.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapGet("/task",async (WorkContextDb db,int listid) 
    => await db.TaskItems.Where(x => x.ListId == listid).ToListAsync());


app.MapPost("/task", async (WorkContextDb db, TaskItem item) => {
    await db.TaskItems.AddAsync(item);
    await db.SaveChangesAsync();
    return Results.Created($"/task/{item.Id}",item);
});

app.MapPut("/task/{id}", async (WorkContextDb db, TaskItem itemupdate, int id) => {
     var item = await db.TaskItems.FindAsync(id);
    if (item is null) return Results.NotFound(id);    
    item.Description = itemupdate.Description;
    item.Completed = itemupdate.Completed;
    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.MapDelete("/task/{id}", async (WorkContextDb db, int id) => {
    var item = await db.TaskItems.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.TaskItems.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok();
});


app.MapGet("/memo/{id}", async (WorkContextDb db, string id)
    => await db.Memos.FirstOrDefaultAsync(x => x.UserId == id));

app.MapPut("/memo/{id}", async (WorkContextDb db,Memo memoupdate,string id) => {
    var memo = await db.Memos.FirstOrDefaultAsync(x => x.UserId == id);
    if (memo is null){
        memoupdate.UserId = id;
        await db.Memos.AddAsync(memoupdate);
    }
    else
    {
        memo.UserId = id;
        memo.Text = memoupdate.Text;
    }
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/pomodoro/{id}", async (WorkContextDb db, string id)
    => await db.Memos.FirstAsync(x => x.UserId == id));


app.MapPut("/pomodoro/{id}", async (WorkContextDb db,Pomodoro pomodoroupdate,string id) => {
    var pomo = await db.Pomodoros.FirstAsync(x => x.UserId == id);
    if (pomo is null){
        pomodoroupdate.UserId = id;
        await db.Pomodoros.AddAsync(pomodoroupdate);
    }
    else
    {
        pomo.Relax = pomodoroupdate.Relax;
        pomo.Work = pomodoroupdate.Work;
        pomo.UserId = id;
    }

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();