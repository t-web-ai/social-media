import {
  useQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type { PostResponse } from "../types/PostResponse";
import { GetPostById } from "../services/Post";

export const PostDetailsQuery = function (id: string) {
  const client = useQueryClient();
  return useQuery<PostResponse>({
    queryKey: ["posts", id],
    queryFn: async function () {
      return (await GetPostById(id)).data;
    },
    initialData: () => {
      return client
        .getQueryData<InfiniteData<PostResponse[]>>(["posts"])
        ?.pages.flat()
        .find((post) => post.id === id);
    },
    refetchOnMount: false,
    retry: 0,
  });
};
