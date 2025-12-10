import { Link } from "react-router";
import "./DefaultHeader.css";
import LinkItem from "../link/LinkItem";
import { useRef } from "react";

interface Props {
  title: string;
}
function DefaultHeader({ title }: Props) {
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <nav className="navbar navbar-expand-lg sticky-top header">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 text-dark fw-semibold" to="/">
          {title}
        </Link>
        <button
          ref={toggle}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="btn-close btn p-2"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav ms-auto"
            onClick={() => {
              if (toggle.current?.getAttribute("aria-expanded") == "true") {
                toggle.current.click();
              }
            }}
          >
            <LinkItem to="/">Home</LinkItem>
            <LinkItem to="/about">About</LinkItem>

            <LinkItem to="/auth/login">Login</LinkItem>
            <LinkItem to="/auth/register">Register</LinkItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DefaultHeader;
