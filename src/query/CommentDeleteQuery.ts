import { useMutation } from "@tanstack/react-query";

import { DeleteComment } from "../services/Comment";
import type { CommentDeletType } from "../types/CommentDeleteType";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed, processing, success } from "../helper/ToastHelper";
import type { PostResponse } from "../types/PostResponse";

export const CommentDeleteQuery = function () {
  return useMutation({
    mutationFn: async function ({ commentId }: CommentDeletType) {
      processing("Deleting the comment...", "delete-comment");
      return (await DeleteComment(commentId)).data;
    },
    onSuccess: function (
      _,
      { postId, commentId }: CommentDeletType,
      __,
      context
    ) {
      success("Deleted the comment successfully", "delete-comment");
      context.client.setQueryData(
        ["posts", postId],
        function (post: PostResponse): PostResponse {
          if (!post) return post;
          return {
            ...post,
            comments: post.comments.filter((comment) => {
              return comment.id != commentId;
            }),
          };
        }
      );
      context.client.setQueryData(
        ["posts"],
        function (posts: { data: PostResponse[] }) {
          if (!posts) return posts;
          return {
            ...posts,
            data: posts.data.map((post) => {
              if (post.id != postId) return post;
              return {
                ...post,
                comments: post.comments.filter((comment) => {
                  return comment.id != commentId;
                }),
              };
            }),
          };
        }
      );
    },
    onError: function (error: unknown) {
      const { message } = AxiosHandler(error);
      failed(message, "delete-comment");
    },
  });
};
