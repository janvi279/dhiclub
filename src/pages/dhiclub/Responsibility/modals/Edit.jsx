import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const EditModal = ({ isOpen, responsibility, onClose, onSave }) => {
  const roles = ["City Head", "Country Head", "Member"];
  if (!isOpen || !responsibility) return null;

  const validationSchema = Yup.object({
    memberRole: Yup.string().required("Role is required"),
    assignDate: Yup.string().required("Assign Date is required"),
  });

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Edit Responsibility">
      <Formik
        enableReinitialize
        initialValues={{
          memberRole:
            responsibility.memberRole || responsibility.MemberRole || "",
          assignDate:
            responsibility.assignDate || responsibility.AssignDate || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const updated = { ...responsibility, ...values };
          onSave(updated);
          onClose();
        }}
      >
        {() => (
          <Form className="space-y-4">
            <Field
              name="memberRole"
              component={CustomSelect}
              required
              placeholder="Select Role"
              options={roles.map((role) => ({ value: role, label: role }))}
            />

            <Field
              name="assignDate"
              label="Assign Date"
              component={CustomInput}
              type="date"
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-32 border border-primary-200 text-primary-200 font-semibold py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-32 bg-primary-200 text-white py-2 rounded-full"
              >
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default EditModal;
