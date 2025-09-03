import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import axiosAuthInstance from "../../../components/utils/axios/axiosAuthInstance"
import { setToken, setRole } from "../../../components/utils/cookies/cookies";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Changed from onFocus to onChange for better UX
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Fixed: Send data directly, not wrapped in body object
      const response = await axiosAuthInstance.post('socialAuth/authenticate', {
        email: data.email,
        password: data.password,
      });

      if (response?.data) {
        const token = response.data?.data?.accessToken;
        const role = response.data?.data?.role || "Admin";

        if (token) {
          setToken(token);
          if (role) {
            setRole(role);
          }
          navigate("/dashboard");
        } else {
          throw new Error("No token received from server");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className="font-poppins flex justify-center items-center min-h-screen max-sm:mx-8 bg-gray-50">


      <div className="bg-primary-50 p-10 max-sm:p-5 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Logo and Title */}
          <div className="flex gap-3 text-left items-center mb-6">
            <img
              src="/D Logo.png"
              alt="Dhiclub Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-3xl font-bold text-primary-150">
              Dhiclub
            </h1>
          </div>

          {/* Header Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary-150 mb-2">
              Login to Your Account
            </h2>
            <p className="text-sm text-primary-100">
              Enter your credentials to access your account and explore more
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <div className="flex items-center relative">
              <img
                src="/Frame.png"
                alt="Email Icon"
                className="absolute left-4 w-5 h-5 z-10"
              />
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email")}
                className={`w-full py-3 pl-12 pr-4 border rounded-md focus:outline-none  border-primary-100 max-sm:text-sm ${errors.email}`}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="flex items-center relative">
              <img
                src="/Frame-2.png"
                alt="Password Icon"
                className="absolute left-4 w-5 h-5 z-10"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="current-password"
                {...register("password")}
                className={`w-full py-3 pl-12 pr-12 border rounded-md focus:outline-none border-primary-100 transition-colors max-sm:text-sm ${errors.password}`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Show password" : "Hide password"}
              >

              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-primary-200 hover:underline  transition-colors font-normal"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Buttons */}

          <button
            type="submit"

            className="mx-auto w-50 cursor-pointer flex-1 py-3 px-8 bg-primary-200 text-white rounded-full font-medium transition-all duration-200  disabled:bg-primary-200  flex items-center justify-center max-sm:py-2 max-sm:px-6"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-solid rounded-full animate-spin border-t-transparent"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>



        </form>
      </div>
    </div>
  );
};

export default Login;