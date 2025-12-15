import type { PostResponse } from "../../types/PostResponse";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import DeletePostModal from "../ui/modal/DeletePostModal";
import { useState } from "react";

interface Props {
  post: PostResponse;
}
const PostHeader = ({ post }: Props) => {
  const { user } = useAuthContext();
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="fw-bold d-flex justify-content-between p-3 bg-secondary-subtle">
      <DeletePostModal id={post.id} isOpen={isOpen} setOpen={setOpen} />
      {/* post info - start */}
      <div>
        <div>{post.author.id == user?.id ? "You" : post.author.username}</div>
        <div>{format(new Date(post.createdAt), "MM/dd/yyyy h:m:sa")}</div>
      </div>
      {/* post info - end */}

      {/* delete post - start  */}
      {post.author.id == user?.id && (
        <i
          className="bi bi-trash fs-5 text-danger"
          onClick={() => setOpen(true)}
        ></i>
      )}
      {/* delete post - end  */}
    </div>
  );
};

export default PostHeader;
