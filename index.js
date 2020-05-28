const express = require("express");
const helmet = require("helmet"); // Easy way to secure, not bullet proof
const doesCollectionExist = require("./doesCollectionExist");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());

doesCollectionExist("hamsters");
doesCollectionExist("games");

const assetsRoute = require("./routes/assets");
app.use("/assets", assetsRoute);

const chartsRoute = require("./routes/charts");
app.use("/charts", chartsRoute);

const gamesRoute = require("./routes/games");
app.use("/games", gamesRoute);

const hamstersRoute = require("./routes/hamsters");
app.use("/hamsters", hamstersRoute);

const statsRoute = require("./routes/stats");
app.use("/stats", statsRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
