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

const App = () => {
  return (
    <div className="pt-18">
      <Alert />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/create" element={<ProjectForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default App;
