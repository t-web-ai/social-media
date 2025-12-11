import { useQuery } from "@tanstack/react-query";
import { GetAllPosts } from "../services/Post";
import type { PostResponse } from "../types/PostResponse";

export const PostQuery = () => {
  return useQuery<{ data: PostResponse[] }>({
    queryKey: ["posts"],
    queryFn: async () => {
      const posts = await GetAllPosts({});
      return posts.data;
    },
    refetchOnMount: false,
  });
};
