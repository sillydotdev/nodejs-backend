const User = require("../models/user");

// CREATE a new user
async function handleCreateUser(req, res) {
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
  return res
    .status(401)
    .json({ msg: "User created successfully...", id: result._id });
}

// GET all users
async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.status(200).json(allDBUsers);
}

// GET user by id
async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

// UPDATE user by id
async function handleUpdateUserById(req, res) {
  const updateUser = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    ...updateUser,
  });
  return res.json(user);
}

// DELETE user by id
async function handleDeleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found..." });
  }
  return res.status(200).json({ msg: "User deleted..." });
}

module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUser,
};
