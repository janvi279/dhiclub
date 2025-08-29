import { Field } from "formik";
import CustomInput from "../../../../components/common/CustomInput";
import CustomSelect from "../../../../components/common/CustomSelect";
import { REFERRAL_TYPES, REFERRAL_STATUSES } from "./constants";
import HotnessRating from "./HotnessRating";

const ReferralDetailsForm = ({ values, setFieldValue, errors, touched, onNext, validateCurrentTab }) => (
  <>
    <Field name="referralTo" component={CustomInput} placeholder="To *" className="w-full" />
    <Field name="referralType" component={CustomSelect} className="w-full">
      <option value="">Select Referral Type</option>
      {REFERRAL_TYPES.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </Field>
    <Field name="referralStatus" component={CustomSelect} className="w-full">
      <option value="">Select Referral Status</option>
      {REFERRAL_STATUSES.map((status) => (
        <option key={status} value={status}>{status}</option>
      ))}
    </Field>
    <HotnessRating values={values} setFieldValue={setFieldValue} error={errors.hotness} touched={touched.hotness} />
    <div className="pt-6 flex justify-center">
      <button
        type="button"
        className="px-8 py-3 bg-primary-200 text-white rounded-full"
        onClick={async () => {
          const isValid = await validateCurrentTab();
          if (isValid) onNext();
        }}
      >
        Next
      </button>
    </div>
  </>
);

export default ReferralDetailsForm;
