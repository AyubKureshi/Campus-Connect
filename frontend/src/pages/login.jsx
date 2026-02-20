import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../config/config";
import { useDispatch } from "react-redux";
import { toastAction } from "../store/toastSlice";

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

      if(response.status === 201) {
        const data = await response.data;
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('user', data.user);
        dispatch(toastAction.showToast({
          message: "Login Successfully", 
          type: "success"
        }));
        navigate('/');
      } else {
        dispatch(toastAction.showToast({
          message: "Login failed", 
          type: "error"
        }));
      }
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      dispatch(toastAction.showToast({
        message: msg, 
        type: "error"
      }));
    }
  }


  return (
    <div className="flex flex-col w-full h-[91vh] justify-center items-center bg-[#e9fbff]">
      <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-96 bg-white shadow-lg py-4 px-6 rounded-xl"
      >
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer px-4 py-2 mt-3 text-white bg-blue-400 hover:bg-blue-600 rounded-lg"
        >
          Login
        </button>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
