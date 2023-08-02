const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const conn = require("../database");
require("dotenv").config();
const {authenticateJWT} = require("../middlewares/authMiddleware");


app.post("/store_data", (req, res) => {
  const data = { 
                 name: req.body.name,
                 caste:req?.body?.caste,
                };

  if(data.name =="" && data.caste=="" ){
      return res.json({ message: "black name or caste" })
   }
  const secret =process.env.SECRET
  const selectq = `Select * from userdata Where Name = '${data.name}' AND Caste = '${data.caste}' `
  const sql = "INSERT INTO userdata SET ?"; 
  conn.query(selectq,data,(err,result)=>{
    if (err) throw err;

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
              const idData = insertResult.insertId; 
              const token = jwt.sign({idData}, secret);
              res.send(JSON.stringify({ status: 200, error: null, data,token}));
            }
          });
     
      }
    });
     })

app.post("/login", (req, res) => {
  const { name, caste } = req.body;
  const secret =process.env.SECRET
  const selectq = `SELECT * FROM userdata WHERE Name = '${name}' AND Caste = '${caste}'`;
  conn.query(selectq, (err, result) => {
    if (err) {
      console.error("Error occurred during login:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
    if (result.length > 0) {
      console.log("result", result[0].id);
      const idData=result[0].id;
      const token = jwt.sign({idData}, secret);
      const de =jwt.decode(token)
      return res.json({ success: true, message: "Login successful", result,token,de});
      } else {
      return res.json({ success: false, message: "User not found" });
    }
  });
});

  app.get("/get_data",authenticateJWT,(req, res) => {
  const userId = req.userId;
  console.log("getid",userId)

  const sql = `SELECT * FROM userdata WHERE id = '${userId}'`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 404, error: err.sqlMessage }));
    } else {
      res.send(JSON.stringify({ status: 200, result }));
      console.log(result.length);
    }
  });
});

app.put("/put_data",authenticateJWT,(req, res) => {
  const {name, caste } = req.body;
  
  if(name=="" ){
    return res.json({ message: "black name" })
  }
  const id =req.userId;
  console.log("putid",id)

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

   const idsql =`SELECT * from userdata where id='${id}'`;
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

app.delete("/delete",authenticateJWT, (req, res) => {
   const id =req.userId

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


app.post("/page",authenticateJWT, (req, res) => {
  const id =req.userId
  console.log("getid",id)

  const data = {
    name: req.body.name,
    caste: req?.body?.caste,
    sex: req?.body?.sex,
    user_id: id,
    class: req?.body?.class,
    education: req?.body?.education,
    phone: req?.body?.phone,
    address: req?.body?.address,
    bloodgroup: req?.body?.bloodgroup
  };

  if (data.name === "" && data.caste === "") {
    return res.json({ message: "Blank name and caste" });
  }
  
  const selectq = `SELECT * FROM userdetails WHERE Name = '${data.name}'`;
  
  const sql = "INSERT INTO userdetails SET ?"; 
  
  conn.query(selectq, (err, result) => {
    if (err) {
      console.error("Error occurred during SELECT query:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (result.length > 0) {
      res.send({ message: "Data exist" });
    } else {
      conn.query(sql, data, (err) => { 
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            res.send({ message: "Duplicate entry" });
          } else {
            console.error("Error occurred during INSERT query:", err);
            return res.status(500).json({ message: "Internal server error" });
          }
        } else {
          res.send({ message: "Data inserted successfully" });
        }
      });
    }
  });
});

  app.get("/pagedetail", authenticateJWT, (req, res) => {
    const id = req.userId; 
    console.log("getid", id);
    const sql = `SELECT * FROM userdetails WHERE user_id = '${id}'`;
    conn.query(sql, (err, result) => {
      if (err) {
        res.send(JSON.stringify({ status: 404, error: err.sqlMessage }));
      } else {
        res.send(JSON.stringify({ status: 200, result }));
      }
    });
  });

  app.put("/pageid", authenticateJWT, (req, res) => {
    const id = req.userId;
    console.log("putid", id);
  
    const data = {
      name: req.body.name,
      caste: req?.body?.caste,
      sex: req?.body?.sex,
      user_id: id,
      class: req?.body?.class,
      education: req?.body?.education,
      phone: req?.body?.phone,
      address: req?.body?.address,
      bloodgroup: req?.body?.bloodgroup
    };
    console.log("data",data.user_id)
  
    if (data.name === "") {
      return res.json({ message: "black name" });
    }
  
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  
    const sql = `UPDATE userdetails SET name = '${data.name}', caste = '${data.caste}', sex = '${data.sex}', class = '${data.class}', education = '${data.education}', phone = '${data.phone}', address = '${data.address}', bloodgroup = '${data.bloodgroup}' WHERE user_id = ${data.user_id}`;
    conn.query(sql, (err) => {
      if (err) {
        console.log("errfound")
        res.status(200).json({ message: "Failed to update data",error: err.sqlMessage});
      } else {
        console.log("success")
        res.status(200).json({ message: "Success update"});
      }
    });
  });

  app.delete("/pagedelete",authenticateJWT, (req, res) => {
    const id =req.userId
    console.log("id:",id)
    console.log("delete is being hit")
 
   const sql = `DELETE FROM userdetails WHERE user_id = ${id}`;
   conn.query(sql, (err) => {
     if (err) {
       console.error(err);
       res.status(500).json({ error: "Failed to delete from the database" });
     } else {
       res.status(200).json({ message: "Deleted successfully" });
     }
   });
 });

 app.get("/everydetail", authenticateJWT, (req, res) => {
  const sql = `SELECT * FROM userdetails `;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 404, error: err.sqlMessage }));
    } else {
      res.send(JSON.stringify({ status: 200, result }));
    }
  });
});

  
module.exports = app;

