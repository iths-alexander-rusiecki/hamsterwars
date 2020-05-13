const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const hamstersRef = db.collection("hamsters"); // DRY code

// GET all played games
router.get("/", async (req, res) => {
  try {
    totalGamesPlayedArray = [];
    const snapShot = await hamstersRef.where("games", ">", 0).get();
    snapShot.forEach((doc) => {
      totalGamesPlayedArray.push(doc.data());
    });
    res.send({ gamesPlayed: totalGamesPlayedArray });
  } catch (err) {
    console.error(err);
  }
});

// POST new game
router.post("/", async (req, res) => {
  const now = new Date();
  console.log(now.toLocaleString());

  const snapShot = await hamstersRef.get();
  snapShot.forEach((doc) => {
    const hamster = doc.data();
    if (hamster.id == req.body.id) {
      snapShot.set({
        wins: req.body.wins,
        defeats: req.body.defeats,
      });
    }
  });
  res.send({ msg: "Game added" });
});

module.exports = router;
