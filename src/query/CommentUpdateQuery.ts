import { useMutation, type InfiniteData } from "@tanstack/react-query";
import { UpdateComment } from "../services/Comment";
import { AxiosHandler } from "../helper/AxiosHandler";
import { failed, processing, success } from "../helper/ToastHelper";
import type { PostResponse } from "../types/PostResponse";
import type { Comment } from "../types/Comment";

interface VariableProps {
  commentId: string;
  comment: string;
  postId: string;
}

export const CommentUpdateQuery = function () {
  return useMutation({
    mutationFn: async function ({ commentId, comment }: VariableProps) {
      processing("Updating the comment...", "update-comment");
      return (await UpdateComment(commentId, comment)).data;
    },
    onSuccess: function (
      _,
      { postId, commentId, comment: cmt }: VariableProps,
      __,
      context
    ) {
      success("Successfully updated the comment", "update-comment");

      context.client.setQueryData(
        ["posts", postId],
        function (post: PostResponse): PostResponse {
          if (!post) return post;
          return {
            ...post,
            comments: post.comments.map(function (comment): Comment {
              if (comment.id == commentId) {
                return {
                  ...comment,
                  comment: cmt,
                };
              }
              return comment;
            }),
          };
        }
      );

      context.client.setQueryData<InfiniteData<PostResponse[]>>(
        ["posts"],
        function (posts): InfiniteData<PostResponse[]> | undefined {
          if (!posts) return posts;
          return {
            ...posts,
            pages: posts.pages.map((page) => {
              return page.map(function (post): PostResponse {
                if (post.id == postId) {
                  return {
                    ...post,
                    comments: post.comments.map(function (comment): Comment {
                      return {
                        ...comment,
                        comment: cmt,
                      };
                    }),
                  };
                }
                return post;
              });
            }),
          };
        }
      );
    },
    onError: function (error: unknown) {
      const { message } = AxiosHandler(error);
      failed(message, "update-comment");
    },
  });
};
