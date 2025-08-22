import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";

const EditBusinessTypeModal = ({ isOpen, onClose, onSave, businessType }) => {
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Business Type Name is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSave(values);
    resetForm();
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Business Type">
      <Formik initialValues={businessType} enableReinitialize validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-4">
          <Field
            name="name"
            component={CustomInput}
            required
            placeholder="Enter Business Type"
          />

          <div className="mt-4">
            <button type="submit" className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full">
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </CustomModal>
  );
};

export default EditBusinessTypeModal;
