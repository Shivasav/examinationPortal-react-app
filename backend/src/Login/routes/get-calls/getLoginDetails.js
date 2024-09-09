module.exports = async (req, res) => {
  var connection = require("../../../../index.js");
  connection.query("select username, role from Login", function (err, result) {
    res.send(result);
  });
};
