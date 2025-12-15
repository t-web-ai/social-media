import { Link } from "react-router";
import { usePostContext } from "../../context/PostContext";
import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}
const PostAction = ({ post }: Props) => {
  const { LikePost } = usePostContext();
  return (
    <div className="d-flex justify-content-between align-items-center fs-5 px-3 py-2 border-top border-1">
      <div className="d-flex gap-2 align-items-center">
        <div
          onClick={() => {
            LikePost(post.id, post.userHasLiked);
          }}
        >
          {post.userHasLiked ? (
            <i className="bi bi-heart-fill"></i>
          ) : (
            <i className="bi bi-heart"></i>
          )}
        </div>
        <div>{post.likeCount}</div>
      </div>
      <Link
        to={`/dashboard/posts/${post.id}`}
        className="d-flex gap-2 align-items-center text-decoration-none text-black"
      >
        <i className="bi bi-chat-square-dots"></i>
        <div>{post.comments.length}</div>
      </Link>
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
