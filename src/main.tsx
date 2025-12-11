import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";
import QueryProvider from "./context/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryProvider>
      <Toaster />
      <App />
    </QueryProvider>
  </AuthProvider>
);
