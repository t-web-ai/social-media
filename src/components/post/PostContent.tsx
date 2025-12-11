import { useState } from "react";
import type { PostResponse } from "../../types/PostResponse";

interface Props {
  post: PostResponse;
}
const PostContent = ({ post }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`fs-5 px-3 p-3 ${
        open ? "text-wrap text-break" : "text-truncate"
      } `}
      onClick={() => setOpen((open) => !open)}
    >
      {post.content}
    </div>
  );
};

export default PostContent;
