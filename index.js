const express = require("express");
const doesCollectionExist = require("./doesCollectionExist");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(express.static("assets"));

app.use(express.json());

// const authRoute = require("./routes/auth");
// app.use("/auth", authRoute);

const gamesRoute = require("./routes/games");
app.use("/games", gamesRoute);

const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);

const statsRoute = require("./routes/stats");
app.use("/stats", statsRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
