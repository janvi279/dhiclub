import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddVisitorModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState("chapter");
  const [formData, setFormData] = useState({});

  const countries = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
  ];

  const states = [
    { value: "Gujarat", label: "Gujarat" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Delhi", label: "Delhi" },
  ];

  const cities = [
    { value: "Rajkot", label: "Rajkot" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" },
    { value: "Delhi", label: "Delhi" },
  ];

  const chapters = [
    { value: "Shakti", label: "Shakti" },
    { value: "Unity", label: "Unity" },
    { value: "Growth", label: "Growth" },
  ];

  // Validation schemas
  const chapterValidationSchema = Yup.object({
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    chapter: Yup.string().required("Chapter is required"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().required("Category is required"),
  });

  const businessValidationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile")
      .required("Mobile Number is required"),
    company: Yup.string().trim().required("Company Name is required"),
    frontCard: Yup.mixed().required("Front visiting card is required"),
    backCard: Yup.mixed().required("Back visiting card is required"),
  });

  const chapterInitialValues = {
    country: "",
    state: "",
    city: "",
    chapter: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    status: "Active",
  };

  const businessInitialValues = {
    name: "",
    mobile: "",
    company: "",
    frontCard: null,
    backCard: null,
  };

  const handleChapterSubmit = (values) => {
    setFormData({ ...formData, ...values });
    setActiveTab("business");
  };

  const handleBusinessSubmit = (values) => {
    const finalData = { ...formData, ...values };
    onSave(finalData);
    setFormData({});
    setActiveTab("chapter");
    onClose();
  };

  const handlePrevious = () => {
    setActiveTab("chapter");
  };

  const handleCancel = () => {
    setFormData({});
    setActiveTab("chapter");
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={handleCancel} title="Add Visitor">
      <div className="w-full">
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === "chapter"
                ? "border-primary-200 text-primary-200"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("chapter")}
          >
            Chapter Details
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === "business"
                ? "border-primary-200 text-primary-200"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("business")}
          >
            Business Details
          </button>
        </div>

        {/* Chapter Details */}
        {activeTab === "chapter" && (
          <Formik
            initialValues={chapterInitialValues}
            validationSchema={chapterValidationSchema}
            onSubmit={handleChapterSubmit}
          >
            <Form className="flex flex-col gap-4">
              <Field
                name="country"
                component={CustomSelect}
                options={countries}
                placeholder="Select Country"
              />

              <Field
                name="state"
                component={CustomSelect}
                options={states}
                placeholder="Select State"
              />

              <Field
                name="city"
                component={CustomSelect}
                options={cities}
                placeholder="Select City"
              />

              <Field
                name="chapter"
                component={CustomSelect}
                options={chapters}
                placeholder="Select Chapter"
              />

              <Field
                type="date"
                name="date"
                component={CustomInput}
                placeholder="Select Date"
              />

              <Field
                name="category"
                component={CustomSelect}
                options={[
                  {
                    value: "Software Development",
                    label: "Software Development",
                  },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Finance", label: "Finance" },
                ]}
                placeholder="Select Category"
              />

              <div className="flex gap-8 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 border border-primary-200 rounded-full text-primary-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 bg-primary-200 text-white rounded-full"
                >
                  Next
                </button>
              </div>
            </Form>
          </Formik>
        )}

        {/* Business Details */}
        {activeTab === "business" && (
          <Formik
            initialValues={businessInitialValues}
            validationSchema={businessValidationSchema}
            onSubmit={handleBusinessSubmit}
          >
            <Form className="flex flex-col gap-4">
              <Field
                name="name"
                component={CustomInput}
                placeholder="Enter Name"
              />
              <Field
                name="mobile"
                component={CustomInput}
                placeholder="Contact Number"
              />
              <Field
                name="company"
                component={CustomInput}
                placeholder="Company Name"
              />

              {/* File Uploads stay same */}
              {/* Front Card */}
              <div className="relative">
                <Field name="frontCard">
                  {({ field, form, meta }) => (
                    <div className="border-gray-300 p-2 rounded-lg border">
                      <label className="cursor-pointer block">
                        <div className="flex items-center justify-between">
                          <span
                            className={`${
                              field.value ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {field.value
                              ? field.value.name
                              : "Upload Front Visiting Card"}
                          </span>
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            form.setFieldValue(field.name, e.target.files[0])
                          }
                        />
                      </label>
                      {meta.error && meta.touched && (
                        <div className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              {/* Back Card */}
              <div className="relative">
                <Field name="backCard">
                  {({ field, form, meta }) => (
                    <div className="border-gray-300 p-2 rounded-lg border">
                      <label className="cursor-pointer block">
                        <div className="flex items-center justify-between">
                          <span
                            className={`${
                              field.value ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {field.value
                              ? field.value.name
                              : "Upload Back Visiting Card"}
                          </span>
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            form.setFieldValue(field.name, e.target.files[0])
                          }
                        />
                      </label>
                      {meta.error && meta.touched && (
                        <div className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-primary-200 rounded-full text-primary-200"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-10 py-2 bg-primary-200 text-white rounded-full"
                >
                  Add
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </CustomModal>
  );
};

export default AddVisitorModal;
