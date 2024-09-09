exports.post = async (req, res) => {
  var inAction = req.params.action;

  res.contentType("application/json");

  if (inAction === "addSubject") {
    var data = require("./routes/post-calls/addSubject.js");
    data(req, res);
  } else if (inAction === "uploadFile") {
    var data = require("./routes/post-calls/uploadFile.js");
    data(req, res);
  } else if (inAction === "createExam") {
    var data = require("./routes/post-calls/createExam.js");
    data(req, res);
  } else if (inAction === "inviteUsers") {
    var data = require("./routes/post-calls/inviteUsers.js");
    data(req, res);
  } else if (inAction === "takeExam") {
    var data = require("./routes/post-calls/takeExam.js");
    data(req, res);
  }else if(inAction === "submitExam"){
    var data = require("./routes/post-calls/submitExam.js");
    data(req,res);
  }
};
