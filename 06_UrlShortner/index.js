const express = require("express");

const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/url.routes");

const app = express();
app.use(express.json());
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("MongoDB connected...");
});

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
