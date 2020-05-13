const { db } = require("./../firebase");
const { Router } = require("express");
const fs = require("fs");

const router = new Router();

// GET hamster picture
router.get("/:picUrl", (req, res) => {
  try {
    const picUrl = req.params.picUrl;
    const src = fs.createReadStream(`./assets/hamsters/${picUrl}`);
    src.pipe(res);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
