exports.post = async (req, res) => {
  var inAction = req.params.action;

  res.contentType("application/json");

  if (inAction === "verifyLogin") {
    var data = require("./routes/post-calls/verifyLogin.js");
    data(req, res);
  }
};
