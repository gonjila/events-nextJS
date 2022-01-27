import classes from "./CommentList.module.css";

function CommentList({ commentsArray }) {
    return (
        <ul className={classes.comments}>
            {commentsArray &&
                commentsArray.map((comment) => (
                    <li key={comment._id}>
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
