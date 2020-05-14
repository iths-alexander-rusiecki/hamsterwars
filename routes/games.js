const { db } = require("./../firebase");
const { Router } = require("express");
const uuid = require("uuid"); // Creates good unique ID´s

const router = new Router();

const gamesRef = db.collection("games"); // DRY code
const hamstersRef = db.collection("hamsters"); // DRY code

const doesCollectionExist = (async () => {
  // Self invoking function. Checka if games collection exists, if not creates one and add keys/empty values.
  await gamesRef.get().then((query) => {
    if (query.size > 0) {
      return;
    } else {
      gamesRef.doc(uuid.v4()).set({
        id: null,
        timeStamp: null,
        contestants: [
          {
            id: null,
            name: "",
            imgName: "",
            favFood: "",
            loves: "",
            imgName: "",
            wins: null,
            defeats: null,
            games: null,
          },
          {
            id: null,
            name: "",
            imgName: "",
            favFood: "",
            loves: "",
            imgName: "",
            wins: null,
            defeats: null,
            games: null,
          },
        ],
        winner: "",
      });
      console.log("Games collection created");
    }
  });
})();

router.post("/results", async (req, res) => {
  try {
    const snapShot = await gamesRef.get();
    snapShot.forEach((doc) => {
      const game = doc.data();

      // Add to object values
      game.id = parseInt(req.body.id);
      game.timeStamp = new Date().toLocaleString();
      game.contestants[0].id = parseInt(req.body.contestants[0].id);
      game.contestants[0].name = req.body.contestants[0].name;
      game.contestants[0].imgName = req.body.contestants[0].imgName;
      game.contestants[0].favFood = req.body.contestants[0].favFood;
      game.contestants[0].loves = req.body.contestants[0].loves;
      game.contestants[0].wins += parseInt(req.body.contestants[0].wins);
      game.contestants[0].defeats += parseInt(req.body.contestants[0].defeats);
      game.contestants[0].games += parseInt(req.body.contestants[0].games);
      game.contestants[1].id = parseInt(req.body.contestants[1].id);
      game.contestants[1].name = req.body.contestants[1].name;
      game.contestants[1].imgName = req.body.contestants[1].imgName;
      game.contestants[1].favFood = req.body.contestants[1].favFood;
      game.contestants[1].loves = req.body.contestants[1].loves;
      game.contestants[1].wins += parseInt(req.body.contestants[1].wins);
      game.contestants[1].defeats += parseInt(req.body.contestants[1].defeats);
      game.contestants[1].games += parseInt(req.body.contestants[1].games);
      game.winner = req.body.winner;
      gamesRef
        .doc(doc.id)
        .set(game)
        .then(res.send({ msg: `Game ${req.body.id} added` }));
    });
  } catch (err) {
    console.error(err);
  }
});

// GET all played games
router.get("/", async (req, res) => {
  try {
    totalGamesPlayedArray = [];

    // Find where games value > 0
    const snapShot = await hamstersRef.where("games", ">", 0).get();
    snapShot.forEach((doc) => {
      totalGamesPlayedArray.push(doc.data());
    });
    res.send({ gamesPlayed: totalGamesPlayedArray });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
