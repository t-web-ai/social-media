import { useForm } from "react-hook-form";
import type { Comment } from "../../types/Comment";
import TextBox from "../input/TextBox";
import CommentHeader from "./CommentHeader";
import { joiResolver } from "@hookform/resolvers/joi";
import { CommentSchema } from "../../schema/CommentSchema";
import type { CommentCreateType } from "../../types/CommentCreateType";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { CommentUpdateQuery } from "../../query/CommentUpdateQuery";

interface Props {
  comment: Comment;
  authorId: string;
  postId: string;
}
const CommentBox = ({ comment, authorId, postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CommentCreateType>({
    resolver: joiResolver(CommentSchema),
  });

  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const CommentUpdateMutate = CommentUpdateQuery();

  useEffect(() => {
    setValue("comment", comment.comment);
    setValue("postId", postId);
  }, [editMode]);

  const UpdateComment = async ({ postId, comment: cmt }: CommentCreateType) => {
    CommentUpdateMutate.mutate({ postId, comment: cmt, commentId: comment.id });
    setEditMode(false);
    reset();
  };

  return (
    <div className="border border-1 m-2 p-3 rounded">
      <CommentHeader
        comment={comment}
        authorId={authorId}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <div
        className={`text-base fw-semibold py-2`}
        style={{
          whiteSpace: "pre-line",
          wordBreak: "break-all",
          fontFamily: "system-ui",
          lineHeight: 1,
        }}
      >
        {comment.userId == user!.id && editMode ? (
          <div>
            <form onSubmit={handleSubmit(UpdateComment)}>
              <TextBox
                register={register("comment")}
                name="comment"
                error={errors["comment"]}
              />
              <div>
                <button
                  className="btn btn-primary fw-semibold"
                  disabled={CommentUpdateMutate.isPending}
                >
                  Update
                </button>
                <div
                  className="btn fw-semibold"
                  onClick={() => {
                    setEditMode(false);
                    reset();
                  }}
                >
                  Cancel
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>{comment.comment}</div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
