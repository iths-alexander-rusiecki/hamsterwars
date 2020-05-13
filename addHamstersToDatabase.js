const { db } = require("./firebase");
const hamsters = require("./data.json");
const uuid = require("uuid");

const addHamstersToDatabase = () => {
  try {
    hamsters.forEach((hamster) => {
      db.collection("hamsters").doc(uuid.v4()).set(hamster);
      console.log(`Hamster ${hamster.name} added to hamsters collection`);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = addHamstersToDatabase;
