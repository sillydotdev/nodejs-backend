const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hi from Home page");
});

app.get("/about", (req, res) => {
  // return res.send("Hi from About page" + req.query.name);
  return res.send(`HELLO: ${req.query.name}`);
});

app.listen(8000, () => console.log("Server is running......"));
