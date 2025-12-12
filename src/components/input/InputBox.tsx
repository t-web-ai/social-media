import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  error: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
}
function InputBox({ name, label, type, error, register }: Props) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fs-5">
        {label}
      </label>
      <input
        type={type}
        className="form-control fs-5"
        id={name}
        {...register}
      />
      {error && (
        <div className="alert alert-danger fs-5 my-2">{error.message}</div>
      )}
    </div>
  );
}

export default InputBox;
