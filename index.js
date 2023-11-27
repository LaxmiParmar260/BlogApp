const express = require("express");
require("dotenv").config();
require("./config/modelConfig");
const cookies = require('cookie-parser')
const commonRouter = require("./routes/mainRoute")
const app = express();
app.use(express.json());
app.use(cookies())
app.use("/", commonRouter)

const PORT = process.env.PORT || 5000;
const HOST = "localhost";

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: http://${HOST}:${PORT}`);
});
