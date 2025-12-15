import { useEffect } from "react";
import { RemoveCookie } from "../../helper/CookieHelper";
import { useAuthContext } from "../../context/AuthContext";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { Navigate } from "react-router";
import http from "../../config/http";
import { useQueryClient } from "@tanstack/react-query";

const Logout = () => {
  const client = useQueryClient();
  const { setRefresh, loading } = useAuthContext();
  useEffect(() => {
    client.clear();
    http.defaults.headers.common["Authorization"] = null;
    RemoveCookie("token");
    if (setRefresh) setRefresh((refresh) => !refresh);
  }, []);
  return loading ? <LoadingSkeleton /> : <Navigate to={"/"} replace={true} />;
};

export default Logout;
