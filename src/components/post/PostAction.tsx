import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}
const PostAction = ({ post }: Props) => {
  return (
    <div className="d-flex justify-content-between align-items-center fs-5 px-3 py-2 border-top border-2">
      <div className="d-flex gap-2 align-items-center">
        <div>
          {post.userHasLiked ? (
            <i className="bi bi-heart-fill"></i>
          ) : (
            <i className="bi bi-heart"></i>
          )}
        </div>
        <div>{post.likeCount}</div>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <i className="bi bi-chat-square-dots"></i>
        <div>{post.comments.length}</div>
      </div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(
            `${location.origin}/dashboard/posts/${post.id}`
          );
        }}
      >
        <i className="bi bi-share-fill"></i>
      </div>
    </div>
  );
};

export default PostAction;
