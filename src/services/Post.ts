import http from "../config/http";

interface Filter {
  keyword?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}
export async function GetAllPosts({
  page = 1,
  limit = 10,
}: Omit<Filter, "keyword">) {
  return await http.get("/posts", {
    params: {
      page,
      limit,
    },
  });
}

export async function CreateNewPost(PostForm: FormData) {
  return await http.post("/posts", PostForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function DeletePostById(id: string) {
  return await http.delete(`/posts/${id}`);
}

export async function LikePostById(id: string) {
  return await http.post(`/posts/${id}/like`);
}

export async function UnlikePostById(id: string) {
  return await http.delete(`/posts/${id}/like`);
}
