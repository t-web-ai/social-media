import { Link } from "react-router";
import { useForm } from "react-hook-form";
import TextBox from "../../components/input/TextBox";
import { joiResolver } from "@hookform/resolvers/joi";
import { PostSchema } from "../../schema/PostSchema";
import ControllerFile from "../../components/input/ControllerFile";
import { useRef, useState } from "react";
import type { NewPost } from "../../types/NewPost";

import { PostCreateQuery } from "../../query/PostCreateQuery";

const CreatePost = () => {
  const [ImagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ content: string; image?: File | undefined }>({
    resolver: joiResolver(PostSchema),
  });

  const PostCreateMutate = PostCreateQuery();

  const EmitSubmit = async (post: NewPost) => {
    const PostForm = new FormData();
    PostForm.append("content", post.content);
    if (post.image) PostForm.append("image", post.image);
    PostCreateMutate.mutate({ PostForm, setError });
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(EmitSubmit)} className="my-5">
        <div
          onClick={() => {
            imageRef.current?.click();
          }}
          className="border border-2 d-flex align-items-center justify-content-center rounded mb-2"
          style={{ width: "100%", height: "200px", overflow: "hidden" }}
        >
          {ImagePreview ? (
            <img src={ImagePreview} alt="" style={{ objectFit: "cover" }} />
          ) : (
            <i className="bi bi-image" style={{ fontSize: "2rem" }}></i>
          )}
        </div>

        <div hidden>
          <ControllerFile
            name="image"
            control={control}
            accept="image/png"
            setImagePreview={setImagePreview}
            ref={imageRef}
          />
        </div>
        <TextBox
          name="content"
          placeholder="What's on your mind?"
          register={register("content")}
          error={errors["content"]}
        />

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary fw-semibold px-4"
            disabled={isSubmitting}
          >
            Post
          </button>
          <Link to="/dashboard/posts" className="btn fw-semibold">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
