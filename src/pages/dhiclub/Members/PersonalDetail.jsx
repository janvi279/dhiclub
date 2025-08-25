import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CompanyDetails from "../Registration/AddMember/steps/ComapnyDeatl";
import AddressDetails from "../Registration/AddMember/steps/AddressDetail";

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
    <div className="mt-8">
      {/* Heading */}

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
          className="bg-primary-200 text-white px-[30px] py-[10px] rounded-full font-semibold"
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => navigate("/Dhiclub/members")}
          className="border border-[#6246EA] text-primary-200 px-[30px] py-[10px] rounded-full font-semibold"
        >
          Cancel
        </button>
      </div>
    {step === 2 && <CompanyDetails />}
                        {step === 3 && <AddressDetails />}



    </div>
  );
};

export default PersonalDetail;
