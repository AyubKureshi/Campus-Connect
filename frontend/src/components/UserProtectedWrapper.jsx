import { Navigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtectedWrapper;
