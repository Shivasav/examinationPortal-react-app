module.exports = async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const newpath = __basedir + "/uploads/";
  const file = req.files.file;
  const filename = file.name;
  const timestamp = +new Date();
  const excelToJson = require("convert-excel-to-json");
  var _ = require("underscore");

  var data = [];
  var subjectId = req.query.subjectId;

  file.mv(`${newpath}${timestamp}_${filename}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "File upload failed", code: 500 });
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

      var keys = [
        "type",
        "question",
        "option1",
        "option2",
        "option3",
        "option4",
        "answer",
      ];
      if (!_.isEqual(Object.keys(result["Sheet1"][0]), keys)) {
        res.status(500).send({
          status: "Failed",
          message: "File is not in the correct format!",
        });
      } else {
        //insert into database
        var connection = require("../../../../index.js");
        var sql =
          "insert into questions(question, option1, option2, option3, option4, answer, type, subjectid) values ?";
        var values = [];

        result["Sheet1"].map((row) => {
          var rowData = [];
          rowData.push("" + row.question);
          rowData.push("" + row.option1);
          rowData.push("" + row.option2);
          rowData.push("" + row.option3);
          rowData.push("" + row.option4);
          rowData.push("" + row.answer);
          rowData.push("" + row.type);
          rowData.push(parseInt(subjectId));
          values.push(rowData);
        });

        connection.query(sql, [values], function (err, result) {
          res
            .status(200)
            .send({ message: "File Uploaded", code: 200, result: result });
        });
      }
    }
  });
};
