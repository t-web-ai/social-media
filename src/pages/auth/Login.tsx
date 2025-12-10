import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link } from "react-router";
import InputBox from "../../components/input/InputBox";
import { LoginSchema } from "../../schema/AuthSchema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    resolver: joiResolver(LoginSchema),
    mode: "onChange",
  });

  const EmitSubmit = async () => {};

  return (
    <div className="container">
      <form onSubmit={handleSubmit(EmitSubmit)} className="my-5">
        <InputBox
          label="Email"
          name="email"
          error={errors["email"]}
          register={register}
          type="email"
        />
        <InputBox
          label="Password"
          name="password"
          error={errors["password"]}
          register={register}
          type="text"
        />
        <button
          type="submit"
          className="btn btn-primary fs-5"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
      <Link
        to="/auth/register"
        className="text-decoration-none text-center d-block fs-5"
      >
        I don't have an account
      </Link>
    </div>
  );
}

export default Login;
