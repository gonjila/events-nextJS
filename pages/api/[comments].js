import path from "path";
import fs from "fs";

const buildDataFilePath = path.join(process.cwd(), "data", "comments.json");

export const getCommentsData = () => {
    const filePath = buildDataFilePath;
    const jsonFileData = fs.readFileSync(filePath);
    const commentsData = JSON.parse(jsonFileData);

    return commentsData;
};

function comments(req, res) {
    if (req.method === "POST") {
        const commentBody = JSON.parse(req.body);
        const eventComment = {
            id: Math.random(),
            event: req.query.comments,
            email: commentBody.email,
            name: commentBody.name,
            text: commentBody.text,
        };

        const getDataFilePath = buildDataFilePath;
        const commentsData = getCommentsData();

        commentsData.push(eventComment);

        fs.writeFileSync(getDataFilePath, JSON.stringify(commentsData));

        res.status(201).json({ message: "Event comments.", comment: eventComment });
    } else {
        const commentsData = getCommentsData();
        console.log(req.query.comments);
        console.log(commentsData);

        const filteredComments = commentsData.filter((comment) => comment.event === req.query.comments);

        res.status(200).json({ message: "succes", comments: filteredComments });
    }
}

export default comments;
