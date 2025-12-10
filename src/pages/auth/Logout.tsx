import { useEffect } from "react";
import { RemoveCookie } from "../../helper/CookieHelper";
import { useAuthContext } from "../../context/AuthContext";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { Navigate } from "react-router";

const Logout = () => {
  const { setRefresh, loading } = useAuthContext();
  useEffect(() => {
    RemoveCookie("token");
    if (setRefresh) setRefresh((refresh) => !refresh);
  }, []);
  return loading ? <LoadingSkeleton /> : <Navigate to={"/"} replace={true} />;
};

export default Logout;
