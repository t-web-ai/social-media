import toast, { type ToastOptions } from "react-hot-toast";

const toastOptions: ToastOptions = {
  style: { fontSize: "1.2rem" },
};

export function success(message: string, id: string) {
  toastOptions.id = id;
  toast.success(message, toastOptions);
}

export function failed(message: string, id: string) {
  toastOptions.id = id;
  toast.error(message, toastOptions);
}

export function processing(message: string, id: string) {
  toastOptions.id = id;
  toast.loading(message, toastOptions);
}
