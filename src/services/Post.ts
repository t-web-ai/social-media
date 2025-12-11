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
