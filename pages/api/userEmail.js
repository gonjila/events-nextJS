const { MongoClient } = require("mongodb");

async function userEmail(req, res) {
    if (req.method === "POST") {
        const mail = JSON.parse(req.body);

        if (!mail || !mail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        const client = await MongoClient.connect(
            "mongodb+srv://gonjila:ftgo3hvaE1Irkpaq@cluster0.lb3xm.mongodb.net/usersEmails?retryWrites=true&w=majority"
        );
        const db = client.db();

        await db.collection("emails").insertOne({ email: mail });

        client.close();

        res.status(201).json({ message: "Signed up!" });
    }
}

export default userEmail;
