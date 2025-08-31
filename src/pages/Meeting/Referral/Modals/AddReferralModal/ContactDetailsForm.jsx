import { Field } from "formik";
import CustomInput from "../../../../components/common/CustomInput";

const ContactDetailsForm = ({ onBack, isSubmitting }) => (
  <>
    <Field name="mobileNumber" component={CustomInput} placeholder="Mobile Number *" type="tel" className="w-full" />
    <Field name="emailId" component={CustomInput} placeholder="Email Address *" type="email" className="w-full" />
    <div className="flex justify-between pt-6 space-x-4">
      <button type="button" onClick={onBack} className="flex-1 py-3 text-primary-200 border border-primary-200 rounded-full">
        Back
      </button>
      <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-primary-200 text-white rounded-full">
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </div>
  </>
);

export default ContactDetailsForm;
