const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const hamstersRef = db.collection("hamsters"); // DRY code

// GET five hamsters by wins
router.get("/top", async (req, res) => {
  try {
    const topFiveHamstersArray = [];

    // Firebase query language
    const snapShot = await hamstersRef.orderBy("wins", "desc").limit(5).get();
    snapShot.forEach((doc) => {
      topFiveHamstersArray.push(doc.data());
    });
    res.send({ topFiveHamsters: topFiveHamstersArray });
  } catch (err) {
    console.error(err);
  }
});

// GET five hamsters by defeats
router.get("/bottom", async (req, res) => {
  try {
    const bottomFiveHamstersArray = [];

    // Firebase query language
    const snapShot = await hamstersRef
      .orderBy("defeats", "desc")
      .limit(5)
      .get();
    snapShot.forEach((doc) => {
      bottomFiveHamstersArray.push(doc.data());
    });
    res.send({ bottomFiveHamsters: bottomFiveHamstersArray });
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
