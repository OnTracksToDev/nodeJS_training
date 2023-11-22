// get the client
const mysql = require('mysql2');
const express = require('express');
const app = express();

app.listen(3000);
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'my_mvc_bdd'
});


const displayResults = (req,res) => {
const limit=!isNaN(req.query.limit) ? parseInt(req.query.limit) : 3;
// simple query
connection.query(
    'SELECT * FROM picture ORDER BY id DESC LIMIT '+ limit,
    function(err, results, fields) {
        res.send(results);
    }
  );
  
}

app.get('/',displayResults);
