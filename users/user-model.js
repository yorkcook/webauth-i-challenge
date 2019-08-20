module.exports = { findUsers, addUser, findBy, findById };

const knex = require("knex");

const knexConfig = require("../knexfile.js");

const Users = knex(knexConfig.development);

function findUsers() {
  return Users("users").select("id", "username", "password");
}

function addUser(user) {
  return Users("users").insert(user);
}

function findBy(filter) {
  return Users("users").where(filter);
}

function findById(id) {
  return Users("users")
    .where({ id })
    .first();
}
