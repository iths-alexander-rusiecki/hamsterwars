const { db } = require("./firebase");
const addHamstersToDatabase = require("./addHamstersToDatabase");

// Self invoking function on server start. Checks if collection exists, if not creates one.
const doesCollectionExist = (async () => {
  await db
    .collection("hamsters")
    .get()
    .then((query) => {
      if (query.size > 0) {
        return;
      } else {
        console.log("Hamster collection created");

        // Create collection
        addHamstersToDatabase();
      }
    });
})();

module.exports = doesCollectionExist;
