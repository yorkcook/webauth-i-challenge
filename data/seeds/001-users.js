exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "York", password: "LovesLauren" },
        { id: 2, username: "Lauren", password: "LovesYork" }
      ]);
    });
};
