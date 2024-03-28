const express = require("express");

const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUser,
} = require("../controllers/userController");

const router = express.Router();

// CREATE data, GET data from the Collection
router.route("/").post(handleCreateUser).get(handleGetAllUsers);

// GET by id, UPDATE by id & DELETE by id
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUser);

module.exports = router;
