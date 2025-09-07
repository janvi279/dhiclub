// Step2Modal.jsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const Step2Modal = ({ newResponsibility, setStep, onSave }) => {
  // ✅ Roles in label-value format
  const roles = [
    { label: "City Head", value: "City Head" },
    { label: "Country Head", value: "Country Head" },
    { label: "Member", value: "Member" },
  ];

  // ✅ Validation
  const validationSchema = Yup.object({
    memberRole: Yup.string().required("Role is required"),
    assignDate: Yup.string().required("Assign Date is required"),
  });

  // ✅ Initial values (fallback from step1)
  const initialValues = {
    memberRole: newResponsibility?.memberRole || "",
    assignDate: newResponsibility?.assignDate || "",
    memberName: newResponsibility?.memberName || "hgh",
    mobileNumber: newResponsibility?.mobileNumber || "1234567890",
    BusinessCategory: newResponsibility?.BusinessCategory || "IT",
    status: newResponsibility?.status || "Active",
    createdAt: newResponsibility?.createdAt || new Date().toISOString(),
  };

  // ✅ Submit
  const handleSubmit = (values, { resetForm }) => {
    const merged = { ...(newResponsibility || {}), ...values };

    if (typeof onSave === "function") {
      onSave(merged);
    }

    resetForm();
  };

  return (
    <CustomModal
      isOpen={true}
      onClose={() => setStep(1)}
      title="Assign The Role"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            {/* Role Select */}
            <Field
              name="memberRole"
              label="Role"
              required
              component={CustomSelect}
              options={roles} // ✅ pass as options
              placeholder="Select Role"
            />

            {/* Assign Date */}
            <Field
              name="assignDate"
              label="Assign Date"
              component={CustomInput}
              type="date"
              required
            />

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-2">
              <button
                type="submit"
                className="bg-primary-200 text-white px-6 py-2 rounded-full"
              >
                Assign
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-primary-200 text-primary-200 px-6 py-2 rounded-full"
              >
                Back
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default Step2Modal;
