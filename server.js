const express = require("express");
const helmet = require("helmet");
//const cors = require('cors')
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("./users/user-router.js");
const knexConnection = require("./dbConfig.js");

const server = express();

const sessionOptions = {
  name: "A Love Story",
  secret: process.env.COOKIE_SECRET || "keep it secret, keep it safe",
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
};

server.use(helmet());
server.use(express.json());
//server.use(cors())
server.use(session(sessionOptions));

server.use("/api", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "up", session: req.session });
});

module.exports = server;
