const { MongoClient } = require("mongodb");

async function comments(req, res) {
    const eventId = req.query.comments;

    const client = await MongoClient.connect(
        "mongodb+srv://gonjila:ftgo3hvaE1Irkpaq@cluster0.lb3xm.mongodb.net/eventsComments?retryWrites=true&w=majority"
    );

    if (req.method === "POST") {
        const commentBody = JSON.parse(req.body);
        const { email, name, text } = commentBody;

        if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({ message: "Invalid input!" });
            return;
        }

        const newComment = {
            eventId,
            email,
            name,
            text,
        };

        const db = client.db();
        const insertResult = await db.collection("comments").insertOne(newComment);

        client.close();

        newComment.id = insertResult.insertedId;

        res.status(201).json({ message: "Added comment.", comment: newComment });
    }
    if (req.method === "GET") {
        const db = client.db();
        const documents = await db.collection("comments").find({ eventId }).sort({ _id: -1 }).toArray();

        res.status(200).json({ message: "succes", comments: documents });
    }
}

export default comments;
