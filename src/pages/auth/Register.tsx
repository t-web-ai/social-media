import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { RegisterSchema } from "../../schema/AuthSchema";
import InputBox from "../../components/input/InputBox";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; email: string; password: string }>({
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
  });

  const EmitSubmit = async () => {};

  return (
    <div className="container">
      <form onSubmit={handleSubmit(EmitSubmit)} className="my-5">
        <InputBox
          label="Username"
          name="username"
          error={errors["username"]}
          register={register}
          type="text"
        />
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
          Register
        </button>
      </form>
      <Link
        to="/auth/login"
        className="text-decoration-none text-center d-block fs-5"
      >
        I already have an account
      </Link>
    </div>
  );
}

export default Register;
