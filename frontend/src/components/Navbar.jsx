import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CirclePlus,
  LogIn,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { authAction } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(authAction.logout());
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-blue-100/80 bg-white/90 shadow-sm backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-blue-700 sm:text-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            CC
          </span>
          <span>Campus Connect</span>
        </Link>

        <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-sm lg:flex">
          <Search size={16} className="text-blue-500" />
          <input
            className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            type="text"
            placeholder="Search projects..."
          />
        </div>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
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

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 transition hover:bg-blue-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-slate-900/35"
            aria-label="Close menu backdrop"
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-blue-100 bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-lg font-bold text-slate-800">Menu</p>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 flex w-full items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2">
              <Search size={16} className="text-blue-500" />
              <input
                className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                type="text"
                placeholder="Search projects..."
              />
            </div>

            <div className="space-y-3">
              {user ? (
                <>
                  {user.role === "student" && (
                    <Link
                      to="/create"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <CirclePlus size={16} />
                      Create Project
                    </Link>
                  )}

                  <Link
                    to="/user/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700"
                  >
                    <UserRound size={16} />
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
