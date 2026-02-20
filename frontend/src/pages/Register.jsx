import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
      const response = await axios.post(`${BASE_URL}/users/login`, data);

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
    <div className="flex flex-col w-full h-[91vh] justify-center items-center bg-[#e9fbff]">
      <h2 className="text-3xl font-bold">Hello!</h2>
      <p className="mb-6 text-black/70">Regiter on Campus Connect</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-96 bg-white shadow-lg py-4 px-6 rounded-xl"
      >
        <label htmlFor="name" className="mt-3 font-semibold">
          Name:{" "}
        </label>
        <div className="flex gap-3">
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
            className="w-1/2 focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
          />
          <input
            {...register("lastName")}
            type="text"
            placeholder="Last name"
            className="w-1/2 focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
          />
        </div>
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName.message}</p>
        )}
        <label htmlFor="email" className="mt-3 font-semibold">
          Email:{" "}
        </label>
        <input
          {...register("email", { required: "Email Address is required" })}
          type="email"
          placeholder="Enter email"
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
        <label htmlFor="password" className="mt-3 font-semibold">
          Password:{" "}
        </label>
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
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
        <label htmlFor="password" className="mt-3 font-semibold">
          Confirm password:{" "}
        </label>
        <input
          {...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="focus-within:outline-red-600 focus-within:outline-2 rounded-lg py-2 px-4 outline outline-blue-200"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer px-4 py-2 mt-3 bg-blue-400 rounded-lg"
        >
          Register
        </button>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
