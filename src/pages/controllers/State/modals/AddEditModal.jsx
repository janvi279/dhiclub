import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomInput from "../../../../components/common/CustomInput";

const AddEditModal = ({ isOpen, onClose, onSave, state }) => {
  const countries = ["INDIA", "USA", "UK"];
  const states = ["Gujarat", "Maharashtra", "Delhi"];

  const validationSchema = Yup.object({
    countryName: Yup.mixed().required("Country is required"),
    stateName: Yup.mixed().required("State Name is required"),
    stateCode: Yup.string().trim().required("State Code is required"),
  });

  const initialValues = state||
   {
        countryName: "",
        stateName: "",
        stateCode: "",
        status: "Active",
        createdAt: new Date().toISOString(),
      };

  const handleSubmit = (values, { resetForm }) => {

    onSave(values);
    resetForm();
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={state ? "Edit State" : "Add State"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="flex flex-col gap-4">
          {/* Country */}
          <Field
            name="countryName"
            component={CustomSelect}
            required
            placeholder="Select Country"
            options={countries.map((c) => ({ value: c, label: c }))}
          />

          {/* State */}
          <Field
            name="stateName"
            component={CustomSelect}
            required
            placeholder="Select State"
            options={states.map((s) => ({ value: s, label: s }))}
          />

          {/* State Code */}
          <Field
            name="stateCode"
            component={CustomInput}
            required
            placeholder="Enter State Code"
          />

          {/* Submit */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-40 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              {state ? "Update" : "Submit"}
            </button>
          </div>
        </Form>
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
