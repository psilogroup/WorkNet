# Build and Run with docker

You need docker installed on your machine.

In appseetings.json file change the connection string for your local MySQL Server
```json
"ConnectionStrings": {
    "Work": "server=localhost;database=work;user=user;password=password"
  },
```


### Build and Run
In application root folder Run

```bash
docker build -t worknet .
docker run --name WorkNetInstance -d -p 5000:80 worknet
```

Just it now application running in http://localhost:5000
