import { Field, Formik, Form } from "formik";
import CustomSelect from "../../../../components/common/CustomSelect";

const REFERRAL_TYPES = ["Inside", "Outside"];
const REFERRAL_STATUSES = ["Pending", "Converted", "Lost"];

const ReferralFilters = ({ onFilter }) => {
  const initialValues = {
    referralType: "",
    referralStatus: "",
  };

  const handleSubmit = (values) => {
    onFilter(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ resetForm }) => (
        <Form className="flex items-end gap-3">
          {/* Referral Type */}
          <div className="w-48">
            <Field
              name="referralType"
              component={CustomSelect}
              placeholder="Referral Type"
              options={REFERRAL_TYPES.map((s) => ({
                value: s,
                label: s,
              }))}
            />
          </div>

          {/* Referral Status */}
          <div className="w-48">
            <Field
              name="referralStatus"
              component={CustomSelect}
              placeholder="Referral Status"
              options={REFERRAL_STATUSES.map((s) => ({
                value: s,
                label: s,
              }))}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-200 text-white rounded-full"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onFilter({ referralType: "", referralStatus: "" });
              }}
              className="px-4 py-2 border border-gray-300 rounded-full"
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReferralFilters;
