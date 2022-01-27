import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState();

    useEffect(() => {
        fetch(`/api/${eventId}`)
            .then((res) => res.json())
            .then((result) => {
                setComments(result.comments);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch(`/api/${eventId}`, {
            method: `POST`,
            body: JSON.stringify(commentData),
        }).then((res) => res.json());
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList commentsArray={comments} />}
        </section>
    );
}

export default Comments;
