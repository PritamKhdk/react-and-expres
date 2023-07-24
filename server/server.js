const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const morgan = require("morgan");
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]; 
  console.log("verify",token)
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ message: "you are failed to authenticate" });
      } else {
         req.userId = decoded.id;
        next();
      }
    });
  }
};

app.post("/store_data", (req, res) => {
  const data = { 
                 name: req.body.name,
                 caste:req?.body?.caste,
                };
  const secret =process.env.SECRET
  //check value
  const selectq = `Select * from userdata Where Name = '${data.name}' AND Caste = '${data.caste}' `
 
  const sql = "INSERT INTO userdata SET ?"; 
  // console.log("sql",sql)
  
  conn.query(selectq,data,(err,result)=>{
    if (err) throw err;
    // console.log(result.length)
    if(result.length > 0){
      res.send({message:"data exist"})
     }
    else{
     conn.query(sql, data, (err,insertResult) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
         res.send({ message: "Duplicate entry" });
         }else {
           throw err;
           }
            } else {
              // console.log("insert",insertResult)
              const idData = insertResult.insertId; 
              // console.log("postid", idData);
              const token = jwt.sign({idData}, secret);
              const decode = jwt.decode(token)
              // console.log("decode",token)
              res.send(JSON.stringify({ status: 200, error: null, data,token}));
            }
          });
     
      }
    });
     })

app.get("/get_data", verifyJWT, (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.decode(token);
  console.log("decodedToken",decodedToken)
  const id = decodedToken.idData;
  console.log("id", id);

  const sql = `SELECT * FROM userdata WHERE id = '${id}'`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 404, error: err.sqlMessage }));
    } else {
      res.send(JSON.stringify({ status: 200, result }));
      console.log(result.length);
    }
  });
});


app.put("/put_data",verifyJWT,(req, res) => {
  const {name, caste } = req.body;
  
  if(name=="" ){
    return res.json({ message: "black name" })
  }
  
  const token=req.headers["x-access-token"];
  const decodedToken = jwt.decode(token);
  const id = decodedToken.idData;
  console.log("putid",id)

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
      const sql = `UPDATE userdata SET Name = '${name}' , Caste ='${caste}' WHERE id = ${id}`;

     
      conn.query(sql, (err) => {
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
  const token=req.headers["x-access-token"];
  const decodedToken = jwt.decode(token);
  const id = decodedToken.idData;

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
