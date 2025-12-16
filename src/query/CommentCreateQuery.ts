import { useMutation } from "@tanstack/react-query";
import { AddComment } from "../services/Comment";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed } from "../helper/ToastHelper";
import type { CommentCreateType } from "../types/CommentCreateType";
import type { Comment } from "../types/Comment";
import type { PostResponse } from "../types/PostResponse";
import { useAuthContext } from "../context/AuthContext";

export const CommentCreateQuery = function () {
  const { user } = useAuthContext();
  return useMutation({
    mutationFn: async function ({ postId, comment }: CommentCreateType) {
      return (await AddComment(postId, comment)).data;
    },
    onSuccess: function (
      {
        data: comment,
      }: {
        data: {
          id: string;
          userId: string;
          postId: string;
          comment: string;
          createdAt: string;
          updatedAt: string;
        };
      },
      { postId },
      _,
      context
    ) {
      const NewComment: Comment = {
        id: comment.id,
        userId: comment.userId,
        user: {
          username: user!.username,
          email: user!.email,
        },
        comment: comment.comment,
        createdAt: comment.createdAt,
      };
      context.client.setQueryData(
        ["posts", postId],
        function (post: PostResponse): PostResponse {
          if (!post) return post;
          return {
            ...post,
            comments: [NewComment, ...post.comments],
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
                comments: [NewComment, ...post.comments],
              };
            }),
          };
        }
      );
    },
    onError: function (error: unknown) {
      const { message } = AxiosHandler(error);
      failed(message, "create-comment");
    },
  });
};
