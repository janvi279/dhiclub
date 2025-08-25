import { useState } from "react";
import { Formik, Form } from "formik";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import PersonalDetails from "./steps/PersonalDetail";
import CompanyDetails from "./steps/ComapnyDeatl";
import AddressDetails from "./steps/AddressDetail";
import { personalSchema, companySchema, addressSchema } from "./validationSchemas";

const AddMemberForm = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        dob: "",
        companyName: "",
        businessCategory: "",
        registration: "",
        establishedYear: "",
        staffCount: "",
        city: "",
        state: "",
        pincode: "",
    };

    const getValidationSchema = () => {
        if (step === 1) return personalSchema;
        if (step === 2) return companySchema;
        if (step === 3) return addressSchema;
    };

    const handleNext = async (validateForm, setTouched) => {
        const errors = await validateForm();
        if (Object.keys(errors).length === 0) {
            setStep((prev) => prev + 1);
        } else {
            setTouched(errors, true);
        }
    };

    return (
        <div className="mt-5 p-8 bg-white rounded-2xl shadow-sm">
            <h1 className="text-xl font-semibold text-primary-150 mb-6">
                Add New Member
            </h1>

            {/* Stepper */}
            <div className="flex items-center gap-3 text-md text-[#AAA9BC] mb-6">
                {["Personal Details", "Company Details", "Address"].map((label, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span
                            className={`font-semibold ${step === i + 1 ? "text-primary-200" : "text-[#AAA9BC]"
                                }`}
                        >
                            {label}
                        </span>
                        {i < 2 && <FaLongArrowAltRight />}
                    </div>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema()}
                onSubmit={(values) => {
                    console.log("Final Data:", values);
                    navigate("/dhiclub/registration");
                }}
            >
                {({ validateForm, setTouched }) => (
                    <Form>
                        {/* Render Steps */}
                        {step === 1 && <PersonalDetails />}
                        {step === 2 && <CompanyDetails />}
                        {step === 3 && <AddressDetails />}

                        {/* Buttons */}
                        <div className="flex items-center gap-4 mt-8">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep((prev) => prev - 1)}
                                    className="border border-[#6246EA] text-primary-200 px-[30px] py-[10px] rounded-full font-semibold"
                                >
                                    Back
                                </button>
                            )}

                            {step < 3 && (
                                <button
                                    type="button"
                                    onClick={() => handleNext(validateForm, setTouched)}
                                    className="bg-primary-200 text-white px-[30px] py-[10px] rounded-full font-semibold"
                                >
                                    Next
                                </button>
                            )}

                            {step === 3 && (
                                <button
                                    type="submit"
                                    className="bg-primary-200 text-white px-[30px] py-[10px] rounded-full font-semibold"
                                >
                                    Register
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddMemberForm;
