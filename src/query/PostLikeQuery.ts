import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikePostById, UnlikePostById } from "../services/Post";
import type { PostResponse } from "../types/PostResponse";
import { useAuthContext } from "../context/AuthContext";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed } from "../helper/ToastHelper";

interface Props {
  id: string;
  hasLiked: boolean;
}
export const PostLikeQuery = function () {
  const client = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: async function ({ id, hasLiked }: Props) {
      if (hasLiked) return (await UnlikePostById(id)).data;
      return (await LikePostById(id)).data;
    },
    onMutate: async function ({ id, hasLiked }: Props) {
      await client.cancelQueries({ queryKey: ["posts"] });
      const old = client.getQueryData<{ data: PostResponse[] }>(["posts"]);

      await client.setQueryData(
        ["posts"],
        function (posts: { data: PostResponse[] }) {
          if (!posts) return posts;
          return {
            ...posts,
            data: posts.data.map((post) => {
              if (post.id == id) {
                if (hasLiked) {
                  return {
                    ...post,
                    userHasLiked: false,
                    likeCount: post.likeCount - 1,
                    likes: post.likes.filter((like) => like.id !== user!.id),
                  };
                } else {
                  return {
                    ...post,
                    userHasLiked: true,
                    likeCount: post.likeCount + 1,
                    likes: [
                      ...post.likes,
                      { id: user!.id, username: user?.username! },
                    ],
                  };
                }
              }
              return post;
            }),
          };
        }
      );
      return { old };
    },
    onError: function (error: unknown, _, context) {
      const { message } = AxiosHandler(error);
      if (context?.old) client.setQueryData(["posts"], context?.old);
      failed(message, "like-post");
    },
  });
};
