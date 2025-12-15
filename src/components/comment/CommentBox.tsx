import type { Comment } from "../../types/Comment";
import CommentHeader from "./CommentHeader";

interface Props {
  comment: Comment;
  authorId: string;
}
const CommentBox = ({ comment, authorId }: Props) => {
  return (
    <div className="border border-1 m-2 p-3 rounded">
      <CommentHeader comment={comment} authorId={authorId} />
      <div
        className={`text-base`}
        style={{
          whiteSpace: "pre-line",
          wordBreak: "break-all",
          fontFamily: "system-ui",
        }}
      >
        {comment.comment}
      </div>
    </div>
  );
};

export default CommentBox;
