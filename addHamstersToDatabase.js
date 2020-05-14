const { db } = require("./firebase");
const uuid = require("uuid"); // Creates good unique ID´s
const hamsters = require("./data.json");

// Loops through data.json and adds documents to collection
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
