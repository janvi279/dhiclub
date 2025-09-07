import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../../components/common/CustomModal";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";
import CustomTextarea from "../../../../components/common/CustomTextarea";

// ✅ Dropdown options
const referralTypes = ["Direct", "Indirect"];
const businessTypes = ["Service", "Product", "Other"];

const schema = Yup.object().shape({
  thankyouto: Yup.string().required("Thank You To is required"),
  referralAmount: Yup.number().required("Amount is required"),
  businessType: Yup.string().required("Business Type is required"),
  referralType: Yup.string().required("Referral Type is required"),
  comment: Yup.string().required("Comment is required"),
});

const AddEditModal = ({ isOpen, onClose, record, onSave }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={record ? "Edit TYFCB" : "Add TYFCB"}
    >
      <Formik
        initialValues={{
          memberName:record?.memberName||"john",
          date:record?.date||"2025-08-01",
          thankyouto: record?.thankyouto || "",
          referralAmount: record?.referralAmount || "",
          businessType: record?.businessType || "",
          referralType: record?.referralType || "",
          comment: record?.comment || "",
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
              name="thankyouto"
              component={CustomInput}
              placeholder="Thank You To"
            />
            <Field
              name="referralAmount"
              component={CustomInput}
              type="number"
              placeholder="Enter Amount"
            />

            {/* Business Type CustomSelect */}
            <Field
              name="businessType"
              component={CustomSelect}
              required
              placeholder="Select Business Type"
              options={businessTypes.map((b) => ({ value: b, label: b }))}
            />

            {/* Referral Type CustomSelect */}
            <Field
              name="referralType"
              component={CustomSelect}
              required
              placeholder="Select Referral Type"
              options={referralTypes.map((r) => ({ value: r, label: r }))}
            />

            <Field
              name="comment"
              component={CustomTextarea}
              placeholder="Comment :"
              rows={3}
            />

            {/* Buttons row */}
            <div className="gap-4 mt-6">
              <button
                type="submit"
                className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              >
                {record ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddEditModal;
