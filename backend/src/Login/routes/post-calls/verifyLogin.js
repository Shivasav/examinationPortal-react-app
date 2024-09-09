module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var username = req.body.username;
  var password = req.body.password;

  connection.query(
    "select username, role, Name from Login where username='" +
      username +
      "' and password='" +
      password +
      "'",
    function (err, result) {
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.send({ error: "Invalid Credentials" });
      }
    }
  );
};
