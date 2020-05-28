const { db } = require("./firebase");
const uuid = require("uuid"); // Creates good unique ID´s
const hamsters = require("./data.json");

const gamesRef = db.collection("games"); // DRY code

const addCollectionToDatabase = collectionName => {
    try {
        if (collectionName === "hamsters") {
            hamsters.forEach(hamster => {
                db.collection(collectionName).doc(uuid.v4()).set(hamster);
                console.log(
                    `${hamster.name} added to ${collectionName} collection`
                );
            });
            console.log(`${collectionName} collection created`);
        } else if (collectionName === "games") {
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
                        wins: 0,
                        defeats: 0,
                        games: 0,
                    },
                    {
                        id: null,
                        name: "",
                        imgName: "",
                        favFood: "",
                        loves: "",
                        imgName: "",
                        wins: 0,
                        defeats: 0,
                        games: 0,
                    },
                ],
                winner: "",
            });
            console.log(`${collectionName} collection created`);
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = addCollectionToDatabase;
