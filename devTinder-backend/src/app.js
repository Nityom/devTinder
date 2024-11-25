
const express = require("express");
const app = express();

app.get("/", (req, res) => {
res.send("Namaste Nityom!");
});

app.get("/hello", (req, res) => {
res.send("Hello hello hello!");
});

app.get("/test", (req, res) => {
res.send("Hello from the server!");
});

app.get("/start", (req, res) => {f
    res.send("Start from the server!");
    });
    
app.listen(3000, ()=>{
    console.log('server is successfully started');
    
});