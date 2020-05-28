const { db } = require("./firebase");
const addCollectionToDatabase = require("./addCollectionToDatabase");

const doesCollectionExist = async collectionName => {
    await db
        .collection(collectionName)
        .get()
        .then(query => {
            if (query.size > 0) {
                return;
            } else {
                addCollectionToDatabase(collectionName);
            }
        });
};

module.exports = doesCollectionExist;
