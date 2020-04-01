const express = require("express");
const setupDB = require("./config/database");
const { usersRouter } = require("./app/controllers/UsersControllers");
const port = 3010;
const { contactsRouter } = require("./app/controllers/ContactsControllers");
const app = express();

setupDB();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/users", contactsRouter);
app.listen(port, function() {
  console.log("listening on port", port);
});
