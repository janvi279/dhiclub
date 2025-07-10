import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Yup Schema
const schema = yup.object().shape({

  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  otp: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const MobileVerify = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log("Submitting", data);
    toast.success("Submitted successfully!");
    setTimeout(() => navigate("/addMember"), 1000);
  };

  return (
    <>
      <ToastContainer />
      <div className="font-sans flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8"
        >
          <button
            type="button"
            className="mb-5 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700"
          >
            Step-1
          </button>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Verify Mobile Number :
            </label>
            <input
              type="text"
              {...register("mobile")}
              className="w-full max-sm:text-sm py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* OTP */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Verify OTP :</label>
            <input
              type="text"
              {...register("otp")}
              className="w-full max-sm:text-sm py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#6246EA] text-white px-6 py-2 rounded hover:bg-[#6246EA]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default MobileVerify;
