import React from "react";
import { BrowserRouter } from "react-router";

interface Props {
  children: React.ReactElement;
}
const MainRouter = ({ children }: Props) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default MainRouter;
