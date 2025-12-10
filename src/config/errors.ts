const errors: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Data Conflict",
  500: "Internal Server Error",
};
export function GetErrorByStatus(status: number) {
  return (errors as Record<number, string>)[status] ?? "Something went wrong!";
}
