import axios from "axios";
import { GetErrorByStatus } from "../config/errors";
import type { ErrorData } from "../types/ErrorData";

export function AxiosHandler(error: unknown): ErrorData {
  console.log(error);
  if (
    axios.isAxiosError<{
      status: number;
      message: string;
      errors?: Record<string, string>[];
    }>(error)
  ) {
    if (error.request && error.response) {
      const status = error.response.status;
      const message = error.response.data.message || GetErrorByStatus(status);
      const errors = error.response.data.errors;
      return { message, errors };
    }
    return { message: "Network error occurred" };
  } else {
    return { message: "An unexpected error occurred" };
  }
}
