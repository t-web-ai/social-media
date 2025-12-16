import http from "../config/http";

export async function AddComment(postId: string, comment: string) {
  return http.post(`/posts/${postId}/comment`, {
    comment,
  });
}

export async function DeleteComment(commentId: string) {
  return await http.delete(`/comments/${commentId}`);
}
