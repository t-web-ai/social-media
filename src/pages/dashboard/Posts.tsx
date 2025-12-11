import { Link } from "react-router";
import PostComponent from "../../components/post/PostComponent";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { PostQuery } from "../../query/PostQuery";

const Posts = () => {
  const { data: posts, isFetching } = PostQuery();
  if (isFetching) return <LoadingSkeleton />;
  console.log(posts);
  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div className="p-2">
        <Link
          to={"/posts/create"}
          className="text-decoration-none fs-5 w-100 d-flex align-items-center btn-group rounded btn btn-primary"
        >
          Create New Post
        </Link>
      </div>
      {posts &&
        posts.data.map((post) => <PostComponent post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
