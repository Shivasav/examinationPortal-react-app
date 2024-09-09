module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var examId = req.query.examId;

  var sql = "select * from results where examId=?";
  var resToSend = [];

  connection.query(sql, [examId], function (err, result) {
    connection.query(
      "select name as subjectName from subjectmaster where id=(select subjectid from examinationmaster where id=?)",[examId], function (err1, result1){
          let subjectName = result1[0].subjectName;

          result.map((data) => {
            let record = {
                id: "",
                name: "",
                email: "",
                subjectName: "",
                score: "",
                status: "",
              };
              record.id = data.id;
              record.name = data.name;
              record.email = data.email;
              record.subjectName = subjectName;
              record.score = data.score;
              record.status = data.status === 2 ? "Completed" : "Pending";

              resToSend.push(record)
          })

          res.send(resToSend);
      }
    );
  });
};
