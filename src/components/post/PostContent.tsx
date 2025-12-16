import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}

const PostContent = ({ post }: Props) => {
  return (
    <>
      <div
        className="px-4 pb-2 fs-6 fw-semibold"
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          lineHeight: 1.7,
          color: "#1c1e21",
        }}
      >
        {post.content}
      </div>

      {post.imageUrl && (
        <div className="p-1 border-top">
          <img
            src={post.imageUrl}
            alt="post"
            className="w-100"
            style={{
              maxHeight: 460,
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </>
  );
};

export default PostContent;
