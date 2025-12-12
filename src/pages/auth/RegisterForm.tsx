import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { RegisterSchema } from "../../schema/AuthSchema";
import InputBox from "../../components/input/InputBox";
import type { Register } from "../../types/Register";
import { RegisterAccount } from "../../services/Auth";
import { AxiosHandler } from "../../helper/AxiosHandler";
import { failed, processing, success } from "../../helper/ToastHelper";
import { navigator } from "../../helper/NavigationHelper";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; email: string; password: string }>({
    resolver: joiResolver(RegisterSchema),
    mode: "onChange",
  });

  const EmitSubmit = async (credentials: Register) => {
    processing("Registering...", "register");
    try {
      await RegisterAccount(credentials);
      success("Successfully created new account", "register");
      navigator.RedirectTo("/auth/login", true);
    } catch (error: unknown) {
      const { message, errors } = AxiosHandler(error);
      if (errors) {
        errors.map((error) => {
          setError(error.field as "username" | "email" | "password", {
            message: error.message,
          });
        });
      }
      failed(message, "register");
    } finally {
      reset();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(EmitSubmit)} className="my-5">
        <InputBox
          label="Username"
          name="username"
          error={errors["username"]}
          register={register("username")}
          type="text"
        />
        <InputBox
          label="Email"
          name="email"
          error={errors["email"]}
          register={register("email")}
          type="email"
        />
        <InputBox
          label="Password"
          name="password"
          error={errors["password"]}
          register={register("password")}
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

export default RegisterForm;
