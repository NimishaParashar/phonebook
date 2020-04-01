const express = require("express");
const router = express.Router();
const { Contact } = require("../models/Contact");
const { authenticateUser } = require("../middlewares/authentication");
const _pageNumber = 4,
  _pageSize = 10;
router.get("/contacts", authenticateUser, function(req, res) {
  Contact.find()
    // .skip(_pageNumber > 0 ? (_pageNumber - 1) * _pageSize : 0)
    .limit(_pageSize)
    //.skip(20)
    .then(contact => {
      res.json(contact);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/contacts", authenticateUser, function(req, res) {
  const body = req.body;
  const contact = new Contact(body);
  contact.user = req.user._id;
  contact
    .save()
    .then(contact => {
      res.json(contact);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/contacts/:id", authenticateUser, function(req, res) {
  Contact.findOne({ _id: req.params.id, user: req.user._id })
    .then(contact => {
      if (contact) {
        res.json(contact);
      } else {
        res.send({});
      }
    })
    .catch(err => {
      res.send(err);
    });
});

router.put("/contacts/:id", authenticateUser, function(req, res) {
  const id = req.params.id;
  const body = req.body;
  Contact.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then(function(contact) {
      res.json(contact);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = {
  contactsRouter: router
};
