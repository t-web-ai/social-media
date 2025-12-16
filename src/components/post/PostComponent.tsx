import type { PostResponse } from "../../types/PostResponse";
import PostAction from "./PostAction";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

interface Props {
  post: PostResponse;
}

const PostComponent = ({ post }: Props) => {
  return (
    <div
      className="card my-4 border-1 mx-2 overflow-hidden"
      style={{
        borderRadius: 14,
      }}
    >
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostAction post={post} />
    </div>
  );
};

export default PostComponent;
