const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const DB_URI = process.env.DB_URI;

// db connection
async function dbConnection(uri) {
  try {
    const conn = await mongoose.connect(uri)
    console.log(conn.connections[0].name)
  }
  catch (err) {
    console.log(err)
  }
}
dbConnection(DB_URI)

const app = express();

// handling cors
app.use(cors());

// adding json bodyparser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

// handling 404 error
app.use((req, res, next) => {
  next(createError(404));
});

// handling 505 server error
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).send(err.message);
});