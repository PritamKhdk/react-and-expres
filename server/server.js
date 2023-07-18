const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

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

app.post("/store-data", (req, res) => {
  console.log(req.body);

  const data = { name: req.body.name };
  const sql = "INSERT INTO userdata SET ?";

  conn.query(sql, data, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null }));
  });
});

app.get("/get-data", (req, res) => {
  const sql = "SELECT * FROM `userdata`";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 404, error: err.sqlMessage }));
    } else {
      res.send(JSON.stringify({ status: 200, result }));
       console.log(result.length)
    }
  });
});

app.put("/put_data", (req, res) => {
  const { id, Name } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const idsql =`SELECT * from userdata where id=${id}`;
  try {
    conn.query(idsql,(err, result)=>{
    if(result.length==0){
      res.status(200).json({message:"Id not found"})
    }
    else{
      const sql = `UPDATE userdata SET Name = '${Name}' WHERE id = ${id}`;
      conn.query(sql, () => {
        if (err) {
          res.status(200).json({ message: "Failed to update data" });
         } else {
          res.status(200).json({ message: "Success update" });
        }
     })
     }})
    } 
    catch (err) {
    res.status(404).json({ message: err });
  }
});


app.delete("/delete", (req, res) => {
  const id = req.query.id;
  const sql = `DELETE FROM userdata WHERE id = ${id}`;
  conn.query(sql, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete from the database" });
    } else {
      res.status(200).json({ message: "Deleted successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});
