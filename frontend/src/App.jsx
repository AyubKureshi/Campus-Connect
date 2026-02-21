import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProjectForm from "./pages/Project";
import NotFound from "./pages/NotFound";
import Footer from "./components/footer"
import ProjectDetails from "./pages/ProjectDetail";
import UserProtectedWrapper from "./components/UserProtectedWrapper";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <div className="min-h-screen bg-[#e9fbff] pt-16 flex flex-col">
      <Alert />
      <Navbar />
      <main className="flex-1">
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
            path="/user/edit-profile"
            element={
              <UserProtectedWrapper>
                <EditProfile />
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
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
