const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
app.post("/api/users", (res, req) => {
  // create new user
  return res.json({ status: "pending" });
});

// PATCH request -- see below
// app.patch("/api/users/:id", (res, req) => {
//   // edit user data
//   return res.statusMessage("pending");
// });

// DELETE request -- see below
// app.post("/api/users/:id", (res, req) => {
//   // delete a user
//   return res.statusMessage("pending");
// });

// If we notice, the routes for GET by id, PATCH and DELETE are the same, so we can merge them in a single group...
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((res, req) => {
    // edit user data
    return res.json({ status: "pending" });
  })
  .delete((res, req) => {
    // delete a user
    return res.json({ status: "pending" });
  });

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
