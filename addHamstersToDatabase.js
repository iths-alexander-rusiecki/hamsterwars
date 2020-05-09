const { db } = require("./firebase");
const hamsters = require("./data.json");

const addHamstersToDatabase = () => {
  try {
    hamsters.forEach((hamster) => {
      db.collection("hamsters").doc(hamster.id.toString()).set(hamster);
      console.log(`Hamster ${hamster.name} added to hamsters collection`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = addHamstersToDatabase;
