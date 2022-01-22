import path from "path";
import fs from "fs";

const buildFilePath = path.join(process.cwd(), "data", "subscribers.json");

export const getFileData = () => {
    const getFilePath = buildFilePath;
    const getJsonFileData = fs.readFileSync(getFilePath);
    const getData = JSON.parse(getJsonFileData);

    return getData;
};

function userEmail(req, res) {
    if (req.method === "POST") {
        const mail = JSON.parse(req.body);

        const subscriber = {
            id: Math.random(),
            mail,
        };

        const getFilePath = buildFilePath;
        const fileData = getFileData();

        // თუ ფაილში უკვე არის კონკრეტული email მაშინ აღარ ამატებს.
        const includes = fileData.findIndex((userMail) => userMail.mail === mail);
        if (includes === -1) {
            fileData.push(subscriber);
            fs.writeFileSync(getFilePath, JSON.stringify(fileData));
        }

        res.status(201).json({ mail });
    } else {
        res.status(200).json({ message: "hallo world" });
    }
}

export default userEmail;
