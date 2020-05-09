const express = require("express");
const addHamstersToDatabase = require("./addHamstersToDatabase");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
