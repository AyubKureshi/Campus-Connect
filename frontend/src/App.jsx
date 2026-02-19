import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Profile from "./pages/Project";
import ProjectForm from "./pages/Project";

const App = () => {
  return (
    <div className="pt-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<ProjectForm/>}/>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
