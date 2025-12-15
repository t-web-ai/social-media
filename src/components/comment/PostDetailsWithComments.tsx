import type { PostResponse } from "../../types/PostResponse";
import PostComponent from "../post/PostComponent";
import CommentBox from "./CommentBox";

interface Props {
  post: PostResponse;
}
const PostDetailsWithComments = ({ post }: Props) => {
  return (
    <div>
      <PostComponent post={post} />
      {post.comments.length > 0 ? (
        <div>
          <div className="m-2 fw-semibold">Comments</div>
          {post.comments.map((comment) => {
            return (
              <CommentBox
                key={`${comment.userId}${comment.createdAt}`}
                comment={comment}
                authorId={post.author.id}
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
