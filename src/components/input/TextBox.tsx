import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  error: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
}
const TextBox = ({ name, label, error, register, placeholder }: Props) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label fs-5">
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="form-control fs-5"
        rows={4}
        style={{ resize: "none" }}
        {...register}
        placeholder={placeholder}
      ></textarea>
      {error && (
        <div className="alert alert-danger fs-5 my-2">{error.message}</div>
      )}
    </div>
  );
};

export default TextBox;
