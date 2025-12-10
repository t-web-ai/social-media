import { Route, Routes } from "react-router";
import MainRouter from "./components/router/MainRouter";
import GuestLayout from "./layouts/GuestLayout";
import Home from "./pages/guest/Home";
import NotFound from "./pages/other_pages/NotFound";
import About from "./pages/guest/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <MainRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainRouter>
  );
};

export default App;
