const { Router } = require("express");
const { auth } = require("./../firebase");

const router = new Router();

// On POST > create hamster
router.post("/hamsters", async (req, res) => {
  try {
    // Create new hamster
    await auth.createUser(req.body);

    // Tell client that all is ok
    res.send({ msg: "Hamster has been created" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
