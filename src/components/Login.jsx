import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    });
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('email', email)
        console.log('password', password)
        navigate("/dashboard")

    }

    return (
        <div className="font-poppins flex justify-center items-center h-screen max-sm:m-5 ">
            <div className="bg-[#F9F8FF] p-15 max-sm:p-8 rounded-[20px] shadow-md w-[455px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center flex gap-2 text-left items-center mb-6 ">
                        <img
                            src="/D Logo.png" // Replace with actual logo path
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
                    <div className="mb-4 flex items-center relative">
                        <img
                            src="/Frame.png"
                            alt="Mail Logo"
                            className="absolute left-0 px-5"
                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            {...register("email")}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 pl-2">{errors.email.message}</p>
                        )}
                    </div>


                    {/* Password Input */}
                    <div className="mb-2 flex items-center relative">
                        <img
                            src="/Frame-2.png"
                            alt="Password logo"
                            className="absolute left-0 px-5"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
                            {...register("password")}
                        />
                        <span className="absolute right-0 top-4 cursor-pointer" onClick={togglePasswordVisibility}>
                            <img
                                src={showPassword ? "/eye-svgrepo-com.png" : "/eye-open.png"}
                                alt="Password logo"
                                className="left-0 px-5 h-[20px]"
                            />
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 pl-2">{errors.password.message}</p>
                        )}
                    </div>
                    {/* Forgot Password */}
                    <div className="mb-6 text-right">
                        <a href="#" className="text-xs text-[#6246EA]  hover:underline font-normal">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 ">
                        <button className="max-sm:p-1 max-sm:px-8 mb-5 bg-[#6246EA] text-white  px-10 py-2 rounded-full hover:bg-purple-700">
                            Login
                        </button>
                        {/* <button className=" max-sm:px-0 border border-[#6246EA] text-[#6246EA] px-10 py-2 rounded-full hover:bg-purple-50 font-bold">
                        Sign Up
                    </button> */}
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