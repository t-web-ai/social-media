import type { PostResponse } from "../../types/PostResponse";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";

interface Props {
  post: PostResponse;
}
const PostHeader = ({ post }: Props) => {
  const { user } = useAuthContext();
  return (
    <div className="fw-semibold d-flex justify-content-between p-3 bg-secondary-subtle">
      {/* post info - start */}
      <div>
        <div>{post.author.id == user?.id ? "You" : post.author.username}</div>
        <div>{format(new Date(post.createdAt), "MM/dd/yyyy h:m:sa")}</div>
      </div>
      {/* post info - end */}

      {/* delete post - start  */}
      {post.author.id == user?.id && (
        <i className="bi bi-trash fs-5 text-danger"></i>
      )}
      {/* delete post - end  */}
    </div>
  );
};

export default PostHeader;
