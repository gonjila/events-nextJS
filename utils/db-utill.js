const { MongoClient } = require("mongodb");

export const connectDatabase = async (projectName) => {
    const client = await MongoClient.connect(
        `mongodb+srv://gonjila:ftgo3hvaE1Irkpaq@cluster0.lb3xm.mongodb.net/${projectName}?retryWrites=true&w=majority`
    );
    return client;
};

export const insertDocument = async (client, collection, document) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);

    return result;
};

export const getFilteredComments = async (client, collection, find, sort) => {
    const db = client.db();
    const documents = await db.collection(collection).find(find).sort(sort).toArray();

    return documents;
};
