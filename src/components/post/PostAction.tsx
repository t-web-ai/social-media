import { Link } from "react-router";
import { usePostContext } from "../../context/PostContext";
import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}

const PostAction = ({ post }: Props) => {
  const { LikePost } = usePostContext();

  const ActionButton = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div
      onClick={onClick}
      className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
      style={{
        cursor: "pointer",
        transition: "all .2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(0,0,0,.05)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </div>
  );

  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top">
      <ActionButton onClick={() => LikePost(post.id, post.userHasLiked)}>
        <i
          className={`bi ${
            post.userHasLiked ? "bi-heart-fill text-danger" : "bi-heart"
          } fs-5`}
        />
        <span className="small fw-medium">{post.likeCount}</span>
      </ActionButton>

      <Link
        to={`/dashboard/posts/${post.id}`}
        className="text-decoration-none text-muted"
      >
        <ActionButton>
          <i className="bi bi-chat-square-dots fs-5" />
          <span className="small fw-medium">{post.comments.length}</span>
        </ActionButton>
      </Link>

      <ActionButton
        onClick={() =>
          navigator.clipboard.writeText(
            `${location.origin}/dashboard/posts/${post.id}`
          )
        }
      >
        <i className="bi bi-share fs-5" />
      </ActionButton>
    </div>
  );
};

export default PostAction;
