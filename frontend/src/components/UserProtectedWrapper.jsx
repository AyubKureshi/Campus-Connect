import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedWrapper = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "student") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default UserProtectedWrapper;
