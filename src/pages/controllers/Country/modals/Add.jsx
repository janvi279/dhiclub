import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddCountryModal = ({ isOpen, onClose, onSave }) => {
  const currency = ["INR", "USD", "CAD", "EUR"];

  const validationSchema = Yup.object({
    countryName: Yup.string().trim().required("Country Name is required"),
    countryCode: Yup.string().trim().required("Country Code is required"),
    currency: Yup.string().trim().required("Country Currency is required"),
  });

  const initialValues = {
    countryName: "",
    countryCode: "",
    currency: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  const handleSubmit = (values, { resetForm }) => {
    onSave(values);
    resetForm();
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Add Country">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          {/* Country Name */}
          <Field
            name="countryName"
            component={CustomInput}
            required
            placeholder="Enter Country Name"
          />

          {/* Country Code */}
          <Field
            name="countryCode"
            component={CustomInput}
            required
            placeholder="Enter Country Code"
          />
          <Field
            name="currency"
            component={CustomSelect}
            placeholder="Select Currency"
            options={currency.map((s) => ({
              value: s,
              label: s,
            }))}
          />

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </CustomModal>
  );
};

export default AddCountryModal;
