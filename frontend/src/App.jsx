import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";

const App = () => {
  return (
    <div className="pt-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/user/profile" element={<Profile />} /> */}
        <Route path="*"  />
      </Routes>
    </div>
  )
}

export default App;
