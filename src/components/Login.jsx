import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { LoginUser } from "../api/Auth";
import { toast, ToastContainer } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 character ").required("Password is required"),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onFocus",

    });
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const onSubmit = async (data) => {

        try {
            const body = {
                email: data.email,
                password: data.password
            };
            const response = await LoginUser(body);

            if (response.data) {
                const token = response.data.data.token;
                console.log(token);

                toast.success("Login successful", {
                    autoClose: 2000,
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate("/dashboard");

                }, 4000);

            }
         
        } catch (error) {
            toast.error("Login Fail")
            console.log("error", error);

        }

    }

    return (
        <div className="font-poppins flex justify-center items-center h-screen max-sm:mx-8 ">
            <ToastContainer />
            <div className="bg-[#F9F8FF] p-15 max-sm:p-5 rounded-[20px] shadow-md w-[455px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center flex gap-2 text-left items-center mb-6 ">
                        <img
                            src="/D Logo.png"
                            alt="Dhiclub Logo"
                            className=""
                        />
                        <p className="text-3xl font-bold font-size-30">
                            Dhiclub
                        </p>

                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold  ">
                            Login to Your Account
                        </h2>
                        <p className="text-sm text-[#AAA9BC]">
                            Enter your credentials to access your account and explore more
                        </p>
                    </div>
                    {/* Email Input */}
                    <div className=" mb-4 flex items-center relative">
                        <img
                            src="/Frame.png"
                            alt="Mail Logo"
                            className="absolute left-0 px-5"
                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            {...register("email")}
                            className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"

                        />

                    </div>

                    {(errors.email &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.email.message}</p>
                    )}
                    {/* Password Input */}
                    <div className="mb-2 mt-2 flex items-center relative">
                        <img
                            src="/Frame-2.png"
                            alt="Password logo"
                            className="absolute left-0 px-5"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            autoComplete="new-password"
                            className="w-full py-3 max-sm:text-sm  pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            {...register("password")}
                        />
                        <span className="absolute right-0 top-4 cursor-pointer" onClick={togglePasswordVisibility}>
                            <img
                                src={showPassword ? "/eye-svgrepo-com.png" : "/eye-close.png"}
                                alt="Password logo"
                                className="left-0 px-5 h-[20px] max-sm:h-[18px]"
                            />
                        </span>

                    </div>
                    {(errors.password &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.password.message}</p>
                    )}
                    {/* Forgot Password */}
                    <div className="mb-6 text-right">
                        <a href="#" className="text-xs text-[#6246EA]  hover:underline font-normal">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 ">
                        <button className="max-sm:p-1   max-sm:px-7  mb-5 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700">
                            Login
                        </button>
                        <button className="max-sm:p-1 max-sm:px-5 mb-5 text-[#6246EA] border border-[#6246EA] rounded-full px-10 py-2 rounded-full hover:bg-purple-50 font-bold">
                            Sign Up
                        </button>
                    </div>
                </form>


            </div>
        </div>

    )
}
export default Login;