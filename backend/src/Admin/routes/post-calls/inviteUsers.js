// 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

module.exports = async (req, res) => {
  if (!req.files) {
    return res
      .status(500)
      .send({ status: "Failed", message: "File is not found" });
  }

  const newpath = __basedir + "/uploads/";
  const file = req.files.file;
  const filename = file.name;
  const timestamp = +new Date();
  const excelToJson = require("convert-excel-to-json");
  var _ = require("underscore");
  const { v4: uuidv4 } = require("uuid");
  var connection = require("../../../../index.js");

  var data = [];
  var examId = req.query.examId;
  var subjectName = "";
  var examDate = "";
  console.log(examId);

  connection.query(
    "select subjectid, examDate from examinationmaster where id=?",
    [examId],
    function (err, result) {
      examDate = result[0].examDate;

      connection.query(
        "select name from subjectmaster where id=?",
        [result[0].subjectid],
        function (err1, result1) {
          subjectName = result1[0].name;

          //Move to uploads
          file.mv(`${newpath}${timestamp}_${filename}`, (err) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "File upload failed", code: 200 });
            } else {
              const result = excelToJson({
                sourceFile: `${newpath}${timestamp}_${filename}`,
                header: {
                  rows: 1,
                },
                columnToKey: {
                  "*": "{{columnHeader}}",
                },
              });

              var keys = ["email", "name"];
              if (!_.isEqual(Object.keys(result["Sheet1"][0]), keys)) {
                res.status(500).send({
                  status: "Failed",
                  message: "File is not in the correct format!",
                });
              } else {
                //Get Excel Data
                result["Sheet1"].map((row) => {
                  //Create Invitation IDs for exam for each user
                  var sql =
                    "insert into results(id, email, name examid, status, score) values (?,?,?,?,?)";
                  var invitationId = uuidv4();
                  connection.query(
                    sql,
                    [invitationId, row.email, row.name, examId, 1, "NA"],
                    function (err2, result2) {
                      if (!err2) {
                        //Send Mail
                        //sendMail(row.email, row.name, subjectName, examDate, invitationId);
                      } else {
                        console.log(err2);
                        res
                          .status(500)
                          .send({
                            status: "Failed",
                            message:
                              "Could not invite users! Please check logs!",
                          });
                      }
                    }
                  );
                });
              }
            }
          });
        }
      );
      res.send({ status: "Success", message: "Invitations sent!" });
    }
  );
};

function sendMail(email, name, subjectName, examDate, invitationId) {
  const SibApiV3Sdk = require("sib-api-v3-sdk");
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = `${subjectName} exam scheduled for ${examDate}`;
  sendSmtpEmail.htmlContent = `<html><body><h1>Hello ${name}, <br />You are scheduled for an exam for ${subjectName}</h1><h3>Click on the below link to begin your exam</h3><br /> <a href='http://localhost:5000/takeExam/${invitationId}' target='_blank'>Link to Exam</a> </body></html>`;
  sendSmtpEmail.sender = { name: "Examine", email: "info.examine@gmail.com" };
  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.replyTo = {
    email: "shivasavbhasin@gmail.com",
    name: "Shivasav Bhasin",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
}
