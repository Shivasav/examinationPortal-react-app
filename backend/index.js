var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");
const fileupload = require("express-fileupload");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static("uploads"));

app.use(cors());

global.__basedir = __dirname;

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

const loginGet = require("./src/Login/login.get.js");
app.get("/api/login/:action", cors(), loginGet.get);

var loginPost = require("./src/Login/login.post.js");
app.post("/api/login/:action", cors(), loginPost.post);

const adminGet = require("./src/Admin/admin.get.js");
app.get("/api/admin/:action", cors(), adminGet.get);

var adminPost = require("./src/Admin/admin.post.js");
app.post("/api/admin/:action", cors(), adminPost.post);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MacPass#123",
  database: "examinationdb",
});

connection.connect();

app.listen(5000);

module.exports = connection;
