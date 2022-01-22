import { useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch(`/api/${eventId}`, {
            method: `POST`,
            body: JSON.stringify(commentData),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList eventId={eventId} />}
        </section>
    );
}

export default Comments;
