const express = require("express");

const app = express();

app.use(express.static("public"));

app.use(express.json());

const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);

app.listen(3000, () => console.log("Server up and running at port 3000"));
