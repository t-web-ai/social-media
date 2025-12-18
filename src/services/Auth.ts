import http from "../config/http";
import type { Login } from "../types/Login";
import type { Register } from "../types/Register";

export async function LoginAccount({ email, password }: Login) {
  return await http.post("/auth/login", { email, password });
}

export async function RegisterAccount({ username, email, password }: Register) {
  return await http.post("/auth/register", { username, email, password });
}

export async function GetProfile() {
  return await http.get("/users/me");
}

export async function GetRefreshToken() {
  return await http.get("/users/token/refresh");
}

export async function LogoutAccount() {
  return await http.post("/auth/logout");
}
