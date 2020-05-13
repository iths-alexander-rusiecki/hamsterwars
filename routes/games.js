const { db } = require("./../firebase");
const { Router } = require("express");
const fs = require("fs");
const converter = require("number-to-words"); // Just testing package for fun

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
    res.send({ totalGamesPlayed: totalGamesPlayedArray });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
