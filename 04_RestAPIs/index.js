const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const users = require("./MOCK_DATA.json");
const { log } = require("console");

const app = express();
app.use(express.json());

const PORT = 8000;

// middlewares
app.use(express.urlencoded({ extended: false }));

function userExists(req, res, next) {
  const userId = Number(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found..." });
  }
  req.user = user;
  next();
}

// USING "https://mockaroo.com/" FOR MOCK DATA TO KEARN RestApiS

//Routes
//GET request
app.get("/users", (req, res) => {
  // render html if the user is going to see the data from the browser
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// render json if it is to be used by front end
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// GET by id -- see below
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// POST request
app.post("/api/users", (req, res) => {
  // create new user
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Successfully added", id: users.length });
  });
});

// PATCH request -- see below
// app.patch("/api/users/:id", (res, req) => {
//   // edit user data
//   return res.statusMessage("pending");
// });

// DELETE request -- see below
// app.delete("/api/users/:id", (res, req) => {
//   // delete a user
//   return res.statusMessage("pending");
// });

// If we notice, the routes for GET by id, PATCH and DELETE are the same, so we can merge them in a single group...
app
  .route("/api/users/:id")
  .get(userExists, async (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user);
  })
  .patch(userExists, async (req, res) => {
    // edit user data
    const userId = Number(req.params.id);
    const updateUser = req.body;

    const updatedUser = users.map((user) => {
      if (user.id === userId) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUser), (err) => {
      if (err) {
        res.statusCode(500).json({ message: "Internal server error" });
      }
      res.json({ message: "User Updated successfully" });
    });
  })
  .delete(userExists, async (req, res) => {
    // delete a user
    const userId = Number(req.params.id);
    const updateData = users.filter((user) => user.id !== userId);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updateData), (err) => {
      if (err) {
        res.statusCode(500).json({ message: "Internal server error" });
      }
      res.json({ message: "User deleted successfully" });
    });
  });

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
