module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var courseId = req.query.courseId;
  var semester = req.query.semester;

  connection.query(
    "select id, name from subjectmaster where semester=? and courseid=?",
    [semester, courseId],
    function (err, result) {
      //res.send(result);

      var resultToSend = [];

      result.map((el) => {
        resultToSend.push({
          id: el.id,
          name: el.name,
        });
      });

      res.send(resultToSend);
    }
  );
};
