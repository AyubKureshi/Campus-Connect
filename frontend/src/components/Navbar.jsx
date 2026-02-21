import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CirclePlus, LogIn, LogOut, Search, UserRound } from "lucide-react";
import { authAction } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-blue-100/80 bg-white/90 shadow-sm backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-blue-700 sm:text-2xl"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            CC
          </span>
          <span>Campus Connect</span>
        </Link>

        <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm md:flex">
          <Search size={16} className="text-blue-500" />
          <input
            className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            type="text"
            placeholder="Search projects..."
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {user.role === "student" && (
                <Link
                  to="/create"
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <CirclePlus size={16} />
                  <span>Create</span>
                </Link>
              )}

              <Link
                to="/user/profile"
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
              >
                <UserRound size={16} />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <span>Login</span>
              <LogIn size={16} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
