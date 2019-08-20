module.exports = restricted;

function restricted(req, res, next) {
  if (req && req.session && req.session.username) {
    next();
  } else {
    res
      .status(404)
      .json({ message: "No, no, no you ain't allowed up in here!" });
  }
}

// const bcrypt = require("bcryptjs");

// const Users = require("../users/user-model.js");

// module.exports = restricted;

// function restricted(req, res, next) {
//   let { username, password } = req.headers;

//   if (username && password) {
//     Users.findUsers({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: "Your credentials suck!!" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "You done got smurfed" });
//       });
//   } else {
//     res.status(400).json({ message: "Please provide the secret codes." });
//   }
// }
