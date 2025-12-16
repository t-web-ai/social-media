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

  const isOwner = post.author.id === user?.id;

  return (
    <>
      <DeletePostModal id={post.id} isOpen={isOpen} setOpen={setOpen} />

      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{ backgroundColor: "#f3f3f3ff" }}
      >
        <div>
          <div className="fw-semibold">
            {isOwner ? "You" : post.author.username}
          </div>
          <div className="text-muted fw-semibold">
            {format(new Date(post.createdAt), "MMM d, Y · h:mm a")}
          </div>
        </div>

        {isOwner && (
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 36,
              height: 36,
              cursor: "pointer",
              background: "rgba(220,53,69,0.1)",
            }}
            onClick={() => setOpen(true)}
          >
            <i className="bi bi-trash text-danger" />
          </div>
        )}
      </div>
    </>
  );
};

export default PostHeader;
