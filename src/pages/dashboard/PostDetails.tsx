import { useParams } from "react-router";
import { PostDetailsQuery } from "../../query/PostDetailsQuery";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import PostDetailsWithComments from "../../components/comment/PostDetailsWithComments";
import PostDeleteQuery from "../../query/PostDeleteQuery";
import { PostLikeQuery } from "../../query/PostLikeQuery";
import { PostContextProvider } from "../../context/PostContext";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { CommentSchema } from "../../schema/CommentSchema";
import { CommentCreateQuery } from "../../query/CommentCreateQuery";
import type { CommentCreateType } from "../../types/CommentCreateType";
import { useEffect } from "react";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ comment: string; postId: string }>({
    resolver: joiResolver(CommentSchema),
    defaultValues: {
      postId: id,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { data: post, isFetching } = PostDetailsQuery(id!);

  const PostDeleteMutate = PostDeleteQuery();
  const PostLikeMutate = PostLikeQuery();
  const CommentCreateMutate = CommentCreateQuery();

  const DeletePost = (id: string) => {
    PostDeleteMutate.mutate(id);
  };

  const DeleteComment = (id: string) => {
    console.log(id);
  };

  const CommentOnPost = async ({ postId, comment }: CommentCreateType) => {
    reset({ comment: "", postId: id });
    CommentCreateMutate.mutate({ postId, comment });
  };

  const LikePost = (id: string, hasLiked: boolean) => {
    PostLikeMutate.mutate({ id, hasLiked });
  };

  if (isFetching) return <LoadingSkeleton />;
  if (!post)
    return (
      <div className="fs-5 fw-semibold text-center mt-5">Post is not found</div>
    );

  return (
    <PostContextProvider value={{ DeletePost, DeleteComment, LikePost }}>
      <div className="container mt-2 p-2" style={{ maxWidth: "600px" }}>
        <PostDetailsWithComments
          post={post}
          register={register("comment")}
          error={errors["comment"]}
          CommentOnPost={handleSubmit(CommentOnPost)}
          isSubmitting={CommentCreateMutate.isPending}
        />
      </div>
    </PostContextProvider>
  );
};

export default PostDetails;
