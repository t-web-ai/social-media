import { Outlet, useNavigate } from "react-router";
import DefaultHeader from "../components/header/DefaultHeader";
import { env } from "../config/env";
import { useEffect } from "react";
import { navigator } from "../helper/NavigationHelper";
import { useAuthContext } from "../context/AuthContext";
import LoadingSkeleton from "../components/skeleton/LoadingSkeleton";

const DefaultLayout = () => {
  const navigateFn = useNavigate();
  const { loading } = useAuthContext();
  useEffect(() => {
    navigator.setNavigate(navigateFn);
  }, []);
  if (loading) return <LoadingSkeleton />;
  return (
    <>
      <DefaultHeader title={env.app_name} />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
