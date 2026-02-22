import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  CirclePlus,
  UserRound,
  LogOut,
  LogIn,
  Menu,
  X,
  ChevronDown,
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

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-blue-100/80 bg-white/95 shadow-sm backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-blue-700"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-md">
            CC
          </span>
          <span className="hidden text-xl font-extrabold tracking-tight sm:block">
            Campus Connect
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden w-full max-w-md items-center gap-2 rounded-full border border-blue-100 bg-slate-50 px-4 py-2 transition-focus-within ring-blue-500 focus-within:ring-1 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            type="text"
            placeholder="Search projects..."
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {user.role === "student" && (
                <Link
                  to="/create"
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
                >
                  <CirclePlus size={18} />
                  <span>Create</span>
                </Link>
              )}

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 hover:bg-slate-50 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                    <UserRound size={18} />
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/user/profile"
                      className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-blue-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] md:hidden transition ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 backdrop-blur-sm transition ${
            isMobileMenuOpen ? "bg-slate-900/40 opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-800">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:outline-none"
                  placeholder="Search..."
                />
              </div>

              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Account
                    </p>
                    <Link
                      to="/user/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-slate-700"
                    >
                      <UserRound size={20} /> Profile
                    </Link>
                    {user.role === "student" && (
                      <Link
                        to="/create"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-2 text-blue-600 font-medium"
                      >
                        <CirclePlus size={20} /> Create Project
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 py-3 px-4 text-red-600 font-medium"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl bg-blue-600 py-3 text-center font-bold text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
