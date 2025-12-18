import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { Navigate } from "react-router";
import http from "../../config/http";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosHandler } from "../../helper/AxiosHandler";
import { failed, processing, success } from "../../helper/ToastHelper";
import { LogoutAccount } from "../../services/Auth";

const Logout = () => {
  const client = useQueryClient();
  const { setRefresh, loading } = useAuthContext();
  useEffect(() => {
    processing("Logging out...", "logout");
    LogoutAccount()
      .then(() => {
        success("Successfully logout", "logout");
        client.clear();
        http.defaults.headers.common["Authorization"] = null;
        if (setRefresh) setRefresh((refresh) => !refresh);
      })
      .catch((error: unknown) => {
        const { message } = AxiosHandler(error);
        failed(message, "logout");
      });
  }, []);
  return loading ? <LoadingSkeleton /> : <Navigate to={"/"} replace={true} />;
};

export default Logout;
