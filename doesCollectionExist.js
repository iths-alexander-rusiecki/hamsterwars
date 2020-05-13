const { db } = require("./firebase");
const addHamstersToDatabase = require("./addHamstersToDatabase");

const doesCollectionExist = (async () => {
  await db
    .collection("hamsters")
    .get()
    .then((query) => {
      if (query.size > 0) {
        return;
      } else {
        console.log("Hamster collection created");
        addHamstersToDatabase();
      }
    });
})();

module.exports = doesCollectionExist;
