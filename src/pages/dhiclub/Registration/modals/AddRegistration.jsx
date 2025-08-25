import { useState, useRef } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import { useRegistration } from "../hooks/useRegistration";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { step1Schema, step2Schema } from "../validation/validationSchemas";

const AddRegistration = () => {
  const [step, setStep] = useState(1);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const { handleSubmit } = useRegistration();

  const countries = ["India", "USA", "Canada"];
  const states = ["Gujarat", "Maharashtra", "Delhi"];
  const cities = ["Ahmedabad", "Mumbai", "Delhi"];
  const businessDomains = ["IT", "Finance", "Healthcare"];

  const initialValues = {
    country: "",
    state: "",
    city: "",
    businessDomain: "",
    forum: "Shakti",
    mobileNumber: "",
    otp: ["", "", "", "", "", ""],
  };

  const handleOtpChange = (e, idx, setFieldValue) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      setFieldValue(`otp[${idx}]`, value);
      if (value && idx < 5) {
        otpRefs.current[idx + 1].focus();
      }
    }
  };

  const handleFinalSubmit = (values) => {
    handleSubmit(values);
    navigate("/Dhiclub/registration/AddMember/personalDetail");
  };

  return (
    <div className="mt-5 p-8 mx-auto text-primary-150 ">
      <h1 className="text-xl font-semibold text-primary-150 mb-6">
        Registration
      </h1>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-5 text-md text-[#AAA9BC]">
        <span className={`font-semibold ${step === 1 ? "text-primary-200" : "text-[#AAA9BC]"}`}>
          Step 1
        </span>
        <FaLongArrowAltRight />
        <span className={`font-semibold ${step === 2 ? "text-primary-200" : "text-[#AAA9BC]"}`}>
          Step 2
        </span>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? step1Schema : step2Schema}
        onSubmit={(values) => {
          if (step === 1) {
            setStep(2);
          } else {
            handleFinalSubmit(values);
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <Step1
                countries={countries}
                states={states}
                cities={cities}
                businessDomains={businessDomains}
                navigate={navigate}
              />
            )}
            {step === 2 && (
              <Step2
                values={values}
                setFieldValue={setFieldValue}
                otpRefs={otpRefs}
                handleOtpChange={handleOtpChange}
                setStep={setStep}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRegistration;
