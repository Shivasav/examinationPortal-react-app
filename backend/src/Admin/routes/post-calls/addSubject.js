module.exports = async (req, res) => {
  var connection = require("../../../../index.js");

  var courseID = req.body.courseID;
  var subjectName = req.body.subjectName;
  var semester = req.body.semester;

  connection.query(
    "select count(*) as count from subjectmaster where name = '" +
      subjectName +
      "'",
    function (err1, result1) {
      if (result1[0].count > 0) {
        res.send({
          message:
            "Could not add subject because it already exists with the same name for this course! ",
          err: err1,
        });
      } else {
        connection.query(
          "insert into subjectmaster(courseID, name, semester) values(?,?,?)",
          [courseID, subjectName, semester],
          function (err, result) {
            if (err) {
              res.send({ message: "Could not add subject! ", err: err });
            } else {
              res.send({
                message: "Subject added successfully!! ",
                affectedRows: result.affectedRows,
              });
            }
          }
        );
      }
    }
  );
};
