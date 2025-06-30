import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




// Validation schema
const schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  businessDomain: yup.string().required("Business Domain is required"),
  forum: yup.string().required("Forum is required"),
});

const AddMember = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    console.log("Validation Errors", errors);
  }, [errors]);

  const countries = ["India", "USA", "Canada"];
  const cities = ["Rajkot", "Mumbai", "Los Angeles"];
  const states = ["Gujarat", "Maharashtra", "California"];
  const businessDomains = [
    "Information Technology",
    "Health Care",
    "Beauty",
    "Manufacturing",
  ];
  const forums = [
    { name: "Shakti", vacancy: 2 },
    { name: "Laxmi", vacancy: 5 },
  ];

  const onSubmit = async (data) => {
    console.log("Submitting", data);

    toast.success("Submitted successfully!");
    setTimeout(() => navigate("/verification"), 1000);
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8"
      >
        <h2 className="text-xl font-bold col-span-full mb-6">Add New Member</h2>

        {/* Step Title */}
        <button
          type="button"
          className="mb-5 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700"
        >
          Step-1
        </button>

        {/* Country */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Country:</label>
          <select
            {...register("country")}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
          )}
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">State:</label>
          <select
            {...register("state")}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">City:</label>
          <select
            {...register("city")}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Business Domain */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Business Domain:</label>
          <select
            {...register("businessDomain")}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          >
            <option value="">Select Business Domain</option>
            {businessDomains.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.businessDomain && (
            <p className="text-red-500 text-xs mt-1">{errors.businessDomain.message}</p>
          )}
        </div>

        {/* Forum */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Select Forum:</label>
          <div className="grid grid-cols-2 gap-2">
            {forums.map((f) => (
              <label
                key={f.name}
                className="border border-gray-300 rounded-md p-2 flex justify-between items-center"
              >
                <input
                  type="radio"
                  value={f.name}
                  {...register("forum")}
                  className="mr-2"
                />
                <span>{f.name}</span>
                <span className="text-red-500">{f.vacancy}</span>
              </label>
            ))}
          </div>
          {errors.forum && (
            <p className="text-red-500 text-xs mt-1">{errors.forum.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default AddMember;
