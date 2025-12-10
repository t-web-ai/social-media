import Cookies from "js-cookie";
export function GetCookie(name: string) {
  return Cookies.get(name);
}

export function RemoveCookie(name: string) {
  return Cookies.remove(name);
}
