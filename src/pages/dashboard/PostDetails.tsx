import { useParams } from "react-router";
import { PostDetailsQuery } from "../../query/PostDetailsQuery";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import PostDetailsWithComments from "../../components/comment/PostDetailsWithComments";
import PostDeleteQuery from "../../query/PostDeleteQuery";
import { PostLikeQuery } from "../../query/PostLikeQuery";
import { PostContextProvider } from "../../context/PostContext";

const PostDetails = () => {
  const PostDeleteMutate = PostDeleteQuery();
  const PostLikeMutate = PostLikeQuery();

  const DeletePost = (id: string) => {
    PostDeleteMutate.mutate(id);
  };

  const DeleteComment = (id: string) => {
    console.log(id);
  };

  const LikePost = (id: string, hasLiked: boolean) => {
    PostLikeMutate.mutate({ id, hasLiked });
  };
  const { id } = useParams<{ id: string }>();
  const { data: post, isFetching } = PostDetailsQuery(id!);

  if (isFetching) return <LoadingSkeleton />;
  if (!post)
    return (
      <div className="fs-5 fw-semibold text-center mt-5">Post is not found</div>
    );
  return (
    <PostContextProvider value={{ DeletePost, DeleteComment, LikePost }}>
      <div className="container mt-2 p-2" style={{ maxWidth: "600px" }}>
        <PostDetailsWithComments post={post} />
      </div>
    </PostContextProvider>
  );
};

export default PostDetails;
