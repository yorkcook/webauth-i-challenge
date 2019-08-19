module.exports = { findUsers, addUser };

const knex = require("knex");

const knexConfig = require("../knexfile.js");

const Users = knex(knexConfig.development);

function findUsers() {
  return Users("users").select("id", "username", "password");
}

function addUser(user) {
  return Users("users").insert(user);
}
