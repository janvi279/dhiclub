import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../../components/common/CustomModal";
import CustomInput from "../../../../../components/common/CustomInput";
import CustomSelect from "../../../../../components/common/CustomSelect";

// Constants
const REFERRAL_TYPES = ["Inside", "Outside"];
const REFERRAL_STATUSES = ["Pending", "Converted", "Lost"];

const HOTNESS_LEVELS = [
  { level: 1, color: "bg-yellow-400", width: "w-16", label: "Cold" },
  { level: 2, color: "bg-orange-400", width: "w-24", label: "Warm" },
  { level: 3, color: "bg-orange-500", width: "w-32", label: "Medium" },
  { level: 4, color: "bg-red-400", width: "w-40", label: "Hot" },
  { level: 5, color: "bg-red-600", width: "w-48", label: "Very Hot" },
];

// Validation schemas
const referralSchema = Yup.object().shape({
  referralTo: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Referral To is required"),
  referralType: Yup.string()
    .oneOf(REFERRAL_TYPES, "Please select a valid referral type")
    .required("Referral Type is required"),
  referralStatus: Yup.string()
    .oneOf(REFERRAL_STATUSES, "Please select a valid referral status")
    .required("Referral Status is required"),
  hotness: Yup.number()
    .min(1, "Please select hotness level")
    .max(5, "Invalid hotness level")
    .required("Please rate referral hotness"),
});

const contactSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .trim()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile Number is required"),
  emailId: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const validationSchema = Yup.object().shape({
  ...referralSchema.fields,
  ...contactSchema.fields,
});

const AddReferralModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("referral");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    referralTo: "",
    referralType: "",
    referralStatus: "",
    hotness: 0,
    mobileNumber: "",
    emailId: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      await onSave(values);
      onClose();
    } catch (error) {
      console.error("Error saving referral:", error);
      // Handle error appropriately - show toast/notification
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const validateCurrentTab = async (values, validateForm, setTouched) => {
    const errors = await validateForm(values);

    if (activeTab === "referral") {
      const referralFields = [
        "referralTo",
        "referralType",
        "referralStatus",
        "hotness",
      ];
      const referralErrors = Object.keys(errors).filter((key) =>
        referralFields.includes(key)
      );

      if (referralErrors.length > 0) {
        const touchedFields = {};
        referralFields.forEach((field) => {
          touchedFields[field] = true;
        });
        setTouched(touchedFields);
        return false;
      }
      return true;
    }

    return Object.keys(errors).length === 0;
  };

  const HotnessRating = ({ values, setFieldValue }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-primary-200">
        How hot is this referral? *
      </label>
      <div className="space-y-2">
        {HOTNESS_LEVELS.map(({ level, color, width, label }) => {
          const isSelected = values.hotness === level;

          return (
            <div key={level} className="flex items-center space-x-3">
              {/* Checkbox */}
              <div
                className={`
                  w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center
                  transition-colors
                  ${
                    isSelected
                      ? "border-primary-200 bg-primary-200"
                      : "border-gray-300 bg-white hover:border-primary-200"
                  }
                `}
                onClick={() => setFieldValue("hotness", isSelected ? 0 : level)}
                aria-label={`Select hotness level ${level} - ${label}`}
              >
                {isSelected && (
                  <svg
                    className="w-2 h-2 text-white fill-current"
                    viewBox="0 0 8 8"
                    aria-hidden="true"
                  >
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
                  </svg>
                )}
              </div>

              {/* Temperature bar */}
              <div
                className={`
                  ${width} h-4 rounded ${color} cursor-pointer transition-all
                  hover:opacity-80
                `}
                onClick={() => setFieldValue("hotness", level)}
                aria-label={`Hotness level ${level} - ${label}`}
              />

              {/* Level indicator */}
              <span className="text-xs text-gray-500 min-w-[60px]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab("referral");
    }
  }, [isOpen]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Referral"
      className="max-w-md"
    >
      {/* Tab Navigation */}
      <div className="flex mb-6 mt-5 border-b border-gray-200">
        <button
          type="button"
          className={`
            flex-1 pb-3 text-sm font-medium text-center transition-colors
            ${
              activeTab === "referral"
                ? "text-primary-200 border-b-2 border-primary-200"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
          onClick={() => setActiveTab("referral")}
        >
          Referral Details
        </button>
        <button
          type="button"
          className={`
            flex-1 pb-3 text-sm font-medium text-center transition-colors
            ${
              activeTab === "contact"
                ? "text-primary-200 border-b-2 border-primary-200"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
          onClick={() => setActiveTab("contact")}
        >
          Contact Details
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({
          values,
          setFieldValue,
          validateForm,
          setTouched,
          errors,
          touched,
        }) => (
          <Form className="space-y-5">
            {activeTab === "referral" && (
              <>
                {/* Referral To Field */}
                <Field
                  name="referralTo"
                  component={CustomInput}
                  placeholder="To *"
                  className="w-full"
                />

                {/* Referral Type Dropdown */}
                <Field
                  name="referralType"
                  component={CustomSelect}
                  placeholder="Select Referral Type *"
                  options={REFERRAL_TYPES.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                />

                {/* Referral Status Dropdown */}
                <Field
                  name="referralStatus"
                  component={CustomSelect}
                  placeholder="Select Referral Status *"
                  options={REFERRAL_STATUSES.map((status) => ({
                    value: status,
                    label: status,
                  }))}
                />

                {/* Hotness Rating */}
                <HotnessRating values={values} setFieldValue={setFieldValue} />

                {/* Show hotness error */}
                {errors.hotness && touched.hotness && (
                  <div className="text-sm text-red-600">{errors.hotness}</div>
                )}

                {/* Next Button */}
                <div className="pt-6 flex justify-center">
                  <button
                    type="button"
                    className="
                      px-8 py-3 bg-primary-200 text-white rounded-full
                       transition-colors cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    onClick={async () => {
                      const isValid = await validateCurrentTab(
                        values,
                        validateForm,
                        setTouched
                      );
                      if (isValid) {
                        setActiveTab("contact");
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {activeTab === "contact" && (
              <>
                {/* Mobile Number Field */}
                <Field
                  name="mobileNumber"
                  component={CustomInput}
                  placeholder="Mobile Number *"
                  type="tel"
                  className="w-full"
                />

                {/* Email Field */}
                <Field
                  name="emailId"
                  component={CustomInput}
                  placeholder="Email Address *"
                  type="email"
                  className="w-full"
                />

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("referral")}
                    className="
                      flex-1 py-3 text-primary-200 border border-primary-200 rounded-full
                      hover:bg-primary-50 transition-colors
                      focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2
                    "
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      flex-1 py-3 bg-primary-200 text-white rounded-full cursor-pointer
                       transition-colors
                      focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddReferralModal;

// import { useState } from "react";
// import { Formik, Form } from "formik";
// import CustomModal from "../../../../../components/common/CustomModal";
// import ReferralDetailsForm from "./ReferralDetailsForm";
// import ContactDetailsForm from "./ContactDetailsForm";
// import { validationSchema } from "./validation";

// const AddReferralModal = ({ isOpen, onClose, onSave }) => {
//   const [activeTab, setActiveTab] = useState("referral");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const initialValues = {
//     referralTo: "",
//     referralType: "",
//     referralStatus: "",
//     hotness: 0,
//     mobileNumber: "",
//     emailId: "",
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       setIsSubmitting(true);
//       await onSave(values);
//       onClose();
//     } finally {
//       setIsSubmitting(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <CustomModal isOpen={isOpen} onClose={onClose} title="Add Referral" className="max-w-md">
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>

//         {({ values, setFieldValue, validateForm, setTouched, errors, touched }) => {
//           const validateCurrentTab = async () => {
//             const errs = await validateForm(values);
//             const referralFields = ["referralTo", "referralType", "referralStatus", "hotness"];
//             const tabErrors = Object.keys(errs).filter((key) => referralFields.includes(key));
//             if (activeTab === "referral" && tabErrors.length) {
//               const touchedFields = {};
//               referralFields.forEach((f) => (touchedFields[f] = true));
//               setTouched(touchedFields);
//               return false;
//             }
//             return Object.keys(errs).length === 0;
//           };

//           return (
//             <Form className="space-y-5">
//               {activeTab === "referral" ? (
//                 <ReferralDetailsForm
//                   values={values}
//                   setFieldValue={setFieldValue}
//                   errors={errors}
//                   touched={touched}
//                   onNext={() => setActiveTab("contact")}
//                   validateCurrentTab={validateCurrentTab}
//                 />
//               ) : (
//                 <ContactDetailsForm onBack={() => setActiveTab("referral")} isSubmitting={isSubmitting} />
//               )}
//             </Form>
//           );
//         }}
//       </Formik>
//     </CustomModal>
//   );
// };

// export default AddReferralModal;
