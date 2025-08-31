import { useState } from "react";

export const useRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    companyName: "",
    designation: "",
  };

  const handleSubmit = async (values) => {
    try {
      const existingData =
        JSON.parse(localStorage.getItem("registrations")) || [];
      const updatedData = [...existingData, { id: existingData.length + 1, ...values }];
      localStorage.setItem("registrations", JSON.stringify(updatedData));
      console.log("Registration saved locally:", values);
    } catch (error) {
      console.error("Failed to save registration:", error);
    }
  };

  return { initialValues, handleSubmit, currentStep, setCurrentStep };
};
