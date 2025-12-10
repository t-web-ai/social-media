import { Route, Routes } from "react-router";
import MainRouter from "./components/router/MainRouter";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/guest/Home";
import NotFound from "./pages/other_pages/NotFound";
import About from "./pages/guest/About";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import GuestRoute from "./components/router/GuestRoute";
import ProtectedRoute from "./components/router/ProtectedRoute";
import Posts from "./pages/dashboard/Posts";
import Logout from "./pages/auth/Logout";

const App = () => {
  return (
    <MainRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {/* guest route - start */}
          <Route element={<GuestRoute />}>
            <Route path="auth/login" element={<LoginForm />} />
            <Route path="auth/register" element={<RegisterForm />} />
          </Route>
          {/* guest route - end  */}

          {/* protected route - start  */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/posts" element={<Posts />} />
            <Route path="auth/logout" element={<Logout />} />
          </Route>
          {/* protected route - end */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainRouter>
  );
};

export default App;
