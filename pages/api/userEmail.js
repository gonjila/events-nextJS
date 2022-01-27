const { connectDatabase, insertDocument } = require("../../utils/db-utill");

async function userEmail(req, res) {
    if (req.method === "POST") {
        const mail = JSON.parse(req.body);

        if (!mail || !mail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        let client;

        try {
            client = await connectDatabase("usersEmails");
        } catch (err) {
            res.status(500).json({ message: "Connecting to the database failed!" });
            return;
        }

        try {
            await insertDocument(client, "emails", { email: mail });
            client.close();
        } catch (err) {
            res.status(500).json({ message: "Inserting data failed!" });
            return;
        }

        res.status(201).json({ message: "Signed up!" });
    }
}

export default userEmail;
