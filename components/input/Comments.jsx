import { useEffect, useState, useContext } from "react";

import { NotificationContext } from "../../store/notificationContext";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        setIsFetching(true);
        fetch(`/api/${eventId}`)
            .then((res) => res.json())
            .then((result) => {
                setComments(result.comments);
            });
        setIsFetching(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        showNotification({
            title: "Commenting...",
            message: "Commenting on event...",
            status: "pending",
        });

        fetch(`/api/${eventId}`, {
            method: `POST`,
            body: JSON.stringify(commentData),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return res.json().then((data) => {
                    throw new Error(data.message || "Something went wrong!");
                });
            })
            .then(() => {
                showNotification({
                    title: "Success!",
                    message: "Successfully commented on event.",
                    status: "success",
                });
            })
            .then(() => {
                fetch(`/api/${eventId}`)
                    .then((res) => res.json())
                    .then((result) => {
                        setComments(result.comments);
                    });
            })
            .catch((err) => {
                showNotification({
                    title: "Error!",
                    message: err.message || "Something went wrong.",
                    status: "error",
                });
            });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetching && <CommentList commentsArray={comments} />}
            {showComments && isFetching && <p>Loading...</p>}
        </section>
    );
}

export default Comments;
