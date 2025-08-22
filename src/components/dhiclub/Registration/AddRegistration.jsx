import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    businessDomain: "",
    forum: "Shakti",
  });

  const countries = ["India", "USA", "Canada"];
  const states = ["Gujarat", "Maharashtra", "Delhi"];
  const cities = ["Ahmedabad", "Mumbai", "Delhi"];
  const businessDomains = ["IT", "Finance", "Healthcare"];
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };



  return (
    <div className=" mt-10 p-8 bg-white rounded-2xl shadow-sm">
      {/* Heading */}
      <h1 className="text-xl font-semibold text-primary-150 mb-6">
Registration
      </h1>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-10 text-md text-[#AAA9BC]">
        <span
          className={`font-semibold ${
            step === 1 ? "text-primary-200" : "text-[#AAA9BC]"
          }`}
        >
          Step 1
        </span>
        <span>
          <FaLongArrowAltRight />
        </span>
        <span
          className={`font-semibold ${
            step === 2 ? "text-primary-200" : "text-[#AAA9BC]"
          }`}
        >
          Step 2
        </span>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Country */}
            <div>
              <label className="block mb-2 text-primary-150 font-semibold text-md">
                Select Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-120 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block mb-2 text-primary-150 font-semibold text-md">
                Select State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-120 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 text-primary-150 font-semibold text-md">
                Select City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-120 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Business Domain */}
            <div>
              <label className="block mb-2 text-primary-150 font-semibold text-md">
                Select Business Domain
              </label>
              <select
                name="businessDomain"
                value={formData.businessDomain}
                onChange={handleChange}
                className="w-120 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">Select Business Domain</option>
                {businessDomains.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Forum Selection */}
          <div className="mt-5">
            <label className="block mb-2 text-primary-150 font-semibold text-md">
              Select Forum
            </label>
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="forum"
                  value="Shakti"
                  checked={formData.forum === "Shakti"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Shakti
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="forum"
                  value="Laxmi"
                  checked={formData.forum === "Laxmi"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Laxmi
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary-200 text-white px-[30px] py-[10px] rounded-full cursor-pointer flex items-center gap-2 font-semibold"
            >
              Next
            </button>
            <button
              type="button"
              onClick={()=>navigate("/Dhiclub/members")}
              className="border border-[#6246EA] font-semibold px-[30px] py-[10px] rounded-full cursor-pointer flex items-center text-primary-200 gap-2"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Step 2 */}
     {step === 2 && (
  <>
   

    {/* Mobile Number */}
    <div className="mb-5">
      <label className="block mb-2 text-primary-150 font-semibold">
        Mobile Number<span className="text-red-500">*</span>
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          name="mobileNumber"
          placeholder="Enter Mobile Number"
          className="border border-gray-300 rounded-xl px-3 py-2 flex-1 focus:outline-none"
        />
        <button
          type="button"
          className="bg-[#EDEBFF] text-primary-200 px-4 py-2 rounded-xl font-semibold"
        >
          Send OTP
        </button>
      </div>
    </div>

    {/* OTP Input */}
    <div className="mb-3">
      <label className="block mb-2 text-primary-150 font-semibold">
        Enter OTP sent to your mobile number
      </label>
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:outline-none"
          />
        ))}
      </div>
    </div>

    {/* Resend OTP */}
    <div className="text-sm text-gray-500 mb-8">
      Didn’t receive OTP?{" "}
      <button
        type="button"
        className="text-primary-200 font-semibold hover:underline"
      >
        Resend OTP
      </button>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-4 mt-8">
      <button
        type="button"
        onClick={handleBack}
        className="border border-[#6246EA] font-semibold px-[30px] py-[10px] rounded-full cursor-pointer flex items-center text-primary-200 gap-2"
      >
        Back
      </button>
      <button
      onClick={()=>navigate("/Dhiclub/members/AddMember/personalDetail")}
        type="submit"
        className="bg-primary-200 text-white px-[30px] py-[10px] rounded-full cursor-pointer flex items-center gap-2 font-semibold"
      >
        Submit
      </button>
    </div>
  </>
)}

    </div>
  );
};

export default AddRegistration;
