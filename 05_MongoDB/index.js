const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = 8000;
const app = express();
app.use(express.json());

// connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mkm")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Mongo error: ", err));

// create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

// create a model using the above schema
const User = mongoose.model("user", userSchema);

// CREATE data into the Collection
app.post("/api/users", async (req, res) => {
  // create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });
  return res.status(401).json({ msg: "User created successfully..." });
});

// GET all users
// Render HTML
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
      ${allDBUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// GET all users
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.status(200).json(allDBUsers);
});

// GET by id, UPDATE by id & DELETE by id
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // GET by id
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    // UPDATE by id
    const updateUser = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {
      ...updateUser,
    });
    return res.json(user);
  })
  .delete(async (req, res) => {
    // DELETE by id
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found..." });
    }
    return res.status(200).json({ msg: "User deleted..." });
  });

app.listen(PORT, () => {
  console.log(`Server connected at PORT: ${PORT}`);
});
