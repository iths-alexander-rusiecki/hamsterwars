const { db } = require("./../firebase");
const { Router } = require("express");

const router = new Router();

const hamstersRef = db.collection("hamsters"); // DRY code

// GET total amount of games
router.get("/total", async (req, res) => {
    try {
        let totalGames = 0;
        const snapShot = await hamstersRef.get();

        // Loops through games, adds value to totalGames
        snapShot.forEach(doc => {
            totalGames += doc.data().games;
        });
        res.send({ totalGamesPlayed: totalGames });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
