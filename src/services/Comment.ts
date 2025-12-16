import http from "../config/http";

export async function AddComment(postId: string, comment: string) {
  return http.post(`/posts/${postId}/comment`, {
    comment,
  });
}
