const express = require("express");
const { connectMongoDb } = require("./connection");

const bodyParser = require("body-parser");

const userRouter = require("./routes/user");

const PORT = 8000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Mongo connection
connectMongoDb("mongodb://127.0.0.1:27017/mkm").then(() =>
  console.log("MongoDB connected"),
);

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server connected at PORT: ${PORT}`);
});
