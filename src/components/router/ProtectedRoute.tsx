import { useAuthContext } from "../../context/AuthContext";
import LoadingSkeleton from "../skeleton/LoadingSkeleton";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  if (!user && loading) return <LoadingSkeleton />;
  if (!user && !loading) return <Navigate to={"/"} replace={true} />;
  return <Outlet />;
};

export default ProtectedRoute;
