const { db } = require("./../firebase");
const { Router } = require("express");

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

// PUT (glöm ej att fixa total games här)
router.put("/:id/results", async (req, res) => {
  try {
    let snapShot = await db
      .collection("hamsters")
      .where("id", "==", parseInt(req.params.id))
      .get();
    snapShot.forEach((doc) => {
      let hamster = doc.data();
      hamster.defeats += parseInt(req.body.defeats);
      hamster.games += parseInt(req.body.games);
      hamster.wins += parseInt(req.body.wins);

      db.collection("hamsters")
        .doc(doc.id)
        .set(hamster)
        .then(res.send({ msg: "Hamster updated" }))
        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
