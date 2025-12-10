import { Link } from "react-router";
function Home() {
  return (
    <div className="pt-5 container ">
      <div>
        <div className="h3">This is a website</div>
        <div className="h3">similar to</div>
        <div className="fw-bold text-primary h1">Facebook</div>
        <div className="h2">You can post, like and comment on posts.</div>
      </div>
      <Link className="btn btn-success fs-5 mt-5 mb-5" to="/auth/login">
        Get Started
      </Link>
    </div>
  );
}

export default Home;
