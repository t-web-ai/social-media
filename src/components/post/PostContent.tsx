import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}
const PostContent = ({ post }: Props) => {
  return (
    <>
      <div
        className={`px-3 py-1 text-base`}
        style={{
          whiteSpace: "pre-line",
          wordBreak: "break-all",
          fontFamily: "system-ui",
        }}
      >
        {post.content}
      </div>
      {post.imageUrl && (
        <div className="p-2 border-top border-2">
          <img src={post.imageUrl} className="w-100 rounded" />
        </div>
      )}
    </>
  );
};

export default PostContent;
