// 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

module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var resp = [];
  var invitationId = req.body.invitationId;
  var emailId = req.body.emailId;

  connection.query(
    "select examId from results where id=? and email=? and status=1",
    [invitationId, emailId],
    function (err, result) {
      if (result.length === 0) {
        res
          .status(404)
          .send({ message: "No Exam for these details",questions: [],  code: 404 });
      } else {
        connection.query(
          "select questionIds from examinationmaster where id=?",
          [result[0].examId],
          function (err1, result1) {
            connection.query(
              `select question, option1, option2, option3, option4, answer from questions where id in (${result1[0].questionIds})`,
              function (err2, result2) {
                result2.map((question, index) => {
                  var respData = {
                    questionText: "",
                    answerOptions: [
                      { answerText: "", isCorrect: false },
                      { answerText: "", isCorrect: false },
                      { answerText: "", isCorrect: false },
                      { answerText: "", isCorrect: false },
                    ],
                  };
                  //Set the question
                  respData.questionText = result2[index].question;

                  //Set the correct answer
                  respData.answerOptions[
                    result2[index].answer - 1
                  ].isCorrect = true;

                  //Set Options
                  respData.answerOptions[0].answerText = result2[index].option1;
                  respData.answerOptions[1].answerText = result2[index].option2;
                  respData.answerOptions[2].answerText = result2[index].option3;
                  respData.answerOptions[3].answerText = result2[index].option4;

                  resp.push(respData);
                });

                res.send({ status: "Success", questions: resp });
              }
            );
          }
        );
      }
    }
  );
};
