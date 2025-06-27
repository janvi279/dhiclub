import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterUser } from "../api/Auth";
import {
  Tag, Building, ClipboardList, Calendar, Users,
  Receipt, Phone, Mail,
} from "lucide-react";

// Validation Schema
const schema = yup.object().shape({
  companyDetails: yup.object().shape({
    businessCategory: yup.string().required("Business category is required"),
    companyName: yup.string().required("Company name is required"),
    companyRegistration: yup.string().required("Company registration is required"),
    establishedYear: yup
      .number()
      .typeError("Enter a valid year")
      .min(1900, "Too old")
      .max(new Date().getFullYear(), "Future year not allowed")
      .required("Established year is required"),
    numberOfStaff: yup.string().required("Number of staff is required"),
    gstNumber: yup.string().required("GST number is required"),
    officeNumber: yup.string().required("Office number is required"),
    officeEmail: yup.string().email("Invalid email").required("Office email is required"),
  }),
});

const BusinessDetail = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      companyDetails: {
        businessCategory: "",
        companyName: "",
        companyRegistration: "",
        establishedYear: "",
        numberOfStaff: "",
        gstNumber: "",
        officeNumber: "",
        officeEmail: "",
      },
    },
  });

  useEffect(() => {
    console.log("Validation Errors", errors);
  }, [errors]);

  const onSubmit = async (data) => {
    navigate("/refrences")
    console.log("Submitting", data);
    try {
      const response = await RegisterUser(data);
      if (response.data) {
        toast.success("Registration Successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md w-full max-w-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <h1 className="text-xl text-center font-bold col-span-full w-50 mb-5 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700">
          Step-4
        </h1>
        <h3 className="font-semibold col-span-full">Company Details</h3>

        {/* Repeatable input component pattern */}
        {[
          { icon: <Tag />, name: "businessCategory", placeholder: "Business Category" },
          { icon: <Building />, name: "companyName", placeholder: "Company Name" },
          { icon: <ClipboardList />, name: "companyRegistration", placeholder: "Company Registration" },
          { icon: <Calendar />, name: "establishedYear", placeholder: "Established Year", type: "number" },
          { icon: <Users />, name: "numberOfStaff", placeholder: "Staff Count" },
          { icon: <Receipt />, name: "gstNumber", placeholder: "GST Number" },
          { icon: <Phone />, name: "officeNumber", placeholder: "Office Number" },
          { icon: <Mail />, name: "officeEmail", placeholder: "Office Email" },
        ].map((field, i) => (
          <div key={i} className="mb-4 flex items-center relative">
            <div className="absolute left-3 top-3 text-purple-300">{field.icon}</div>
            <input
              type={field.type || "text"}
              {...register(`companyDetails.${field.name}`)}
              placeholder={field.placeholder}
              className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.companyDetails?.[field.name] && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.companyDetails[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="col-span-full w-fit mx-auto mt-4 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default BusinessDetail;
