import type { Comment } from "../../types/Comment";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import DeleteCommentModal from "../ui/modal/DeleteCommentModal";
import { useState } from "react";

interface Props {
  comment: Comment;
  authorId: string;
}
const CommentHeader = ({ comment, authorId }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { user } = useAuthContext();
  return (
    <div className="d-flex justify-content-between">
      <div className="fw-semibold text-muted">
        <div>
          {comment.userId == user!.id ? (
            "You"
          ) : (
            <div>
              <div>{comment.user.email}</div>
            </div>
          )}
        </div>
        <div>{format(new Date(comment.createdAt), "MMM d, Y · h:mm a")}</div>
      </div>
      {(comment.userId == user!.id || authorId == user!.id) && (
        <div>
          <DeleteCommentModal
            isOpen={isOpen}
            setOpen={setOpen}
            id={comment.id}
          />
          <div
            className="bi bi-trash text-danger fs-5"
            onClick={() => setOpen(true)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CommentHeader;
