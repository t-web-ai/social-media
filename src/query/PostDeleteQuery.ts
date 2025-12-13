import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePostById } from "../services/Post";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed, processing, success } from "../helper/ToastHelper";
import type { PostResponse } from "../types/PostResponse";
import type { DeleteResponse } from "../types/DeleteResponse";

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
      client.setQueryData(
        ["posts"],
        function (posts: { data: PostResponse[] }) {
          return {
            ...posts,
            data: posts.data.filter((post) => {
              return post.id != response.postId;
            }),
          };
        }
      );
    },
    onError: function (error: unknown) {
      const { message } = AxiosHandler(error);
      failed(message, "delete-post");
    },
  });
};

export default PostDeleteQuery;
