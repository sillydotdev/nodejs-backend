const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/url.routes");
const staticRoute = require("./routes/static.routes")
const URL = require("./models/url.model");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("MongoDB connected...");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute)

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
