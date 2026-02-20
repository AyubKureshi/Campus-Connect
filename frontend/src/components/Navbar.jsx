import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-white shadow-md">
      <Link to={"/"} className="text-2xl font-bold text-blue-600 tracking-wide">
        CC
      </Link>

      <div className="w-1/3">
        <input
          className="w-full border border-gray-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="Search projects..."
        />
      </div>

      <div className="flex gap-4">
        {/* If user logged in */}
        {user ? (
          <>
            {user.role === "student" && (
              <Link
                to={"/create"}
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition duration-200"
              >
                Create
              </Link>
            )}

            <Link
              to={"/user/profile"}
              className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600 hover:text-white transition duration-200"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition duration-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
