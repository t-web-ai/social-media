import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { PostResponse } from "../../types/PostResponse";
import TextBox from "../input/TextBox";
import PostComponent from "../post/PostComponent";
import CommentBox from "./CommentBox";

interface Props {
  post: PostResponse;
  register: UseFormRegisterReturn<"comment">;
  error: FieldError | undefined;
  CommentOnPost: () => Promise<void>;
  isSubmitting: boolean;
}
const PostDetailsWithComments = ({
  post,
  register,
  error,
  CommentOnPost,
  isSubmitting,
}: Props) => {
  return (
    <div>
      <PostComponent post={post} />
      <form className="px-2" onSubmit={CommentOnPost}>
        <TextBox
          register={register}
          error={error}
          name="comment"
          placeholder="Aa..."
        />
        <button className="btn btn-primary fw-semibold" disabled={isSubmitting}>
          {isSubmitting ? "Commenting..." : "Comment"}
        </button>
      </form>
      {post.comments.length > 0 ? (
        <div className="mt-3">
          {post.comments.map((comment) => {
            return (
              <CommentBox
                key={`${comment.userId}${comment.createdAt}`}
                comment={comment}
                authorId={post.author.id}
                postId={post.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="m-2 fw-semibold text-center">No comments</div>
      )}
    </div>
  );
};

export default PostDetailsWithComments;
