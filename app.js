// get the client
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "my_mvc_bdd",
});

const displayResults = (req, res) => {
  const limit = !isNaN(req.query.limit) ? parseInt(req.query.limit) : 3;
  // simple query
  connection.query(
    "SELECT * FROM picture ORDER BY id DESC LIMIT " + limit,
    function (err, results, fields) {
      res.send(results);
    }
  );
};

app.get("/api", displayResults);

app.post("/api", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const src = req.body.src;
  const author = req.body.author;

  //insert into the database
  connection.query(
    "INSERT INTO `picture` (`title`, `description`, `src`, `author`) VALUES (?,?,?,?)",
    [title, description, src, author],
    function (err, results, fields) {
      res.redirect("/");
      //  res.send("Nouvel picture insérée avec succès! <a href='javascript:history.back()'>Retour en arrière</a>");
    }
  );
});
