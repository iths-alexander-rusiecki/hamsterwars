const { db } = require("./../firebase");
const { Router } = require("express");
const uuid = require("uuid");

const router = new Router();

const gamesRef = db.collection("games"); // DRY code
const hamstersRef = db.collection("hamsters"); // DRY code

const doesCollectionExist = async () => {
  await gamesRef.get().then((query) => {
    if (query.size > 0) {
      return;
    } else {
      gamesRef.doc(uuid.v4()).set({
        id: 1,
        timeStamp: null,
        hamsterOne: { name: "", wins: 0, defeats: 0, games: 0 },
        hamsterTwo: { name: "", wins: 0, defeats: 0, games: 0 },
        winner: "",
      });
      console.log("Games collection created");
    }
  });
};
doesCollectionExist();

router.post("/:id/results", async (req, res) => {
  try {
    const snapShot = await gamesRef
      .where("id", "==", parseInt(req.params.id))
      .get();
    snapShot.forEach((doc) => {
      const game = doc.data();
      game.timeStamp = new Date();
      game.hamsterOne.name += req.body.hamsterOne.name;
      game.hamsterTwo.name += req.body.hamsterTwo.name;
      game.hamsterOne.wins += req.body.hamsterOne.wins;
      game.hamsterTwo.wins += req.body.hamsterTwo.wins;
      game.hamsterOne.defeats += req.body.hamsterOne.defeats;
      game.hamsterTwo.defeats += req.body.hamsterTwo.defeats;
      game.hamsterOne.games += req.body.hamsterOne.games;
      game.hamsterTwo.games += req.body.hamsterTwo.games;
      game.winner = req.body.winner;

      gamesRef
        .doc(doc.id)
        .set(game)
        .then(res.send({ msg: "Game added" }));
    });
  } catch (err) {
    console.error(err);
  }
});

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

// // POST new game
// router.post("/", async (req, res) => {
//   const now = new Date();
//   console.log(now.toLocaleString());

//   const snapShot = await hamstersRef.get();
//   snapShot.forEach((doc) => {
//     const hamster = doc.data();
//     if (hamster.id == req.body.id) {
//       snapShot.set({
//         wins: req.body.wins,
//         defeats: req.body.defeats,
//       });
//     }
//   });
//   res.send({ msg: "Game added" });
// });

module.exports = router;
