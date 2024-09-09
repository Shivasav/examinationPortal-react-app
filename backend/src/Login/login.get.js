exports.get = async (req, res) => {
  var inAction = req.params.action;

  res.contentType("application/json");

  if (inAction === "getLoginDetails") {
    var data = require("./routes/get-calls/getLoginDetails.js");
    data(req, res);
  }
};
