// 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

module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var resp = [];
  var invitationId = req.body.invitationId;
  var emailId = req.body.emailId;
  var score = req.body.score;

  connection.query(
    "update results set score=?, status=2 where id=? and email=?",
    [score, invitationId, emailId],
    function (err, result) {
      if (!err) {
        res.send({
          status: "Success",
          message: `Update score for user ${emailId} for invitation ID: ${invitationId}`,
        });
      } else {
        res
          .status(500)
          .send({ message: "Error while updating results", details: err });
      }
    }
  );
};
