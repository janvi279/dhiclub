import { useState } from "react";

const defaultInitialValues = {
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

export const useRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState(defaultInitialValues);

  const handleSubmit = async (values) => {
    try {
      const existingData =
        JSON.parse(localStorage.getItem("registrations")) || [];

      const newEntry = {
        id: Date.now(), // safer unique ID
        ...values,
      };

      const updatedData = [...existingData, newEntry];
      localStorage.setItem("registrations", JSON.stringify(updatedData));

      console.log("Registration saved locally:", newEntry);

      // reset form after successful save
      setFormValues(defaultInitialValues);
      setCurrentStep(0);
    } catch (error) {
      console.error("Failed to save registration:", error);
    }
  };

  return {
    formValues,
    setFormValues,
    initialValues: defaultInitialValues,
    handleSubmit,
    currentStep,
    setCurrentStep,
  };
};
