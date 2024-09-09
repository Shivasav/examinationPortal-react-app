module.exports = async (req, res) => {
  var connection = require("../../../../index.js");
  connection.query(
    "select id, name, semester_count from coursemaster",
    function (err, result) {
      //res.send(result);

      var resultToSend = [];

      result.map((el) => {
        resultToSend.push({
          id: el.id,
          name: el.name,
          semesterCount: el.semester_count,
        });
      });

      res.send(resultToSend);
    }
  );
};
