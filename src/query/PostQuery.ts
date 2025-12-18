import { useInfiniteQuery } from "@tanstack/react-query";
import { GetAllPosts } from "../services/Post";
import type { PostResponse } from "../types/PostResponse";

export const PostQuery = () => {
  return useInfiniteQuery<PostResponse[]>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const posts = await GetAllPosts({ page: Number(pageParam), limit: 5 });
      return posts.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: function (lastPage, allPages) {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    },
    refetchOnMount: false,
  });
};
