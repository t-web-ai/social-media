import type React from "react";
import { NavLink } from "react-router";

interface Props {
  children: React.ReactNode;
  to: string;
}
function LinkItem({ children, to }: Props) {
  return (
    <li className="nav-item fs-5 pe-3">
      <NavLink
        className={({ isActive }) => {
          return `nav-link ${isActive ? "fw-bold" : ""}`;
        }}
        aria-current="page"
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default LinkItem;
