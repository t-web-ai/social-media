import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { DeletePostById } from "../services/Post";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed, processing, success } from "../helper/ToastHelper";
import type { PostResponse } from "../types/PostResponse";
import type { DeleteResponse } from "../types/DeleteResponse";
import { navigator } from "../helper/NavigationHelper";

const PostDeleteQuery = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: async function (id: string) {
      processing("Deleting the post...", "delete-post");
      return (await DeletePostById(id)).data;
    },
    onSuccess: function (response: DeleteResponse) {
      success(response.message, "delete-post");
      client.setQueryData<InfiniteData<PostResponse[]>>(
        ["posts"],
        function (posts): InfiniteData<PostResponse[]> | undefined {
          if (!posts) return posts;
          return {
            ...posts,
            pages: posts.pages.map((page) => {
              return page.filter((post) => {
                return post.id != response.postId;
              });
            }),
          };
        }
      );
      client.setQueryData(["posts", response.postId], null);
      navigator.RedirectTo("/dashboard/posts/", false);
    },
    onError: function (error: unknown) {
      const { message } = AxiosHandler(error);
      failed(message, "delete-post");
    },
  });
};

export default PostDeleteQuery;
