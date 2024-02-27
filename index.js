const express = require("express");
const apiRoute = require("./routes/api.js");
const connecttoDB = require("./db.js");
const apiProtected = require("./routes/ProtectedApi.js");
const cors =require("cors");
require("dotenv").config();

const app = express();

const PORT = 7070;

connecttoDB();

app.use(express.json());
app.use(cors("*"))

app.use("/api/", apiRoute);
app.use("/api/",apiProtected);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
