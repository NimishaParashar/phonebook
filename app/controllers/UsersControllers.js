const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const _ = require("lodash");
const { authenticateUser } = require("../middlewares/authentication");

router.post("/register", function(req, res) {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/login", function(req, res) {
  const body = req.body;
  User.findByCredentials(body.email, body.password)
    .then(function(user) {
      //res.json(user);

      return user.generateToken();
    })
    .then(function(token) {
      // res.json(token);
      res.setHeader("x-auth", token).send({});
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.delete("/logout", authenticateUser, function(req, res) {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(function() {
      res.send({ notice: "Successfully logout" });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/account", authenticateUser, function(req, res) {
  const { user } = req;
  res.send(_.pick(user, ["_id", "username", "email"]));
});

module.exports = {
  usersRouter: router
};
