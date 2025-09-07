import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const countries = ["India", "USA", "UK"];
const states = ["Gujarat", "Maharashtra", "Delhi"];
const cities = ["Ahmedabad", "Surat", "Mumbai"];

const validationSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string().required("Pincode is required"),
  teamName: Yup.string().required("Team Name is required"),
  launchDate: Yup.string().required("Launch Date is required"),
});

const AddEditModal = ({ isOpen, onClose, onSave, editData }) => {
  const initialValues = editData || {
    country: "",
    state: "",
    city: "",
    pincode: "",
    teamName: "",
    launchDate: "",
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
      title={editData ? "Edit Team" : "Add Team"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="flex flex-col gap-4">
            {/* Country */}
            <Field
              name="country"
              component={CustomSelect}
              options={countries.map((c) => ({ value: c, label: c }))}
              placeholder="Select Country"
            />

            {/* State */}
            <Field
              name="state"
              component={CustomSelect}
              options={states.map((s) => ({ value: s, label: s }))}
              placeholder="Select State"
            />

            {/* City */}
            <Field
              name="city"
              component={CustomSelect}
              options={cities.map((c) => ({ value: c, label: c }))}
              placeholder="Select City"
            />

            {/* Team Name */}
            <Field
              name="teamName"
              component={CustomInput}
              placeholder="Team Name"
            />
  <Field
              name="captainName"
              component={CustomInput}
              placeholder="Captain Name"
            />
            <Field
              name="members"
              type="number"
              component={CustomInput}
              placeholder="No Of Members"
            />
            {/* Pincode */}
            <Field
              name="pincode"
              component={CustomInput}
              placeholder="Pincode"
            />

            {/* Launch Date */}
            <Field
              name="launchDate"
              type="date"
              component={CustomInput}
              placeholder="Launch Date"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              {editData ? "Update" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
