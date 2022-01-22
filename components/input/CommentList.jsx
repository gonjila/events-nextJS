import { useEffect, useState } from "react";

import classes from "./CommentList.module.css";

function CommentList({ eventId }) {
    const [commentsArray, setCommentsArray] = useState([]);
    console.log("commentsArray", commentsArray);

    useEffect(() => {
        fetch(`/api/${eventId}`)
            .then((res) => res.json())
            .then((result) => setCommentsArray(result));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className={classes.comments}>
            {commentsArray.comments &&
                commentsArray.comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.text}</p>
                        <div>
                            By <address>{comment.name}</address>
                        </div>
                    </li>
                ))}
        </ul>
    );
}

export default CommentList;
