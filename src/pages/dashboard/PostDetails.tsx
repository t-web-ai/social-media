import { useParams } from "react-router";
import { PostDetailsQuery } from "../../query/PostDetailsQuery";
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
import { CommentDeleteQuery } from "../../query/CommentDeleteQuery";
import NotFound from "../other/NotFound";
import PostDetailsLoadingSkeleton from "../../components/skeleton/PostDetailsLoadingSkeleton";

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
  const CommentDeleteMutate = CommentDeleteQuery();

  const DeletePost = (id: string) => {
    PostDeleteMutate.mutate(id);
  };

  const DeleteComment = (id: string) => {
    CommentDeleteMutate.mutate({ postId: post!.id, commentId: id });
  };

  const CommentOnPost = async ({ postId, comment }: CommentCreateType) => {
    reset({ comment: "", postId: id });
    CommentCreateMutate.mutate({ postId, comment });
  };

  const LikePost = (id: string, hasLiked: boolean) => {
    PostLikeMutate.mutate({ id, hasLiked });
  };

  if (isFetching)
    return (
      <div className="container mt-2 p-2" style={{ maxWidth: "600px" }}>
        <PostDetailsLoadingSkeleton />
      </div>
    );
  if (!post) return <NotFound />;

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
