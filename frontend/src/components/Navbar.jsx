import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between py-4 px-8 bg-blue-400">
      <Link to={"/"} className="text-3xl font-bold text-white">
        CC
      </Link>
      <div>
        <input
          className="border rounded-full w-xl px-4 py-1 outline-amber-300 text-lg"
          type="text"
        />
      </div>
      <div className="flex gap-4">
          <Link to={"/create"} className="px-4 py-2 bg-blue-500 rounded-full">
          Create
        </Link>
        <Link to={"/login"} className="px-4 py-2 bg-blue-500 rounded-full">
          Login
        </Link>
        <Link to={"/user/profile"} className="px-4 py-2 bg-blue-500 rounded-full">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
