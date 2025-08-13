import { useMemberList } from "../context/MemberListContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  User, Globe, IdCard, GraduationCap, Heart, Lock, CheckCircle,
  Tag, Building, ClipboardList, Calendar, Users, Receipt, Phone,
  Mail, MapPin, Hash, Map
} from 'lucide-react';

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("Date of Birth is required"),
  countryCode: yup.string().required("Country code is required"),
  mobileNo: yup.string().required("Mobile number is required"),
  uploadDocumentId: yup.string().uuid("Must be a valid UUID").required("Document ID is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Confirm your password"),
  education: yup.string().required("Education is required"),
  maritalStatus: yup.string().required("Marital status is required"),
  companyDetails: yup.object().shape({
    businessCategory: yup.string().required("Business Category is required"),
    companyName: yup.string().required("Company Name is required"),
    companyRegistration: yup.string().required("Company Registration is required"),
    establishedYear: yup.number().min(1900).max(new Date().getFullYear()).required("Established Year is required"),
    numberOfStaff: yup.string().required("Number of Staff is required"),
    gstNumber: yup.string().required("GST Number is required"),
    officeNumber: yup.string().required("Office Number is required"),
    officeEmail: yup.string().email().required("Office Email is required"),
  }),
  address: yup.object().shape({
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    pinCode: yup.string().required("Pin Code is required"),
  }),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { addMember } = useMemberList();
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

  // ✅ Single working onSubmit function
  const onSubmit = async (data) => {
    try {
  
        // ✅ Add to context
        addMember({
          teamName: data.firstName + " " + data.lastName,
          country: data.countryCode,
          state: data.address.state,
          city: data.address.city,
          joiningDate: new Date().toLocaleDateString(),
        });

        toast.success("Registration Successful!");
        setTimeout(() => navigate("/references"), 2000);
      
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
        <h2 className="text-xl font-bold col-span-full">Personal Details</h2>

                      <div className=" mb-4 flex items-center relative">

                    <User className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("firstName")} placeholder="First Name" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.firstName &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.firstName.message}</p>
                    )}
                </div>

                <div className=" mb-4 flex items-center relative">
                    <User className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("lastName")} placeholder="Last Name" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.lastName &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.lastName.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <img
                        src="/Frame.png"
                        alt="Mail Logo"
                        className="absolute left-0 px-5"
                    />
                    <input {...register("email")} placeholder="Email" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.email &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.email.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <img
                        src="/Frame.png"
                        alt="Mail Logo"
                        className="absolute left-0 px-5"
                    />

                    <input type="date" {...register("dob")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.dob &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.dob.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Globe className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("countryCode")} placeholder="Country Code" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.countryCode &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.countryCode.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Phone className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("mobileNo")} placeholder="Mobile Number" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.mobileNo &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.mobileNo.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <IdCard className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("uploadDocumentId")} placeholder="Document ID (UUID)" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.uploadDocumentId &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.uploadDocumentId.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <GraduationCap className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("education")} placeholder="Education" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.education &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.education.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Heart className="absolute left-3 top-3 text-purple-300" />

                    <select {...register("maritalStatus")} className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" >
                        <option value="">Select Marital Status</option>
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                    </select>
                    {(errors.maritalStatus &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.maritalStatus.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Lock className="absolute left-3 top-3 text-purple-300" />
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Password"
                        className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {(errors.password &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.password.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <CheckCircle className="absolute left-3 top-3 text-purple-300" />
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Confirm Password"
                        className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {(errors.confirmPassword &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-600 text-sm cursor-pointer col-span-full"
                >
                    {showPassword ? "Hide Passwords" : "Show Passwords"}
                </span>

                <h3 className="font-semibold col-span-full">Company Details</h3>
                <div className=" mb-4 flex items-center relative">
                    <Tag className="absolute left-3 top-3 text-purple-300" />

                    <input {...register("companyDetails.businessCategory")} placeholder="Business Category" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.businessCategory &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.businessCategory.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Building className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.companyName")} placeholder="Company Name" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.companyName &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.companyName.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <ClipboardList className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.companyRegistration")} placeholder="Company Registration" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.companyRegistration &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.companyRegistration.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Calendar className="absolute left-3 top-3 text-purple-300" />
                    <input type="number" {...register("companyDetails.establishedYear")} placeholder="Established Year" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.establishedYear &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.establishedYear.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Users className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.numberOfStaff")} placeholder="Staff Count" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.numberOfStaff &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.numberOfStaff.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Receipt className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.gstNumber")} placeholder="GST Number" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.gstNumber &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.gstNumber.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Phone className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.officeNumber")} placeholder="Office Number" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.officeNumber &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.officeNumber.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Mail className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("companyDetails.officeEmail")} placeholder="Office Email" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.companyDetails?.officeEmail &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.companyDetails?.officeEmail.message}</p>
                    )}
                </div>

                <h3 className="font-semibold col-span-full">Address</h3>
                <div className=" mb-4 flex items-center relative">
                    <MapPin className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("address.city")} placeholder="City" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.address?.city &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.address?.city.message}</p>
                    )}
                </div>
                <div className=" mb-4 flex items-center relative">
                    <Map className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("address.state")} placeholder="State" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.address?.state &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.address?.state.message}</p>
                    )}
                </div>

                <div className=" mb-4 flex items-center relative">
                    <Hash className="absolute left-3 top-3 text-purple-300" />
                    <input {...register("address.pinCode")} placeholder="Pin Code" className="w-full max-sm:text-sm py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    {(errors.address?.pinCode &&
                        <p className="text-red-500 text-xs mt-1 pl-2">{errors.address?.pinCode.message}</p>
                    )}
                </div>

        {/* Submit button */}
        <button
          type="submit"
          className="col-span-full max-sm:p-1 w-50 mx-auto max-sm:px-7 mb-5 bg-[#6246EA] text-white px-8 py-2 rounded-full hover:bg-purple-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
