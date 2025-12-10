import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "./env";
import { GetRefreshToken } from "../services/Auth";

const http = axios.create({
  baseURL: env.base_url,
  withCredentials: true,
});

interface RequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

http.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<{ status?: boolean; message?: string }>) => {
    const originalRequest = err.config as RequestConfigWithRetry;
    console.log(err);
    if (
      !originalRequest._retry &&
      err.response?.status === 401 &&
      err.response.config.url == "/users/me" &&
      (err.response.data.message == "Access token expired" ||
        err.response.data.message == "No token is provided")
    ) {
      originalRequest._retry = true;
      try {
        // Refresh token API
        const { data }: { data: { accessToken: string } } =
          await GetRefreshToken();
        // Update Axios default Authorization header
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default http;
