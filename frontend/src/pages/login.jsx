import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useDispatch } from "react-redux";
import { KeyRound, LogIn, Mail, ShieldCheck } from "lucide-react";
import { toastAction } from "../store/toastSlice";
import { authAction } from "../store/authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, data);

      if (response.status === 200) {
        const payload = response.data;

        dispatch(
          authAction.loginSuccess({
            token: payload.token,
            user: payload.user,
          })
        );

        dispatch(
          toastAction.showToast({
            message: "Login Successfully",
            type: "success",
          })
        );

        navigate("/");
      } else {
        dispatch(
          toastAction.showToast({
            message: "Login failed",
            type: "error",
          })
        );
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      dispatch(
        toastAction.showToast({
          message: msg,
          type: "error",
        })
      );
    }
  };

  return (
    <div className="relative flex min-h-[91vh] items-center justify-center overflow-hidden bg-sky-50 px-4 py-10">
      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />

      <div className="z-10 w-full max-w-md rounded-3xl border border-blue-100 bg-white/95 p-7 shadow-xl backdrop-blur-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-blue-700">
            <ShieldCheck size={22} />
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-800">
            Welcome Back
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Log in to continue to Campus Connect.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
              <Mail size={16} className="text-blue-500" />
              <input
                {...register("email", { required: "Email Address is required" })}
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
              <KeyRound size={16} className="text-blue-500" />
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            <LogIn size={16} />
            Login
          </button>

          <p className="pt-1 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
