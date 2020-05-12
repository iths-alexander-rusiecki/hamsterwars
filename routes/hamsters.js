const { db } = require("./../firebase");
const { Router } = require("express");
const fs = require("fs");
var converter = require("number-to-words"); // Just testing for fun

const router = new Router();

// GET all hamsters
router.get("/", async (req, res) => {
  const hamstersArray = [];
  const snapShot = await db.collection("hamsters").get();

  snapShot.forEach((doc) => {
    hamstersArray.push(doc.data());
  });

  res.send({ hamsters: hamstersArray });
});

// GET hamster picture
router.get("/assets/:picUrl", (req, res) => {
  let picUrl = req.params.picUrl;
  let src = fs.createReadStream(`./public/hamsters/${picUrl}`);
  src.pipe(res);
});
// GET hamster with specified ID
router.get("/:id", async (req, res) => {
  const hamsterArray = [];
  const snapShot = await db
    .collection("hamsters")
    .where("id", "==", parseInt(req.params.id))
    .get();
  snapShot.forEach((doc) => {
    hamsterArray.push(doc.data());
  });
  res.send({ hamster: hamsterArray });
});
// GET top 5 hamsters by wins
router.get("/charts/top", async (req, res) => {
  const hamsterArray = [];
  let sortedArray = [];
  let topFiveWinsArray = [];
  const snapShot = await db.collection("hamsters").get();
  snapShot.forEach((doc) => {
    hamsterArray.push(doc.data());
  });
  sortedArray = hamsterArray.sort((a, b) => a.wins + b.wins);
  topFiveWinsArray = sortedArray.slice(0, 5);
  res.send({ topFiveHamsters: topFiveWinsArray });
});
// GET top 5 hamsters by defeats
router.get("/charts/bottom", async (req, res) => {
  const hamsterArray = [];
  let sortedArray = [];
  let topFivedefeatsArray = [];
  const snapShot = await db.collection("hamsters").get();
  snapShot.forEach((doc) => {
    hamsterArray.push(doc.data());
  });
  sortedArray = hamsterArray.sort((a, b) => a.defeats + b.defeats);
  topFivedefeatsArray = sortedArray.slice(0, 5);
  res.send({ bottomFiveHamsters: topFivedefeatsArray });
});

// PUT stats to hamster with specified ID
let totalGames = 0;
router.put("/:id/results", async (req, res) => {
  try {
    let snapShot = await db
      .collection("hamsters")
      .where("id", "==", parseInt(req.params.id))
      .get();
    snapShot.forEach((doc) => {
      totalGames++;

      let hamster = doc.data();
      hamster.defeats += parseInt(req.body.defeats);
      hamster.games += parseInt(req.body.games);
      hamster.wins += parseInt(req.body.wins);

      db.collection("hamsters")
        .doc(doc.id)
        .set(hamster)
        .then(
          res.send({
            msg: `Hamster ${converter.toWords(
              req.params.id
            )} game stats updated (tatal games: ${totalGames})`,
          })
        )

        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// GET random hamster
router.get("/hamsters/random", async (req, res) => {
  const hamstersArray = [];
  const randomNumber = Math.floor(Math.random() * 40) + 1;
  const snapShot = await db
    .collection("hamsters")
    .where("id", "==", randomNumber)
    .get();
  snapShot.forEach((doc) => {
    hamstersArray.push(doc.data());
  });
  res.send({ hamster: hamstersArray });
});

module.exports = router;
