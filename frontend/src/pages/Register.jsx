import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CircleUserRound,
  KeyRound,
  Mail,
  ShieldPlus,
  UserRoundPen,
} from "lucide-react";
import { BASE_URL } from "../config/config";
import { toastAction } from "../store/toastSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, data);

      if (response.status === 201) {
        dispatch(
          toastAction.showToast({
            message: "Registration successful. Please login.",
            type: "success",
          })
        );
        navigate("/login");
      } else {
        dispatch(
          toastAction.showToast({
            message: response?.data?.message || "Registration failed",
            type: "error",
          })
        );
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";
      dispatch(toastAction.showToast({ message: msg, type: "error" }));
    }
  };

  return (
    <div className="relative flex min-h-[91vh] items-center justify-center overflow-hidden bg-sky-50 px-4 py-10">
      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full bg-blue-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-16 h-56 w-56 rounded-full bg-cyan-200/70 blur-3xl" />

      <div className="z-10 w-full max-w-lg rounded-3xl border border-blue-100 bg-white/95 p-7 shadow-xl backdrop-blur-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-100 text-blue-700">
            <ShieldPlus size={22} />
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-800">Create Account</h2>
          <p className="mt-1 text-sm text-slate-600">Register on Campus Connect and start collaborating.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
              Name
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
                <UserRoundPen size={16} className="text-blue-500" />
                <input
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name must be atleast 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="First name"
                  className="w-full bg-transparent py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
                <CircleUserRound size={16} className="text-blue-500" />
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-transparent py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

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
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters",
                  },
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

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-200">
              <KeyRound size={16} className="text-blue-500" />
              <input
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters",
                  },
                })}
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Register
          </button>

          <p className="pt-1 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
