module.exports = async (req, res) => {
    var connection = require("../../../../index.js");

    var subjectId = req.query.subjectId;
    var filter = req.query.filter;

    var sql = "select id, examDate from examinationmaster where subjectid=? and examDate > NOW()";

    if(filter === 'all'){
      sql = "select id, examDate from examinationmaster where subjectid=?"
    }
  
    connection.query(
      sql,
      [subjectId],
      function (err, result) {
        //res.send(result);
  
        var resultToSend = [];
  
        result.map((el) => {
          resultToSend.push({
            id: el.id,
            examDate: el.examDate
          });
        });
  
        res.send(resultToSend);
      }
    );
  };
  