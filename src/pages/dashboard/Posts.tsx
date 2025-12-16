import { Link } from "react-router";
import PostComponent from "../../components/post/PostComponent";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { PostQuery } from "../../query/PostQuery";
import { PostContextProvider } from "../../context/PostContext";
import PostDeleteQuery from "../../query/PostDeleteQuery";
import { PostLikeQuery } from "../../query/PostLikeQuery";

const Posts = () => {
  const { data: posts, isFetching } = PostQuery();

  const PostDeleteMutate = PostDeleteQuery();
  const PostLikeMutate = PostLikeQuery();

  const DeletePost = (id: string) => {
    PostDeleteMutate.mutate(id);
  };

  const LikePost = (id: string, hasLiked: boolean) => {
    PostLikeMutate.mutate({ id, hasLiked });
  };
  console.log(posts);

  if (isFetching) return <LoadingSkeleton />;
  return (
    <PostContextProvider value={{ DeletePost, LikePost }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="p-2">
          <Link
            to={"/dashboard/posts/create"}
            className="text-decoration-none fs-5 w-100 d-flex align-items-center rounded mt-2"
          >
            <input
              type="button"
              className="w-100 rounded-pill border fs-5 px-3 py-2"
              value="What's on your mind?"
            />
          </Link>
        </div>
        {posts &&
          posts?.data &&
          posts.data.map((post) => <PostComponent post={post} key={post.id} />)}
      </div>
    </PostContextProvider>
  );
};

export default Posts;
