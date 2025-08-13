import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PersonalDetail = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    forum: "Shakti",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data:", formData);
    navigate("/Dhiclub/members");
  };

  return (
    <div className="max-w-6xl mt-10 p-8 bg-white rounded-[20px] shadow-sm">
      {/* Heading */}
      <h1 className="text-xl font-semibold text-[#061237] mb-6">
        Add New Member
      </h1>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-10 text-md text-[#AAA9BC]">
        {["Personal Details", "Company Details", "Address"].map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={`font-semibold ${
                step === i + 1 ? "text-[#6246EA]" : "text-[#AAA9BC]"
              }`}
            >
              {label}
            </span>
            {i < 2 && <FaLongArrowAltRight />}
          </div>
        ))}
      </div>

      {/* Step 1 - Personal Details */}
      {step === 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <input
              type="text"
              placeholder="Enter First Name"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="file"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="email"
              placeholder="Enter Email ID"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter Country Code"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
             <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Document ID (UUID)"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Education"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <select className="border border-gray-300 rounded-xl px-3 py-2">
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#6246EA] text-white px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => navigate("/Dhiclub/members")}
              className="border border-[#6246EA] text-[#6246EA] px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Step 2 - Company Details */}
      {step === 2 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <input
              type="text"
              placeholder="Enter Company Name"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Buisness Category"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Company Registration"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="date"
              placeholder="Established Year"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Staff Count"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="GST Number"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
             <input
              type="number"
              placeholder="Office Number"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
             <input
              type="email"
              placeholder="Office Email"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handleBack}
              className="border border-[#6246EA] text-[#6246EA] px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#6246EA] text-white px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 3 - Address */}
      {step === 3 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            <input
              type="text"
              placeholder="Enter City"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter State"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter Pincode"
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">
           <button
              onClick={handleSubmit}
              className="bg-[#6246EA] text-white px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
           Register
            </button>
            <button
              onClick={()=>navigate("/Dhiclub/members")}
              className="border border-[#6246EA] text-[#6246EA] px-[30px] py-[10px] rounded-[40px] font-semibold"
            >
              Cancel
            </button>
           
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDetail;
