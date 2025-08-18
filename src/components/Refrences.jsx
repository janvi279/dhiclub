import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Yup Schema with correct mobile validation
const schema = yup.object().shape({
  sources: yup
    .array()
    .min(1, "Please select at least one option"),
  referenceName: yup
    .string()
    .trim()
    .required("Reference name is required"),
  referenceContact: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Reference contact is required"),
});

const References = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    // Ensure trimmed values
    const cleanData = {
      ...data,
      referenceName: data.referenceName.trim(),
      referenceContact: data.referenceContact.trim(),
    };

    console.log("Submitting", cleanData);
    toast.success("Proceeding to payment...");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <>
      <ToastContainer />
      <div className="font-sans flex justify-center items-center min-h-screen p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8 space-y-6"
        >
          {/* Header */}

          <h1 className="mb-5 w-fit bg-primary-200 text-white px-8 py-2 rounded-full hover:bg-purple-700">
            Step-5
          </h1>
          <h3 className="text-2xl font-semibold text-gray-800 mt-2">
            References
          </h3>


          {/* Source Checkboxes */}
          <div>
            <label className="font-semibold block mb-2">
              From where did you hear about dhiyodha?
            </label>
            <div className="flex flex-wrap gap-4">
              {["Social Media", "Advertisement", "References", "Others"].map(
                (option, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option}
                      {...register("sources")}
                      className="accent-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                )
              )}
            </div>
            {errors.sources && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sources.message}
              </p>
            )}
          </div>

          {/* Reference Name */}
          <div>
            <label className="font-semibold block mb-2">
              Reference Person Name:
            </label>
            <input
              type="text"
              {...register("referenceName")}
              placeholder="Enter reference name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.referenceName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.referenceName.message}
              </p>
            )}
          </div>

          {/* Reference Contact */}
          <div>
            <label className="font-semibold block mb-2">
              Reference Person Contact:
            </label>
            <input
              type="text"
              {...register("referenceContact")}
              placeholder="Enter contact number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.referenceContact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.referenceContact.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-primary-200 text-white px-10 py-2 rounded-full hover:bg-purple-800"
            >
              NEXT
            </button>
            <p className="mt-2 text-sm text-gray-600 max-w-xs mx-auto italic">
              Once you click on this NEXT, it will take you to the Payment Gateway.
              You make payment, your form will be submitted.
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default References;
