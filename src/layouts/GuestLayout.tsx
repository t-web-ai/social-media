import { Outlet } from "react-router";
import DefaultHeader from "../components/header/DefaultHeader";
import { env } from "../config/env";

const GuestLayout = () => {
  return (
    <>
      <DefaultHeader title={env.app_name} />
      <Outlet />
    </>
  );
};

export default GuestLayout;
