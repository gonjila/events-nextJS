const { connectDatabase, insertDocument, getFilteredComments } = require("../../utils/db-utill");

async function comments(req, res) {
    const eventId = req.query.comments;

    let client;
    try {
        client = await connectDatabase("eventsComments");
    } catch (err) {
        res.status(500), json({ message: "Connecting to the database failed!" });
        return;
    }

    if (req.method === "POST") {
        const commentBody = JSON.parse(req.body);
        const { email, name, text } = commentBody;

        if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({ message: "Invalid input!" });
            client.close();
            return;
        }

        const newComment = {
            eventId,
            email,
            name,
            text,
        };

        let insertResult;
        try {
            insertResult = await insertDocument(client, "comments", newComment);
            client.close();
        } catch (err) {
            res.status(500).json({ message: "Inserting comment failed!" });
            return;
        }

        newComment._id = insertResult.insertedId;

        res.status(201).json({ message: "Added comment.", comment: newComment });
    }

    if (req.method === "GET") {
        try {
            const documents = await getFilteredComments(client, "comments", { eventId }, { _id: -1 });
            res.status(200).json({ message: "succes", comments: documents });
        } catch (err) {
            res.status(500).json({ message: "Getting comments failed!" });
        }

        client.close();
    }
}

export default comments;
