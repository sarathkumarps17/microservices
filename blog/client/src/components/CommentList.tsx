import { CommnetsArray, Status } from "../types/types";

const CommentList = ({ comments }: CommnetsArray) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.commentId}>
          {comment.status === Status.rejected
            ? "Sorry this commnet is rejected"
            : `${comment.content} (${comment.status?.toLocaleLowerCase()})`}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
