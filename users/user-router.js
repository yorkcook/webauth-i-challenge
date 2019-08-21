const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const restricted = require("../auth/restricted-middleware.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("IT IS ALIVEEE!!!");
});

router.get("/users", restricted, (req, res) => {
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

  const hash = bcrypt.hashSync(user.password);
  user.password = hash;

  Users.addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        message: "We do not want that person on our team! They stink!"
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.movie = "Top Gun";
        req.session.username = user.username;
        req.session.cookie = { ...req.session.cookie, userID: user.id };
        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, session: req.session });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error!!!" });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    res.status(200).json({ message: "Bye Felcia!!" });
  });
});

module.exports = router;
