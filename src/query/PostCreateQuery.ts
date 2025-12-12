import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosHandler } from "../helper/AxiosHandler";
import { navigator } from "../helper/NavigationHelper";
import { failed, processing, success } from "../helper/ToastHelper";
import { useAuthContext } from "../context/AuthContext";
import { CreateNewPost } from "../services/Post";
import type { NewPostResponse } from "../types/NewPostResponse";
import type { PostResponse } from "../types/PostResponse";
import type { UseFormSetError } from "react-hook-form";

interface Params {
  PostForm: FormData;
  setError: UseFormSetError<{ content: string; image?: File | undefined }>;
}
export const PostCreateQuery = function () {
  const client = useQueryClient();
  const PostCache = client.getQueryData(["posts"]);
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: ["posts"],
    mutationFn: async function ({ PostForm }: Params) {
      processing("Creating a new post...", "create-post");
      return (await CreateNewPost(PostForm)).data;
    },
    onSuccess: function (data: NewPostResponse) {
      client.setQueryData(
        ["posts"],
        function (posts: { data: PostResponse[] }) {
          const NewPost = {
            id: data.id,
            content: data.content,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
            author: {
              id: data.authorId,
              username: user?.username!,
            },
            likes: [],
            comments: [],
            likeCount: 0,
            userHasLiked: false,
          };
          if (PostCache) {
            return {
              ...posts,
              data: [NewPost, ...posts.data],
            };
          }
        }
      );
      success("Successfully created a new post", "create-post");
      navigator.RedirectTo("/dashboard/posts", true);
    },
    onError: function (error: unknown, { setError }: Params) {
      const { message, errors } = AxiosHandler(error);
      if (errors) {
        errors.map((error) => {
          setError(error.field as "content" | "image", {
            message: error.message,
          });
        });
      }
      failed(message, "create-post");
    },
  });
};
