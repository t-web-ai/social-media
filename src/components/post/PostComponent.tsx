import type { PostResponse } from "../../types/PostResponse";
import PostAction from "./PostAction";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

interface Props {
  post: PostResponse;
}
const PostComponent = ({ post }: Props) => {
  return (
    <div className="border border-2 m-2 rounded">
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostAction post={post} />
    </div>
  );
};

export default PostComponent;
