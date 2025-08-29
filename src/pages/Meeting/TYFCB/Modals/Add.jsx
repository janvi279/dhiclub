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
            <Field
              name="businessType"
              component={CustomSelect}
              placeholder="Business Type"
            >
              {businessTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Field>
            <Field
              name="referralType"
              component={CustomSelect}
              placeholder="Referral Type"
            >
              {referralTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Field>
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


