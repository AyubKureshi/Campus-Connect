import { Navigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "student") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default UserProtectedWrapper;
