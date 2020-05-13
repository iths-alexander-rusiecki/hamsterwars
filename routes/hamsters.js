const { db } = require("./../firebase");
const { Router } = require("express");
const fs = require("fs");
const converter = require("number-to-words"); // Just testing package for fun

const router = new Router();

const hamstersRef = db.collection("hamsters"); // DRY code

// GET all hamsters
router.get("/", async (req, res) => {
  try {
    const hamstersArray = [];
    const snapShot = await hamstersRef.get();
    snapShot.forEach((doc) => {
      hamstersArray.push(doc.data());
    });
    res.send({ allHamsters: hamstersArray });
  } catch (err) {
    console.error(err);
  }
});

// GET hamster with specified ID
router.get("/:id", async (req, res) => {
  try {
    const snapShot = await hamstersRef
      .where("id", "==", parseInt(req.params.id))
      .get();
    snapShot.forEach((doc) => {
      res.send({ SpecificHamster: doc.data() });
    });
  } catch (err) {
    console.error(err);
  }
});

// PUT stats to hamster with specified ID
router.put("/:id/results", async (req, res) => {
  try {
    const snapShot = await hamstersRef
      .where("id", "==", parseInt(req.params.id))
      .get();
    snapShot.forEach((doc) => {
      const hamster = doc.data();
      if (parseInt(req.body.wins) > 0) {
        hamster.wins++;
      }
      if (parseInt(req.body.defeats) > 0) {
        hamster.defeats++;
      }
      hamster.games++;
      hamstersRef
        .doc(doc.id)
        .set(hamster)
        .then(
          res.send({
            msg: `Hamster ${converter.toWords(
              req.params.id
            )} game stats updated`,
          })
        )
        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// GET random hamster
router.get("/hamsters/random", async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 40) + 1;
    const snapShot = await hamstersRef.where("id", "==", randomNumber).get();
    snapShot.forEach((doc) => {
      res.send({ randomHamster: doc.data() });
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
