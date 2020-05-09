const { Router } = require("express");
const { db, auth } = require("./../firebase");

const router = new Router();

// GET all hamsters
router.get("/hamsters", async (req, res) => {
  try {
    const hamstersArray = [];
    const snapShot = await db.collection("hamsters").get();

    snapShot.forEach((doc) => {
      hamstersArray.push(doc.data());
    });

    res.send({ hamsters: hamstersArray });
  } catch (err) {
    console.error(err);
  }
});

// GET hamster with specified ID
router.get("/hamsters/:id", async (req, res) => {
  try {
    const snapShot = await db
      .collection("hamsters")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        parseInt(req.params.id)
      )
      .get();
    console.log(snapShot.data());

    res.send({ hamster: snapShot });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
