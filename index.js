const express = require("express");
const helmet = require("helmet");
const doesCollectionExist = require("./doesCollectionExist");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(express.static("public"));
// app.use("/assets", express.static("assets"));
app.use(express.json());

const assetsRoute = require("./routes/assets");
app.use("/", assetsRoute);

const chartsRoute = require("./routes/charts");
app.use("/charts", chartsRoute);

const gamesRoute = require("./routes/games");
app.use("/games", gamesRoute);

const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);

const statsRoute = require("./routes/stats");
app.use("/stats", statsRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
