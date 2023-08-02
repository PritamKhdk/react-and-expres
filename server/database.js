const mysql = require("mysql");
// require("dotenv").config();

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user",
});

conn.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("My database is up and running!");
  console.log("Connected to the database");
});

module.exports = conn;
