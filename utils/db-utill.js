const { MongoClient } = require("mongodb");

export const connectDatabase = async (projectName) => {
    const connectionLink = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clastername}.lb3xm.mongodb.net/${projectName}?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(connectionLink);
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
