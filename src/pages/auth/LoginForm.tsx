import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link } from "react-router";
import InputBox from "../../components/input/InputBox";
import { LoginSchema } from "../../schema/AuthSchema";
import type { Login } from "../../types/Login";
import { LoginAccount } from "../../services/Auth";
import { AxiosHandler } from "../../helper/AxiosHandler";
import type { ErrorData } from "../../types/ErrorData";
import { failed, processing, success } from "../../helper/ToastHelper";
import { useAuthContext } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

function LoginForm() {
  const { setRefresh } = useAuthContext();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({
    resolver: joiResolver(LoginSchema),
    mode: "onChange",
  });

  const client = useQueryClient();
  const EmitSubmit = async (credentials: Login) => {
    processing("Logging in...", "login");
    try {
      await LoginAccount(credentials);
      success("Successfully logged in", "login");
      client.refetchQueries({ queryKey: ["posts"] });
      if (setRefresh) {
        setRefresh((refresh) => !refresh);
      }
    } catch (error: unknown) {
      const { message, errors }: ErrorData = AxiosHandler(error);
      if (errors) {
        errors.map((error) => {
          setError(error.field as "email" | "password", {
            message: error.message,
          });
        });
      }
      failed(message, "login");
    } finally {
      reset();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(EmitSubmit)} className="my-5">
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

export default LoginForm;
