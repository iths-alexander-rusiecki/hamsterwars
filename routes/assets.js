const { db } = require("./../firebase");
const { Router } = require("express");
const fs = require("fs");

const router = new Router();

// GET hamster picture
router.get("/:picUrl", (req, res) => {
    try {
        const picUrl = req.params.picUrl;

        // Start stream
        const src = fs.createReadStream(`./assets/hamsters/${picUrl}`);

        // Stream to response object
        src.pipe(res);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
