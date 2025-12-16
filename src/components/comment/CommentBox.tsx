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
        className={`text-base fw-semibold py-2`}
        style={{
          whiteSpace: "pre-line",
          wordBreak: "break-all",
          fontFamily: "system-ui",
          lineHeight: 1,
        }}
      >
        {comment.comment}
      </div>
    </div>
  );
};

export default CommentBox;
