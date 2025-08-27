import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";

const schema = Yup.object().shape({
  memberName: Yup.string().required("Member name is required"),
  chapter: Yup.string().required("Chapter is required"),
  amount: Yup.number().required("Amount is required"),
  date: Yup.string().required("Date is required"),
});

const AddEditModal = ({ isOpen, onClose, record, onSave }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={record ? "Edit TYFCB Record" : "Add TYFCB Record"}
    >
      <Formik
        initialValues={{
          memberName: record?.memberName || "",
          chapter: record?.chapter || "",
          amount: record?.amount || "",
          date: record?.date || "",
          status: record?.status || "Active",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {() => (
          <Form className="space-y-4">
            <Field
              name="memberName"
              component={CustomInput}
              label="Member Name"
              placeholder="Enter member name"
            />
            <Field
              name="chapter"
              component={CustomInput}
              label="Chapter"
              placeholder="Enter chapter name"
            />
            <Field
              name="amount"
              component={CustomInput}
              label="Amount"
              type="number"
              placeholder="Enter amount"
            />
            <Field
              name="date"
              component={CustomInput}
              label="Date"
              type="date"
              placeholder="Select date"
            />

            <div className="mt-4">
              <button
                type="submit"
               className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              >
                {record ? "Save Changes" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
