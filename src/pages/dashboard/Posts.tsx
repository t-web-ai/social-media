import { Link } from "react-router";
import PostComponent from "../../components/post/PostComponent";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { PostQuery } from "../../query/PostQuery";
import { PostContextProvider } from "../../context/PostContext";
import PostDeleteQuery from "../../query/PostDeleteQuery";
import { PostLikeQuery } from "../../query/PostLikeQuery";

const Posts = () => {
  const {
    data: posts,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = PostQuery();

  const PostDeleteMutate = PostDeleteQuery();
  const PostLikeMutate = PostLikeQuery();

  const DeletePost = (id: string) => {
    PostDeleteMutate.mutate(id);
  };

  const LikePost = (id: string, hasLiked: boolean) => {
    PostLikeMutate.mutate({ id, hasLiked });
  };
  if (isPending) return <LoadingSkeleton />;
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
          posts.pages &&
          posts.pages
            .flat()
            .map((post) => <PostComponent post={post} key={post.id} />)}
        <div className="d-flex justify-content-center my-3">
          {isFetching ? (
            <div className="text-center py-3 fw-semibold text-muted">
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            hasNextPage && (
              <div className="text-center py-3">
                <button
                  className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"
                  onClick={() => fetchNextPage()}
                >
                  See More
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </PostContextProvider>
  );
};

export default Posts;
