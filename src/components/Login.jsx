import React from "react";

const Login = () => {
    return (
        <div className="font-poppins flex justify-center items-center h-screen  ">
            <div class="bg-[#F9F8FF] p-15 rounded-[20px] shadow-md w-[455px]">
                <div className="text-center flex gap-2 text-left items-center mb-6 ">
                    <img
                        src="/D Logo.png" // Replace with actual logo path
                        alt="Dhiclub Logo"
                        className=""
                    />
                    <p className="text-3xl font-bold font-size-30  ">
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
                        className="w-full py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>


                {/* Password Input */}
                <div className="mb-2 flex items-center relative">
                    <img
                        src="/Frame-2.png"
                        alt="Password logo"
                        className="absolute left-0 px-5"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full py-3 pl-12 border border-gray-300 rounded-md "
                    />
                    <span className="absolute right-0 top-4 cursor-pointer">
                        <img
                            src="/password hide & show.png"
                            alt="Password logo"
                            className="left-0 px-5"
                        />
                    </span>
                </div>
                {/* Forgot Password */}
                <div className="mb-6 text-right">
                    <a href="#" className="text-xs text-[#6246EA]  hover:underline font-normal">
                        Forgot Password?
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button className="bg-[#6246EA] text-white px-10 py-2 rounded-full hover:bg-purple-700">
                        Login
                    </button>
                    <button className="border border-purple-600 text-[#6246EA] px-10 py-2 rounded-full hover:bg-purple-50 font-bold">
                        Sign Up
                    </button>
                </div>

            </div>
        </div>

    )
}
export default Login;