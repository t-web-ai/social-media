import React, { createContext, useContext } from "react";
import type { PostContextType } from "../types/PostContextType";

const PostContext = createContext<PostContextType>({
  DeletePost: () => {},
  DeleteComment: () => {},
  LikePost: () => {},
});
PostContext.displayName = "Post Context";

interface Props {
  value: PostContextType;
  children: React.ReactElement;
}
export function PostContextProvider({ value, children }: Props) {
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export const usePostContext = () => useContext(PostContext);
