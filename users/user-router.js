const express = require("express");
//const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
// const knex = require("knex");
// const knexConfig = require("../knexfile.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("IT IS ALIVEEE!!!");
});

router.get("/users", (req, res) => {
  Users.findUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "You do not have clearance to know our users!" });
    });
});

router.post("/register", (req, res) => {
  let user = req.body;

  Users.addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: "We do not want that person on our team! They stink!"
        });
    });
});

router.post("/login", (req, res) => {});

module.exports = router;
