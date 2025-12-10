import { Link } from "react-router";
import "./DefaultHeader.css";
import LinkItem from "../link/LinkItem";
import { useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";

interface Props {
  title: string;
}
function DefaultHeader({ title }: Props) {
  const { user } = useAuthContext();
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

            {!user && (
              <>
                <LinkItem to="/auth/login">Login</LinkItem>
                <LinkItem to="/auth/register">Register</LinkItem>
              </>
            )}
            {user && (
              <>
                <LinkItem to="/auth/logout">Logout</LinkItem>
                <LinkItem to="/dashboard/posts">Posts</LinkItem>
                <div className="px-2 border border-2 border-black rounded-lg text-center">
                  <LinkItem to="/dashboard/posts">{user.username}</LinkItem>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DefaultHeader;
