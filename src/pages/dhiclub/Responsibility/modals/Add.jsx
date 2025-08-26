import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const AddResponsibilityModal = ({ isOpen, onClose, onSave }) => {
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Responsibility Name is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    name: "",
    status: "Active",
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Add Responsibility">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {() => (
          <Form className="space-y-4">
            <Field
              name="name"
              label="Responsibility Name"
              component={CustomInput}
            />

            <Field
              name="status"
              label="Status"
              options={statusOptions}
              component={CustomSelect}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddResponsibilityModal;
