const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/", userRoutes);


app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});
