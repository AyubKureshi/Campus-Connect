import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProjectForm from "./pages/Project";
import NotFound from "./pages/NotFound";
import Footer from "./components/footer"
import UserProtectedWrapper from "./components/UserProtectedWrapper";

const App = () => {
  return (
    <div className="pt-18">
      <Alert />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/profile"
          element={
            <UserProtectedWrapper>
              <Profile />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/create"
          element={
            <UserProtectedWrapper>
              <ProjectForm />
            </UserProtectedWrapper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
