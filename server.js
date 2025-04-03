const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.sendFile(__dirname+"/index.html");
});

let activities = [
  {name: "name1"},
  {name: "name2"}
];

app.listen(3001, () => {
  console.log("testing");
});