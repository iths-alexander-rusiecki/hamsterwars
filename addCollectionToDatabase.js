const { db } = require("./firebase");
const uuid = require("uuid"); // Creates good unique ID´s
const hamsters = require("./data.json");

const gamesRef = db.collection("games"); // DRY code

const addCollectionToDatabase = collectionName => {
    try {
        if (collectionName === "hamsters") {
            console.log(`${collectionName} collection created`);
            hamsters.forEach(hamster => {
                db.collection(collectionName).doc(uuid.v4()).set(hamster);
                console.log(
                    `${hamster.name} added to ${collectionName} collection`
                );
            });
        } else if (collectionName === "games") {
            console.log(`${collectionName} collection created`);
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
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = addCollectionToDatabase;
