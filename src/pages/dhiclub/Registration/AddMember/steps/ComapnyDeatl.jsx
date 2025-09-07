import { Field } from "formik";
import CustomInput from "../../../../../components/common/CustomInput";

const CompanyDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-5 max-w-5xl">
      <Field
        name="companyName"
        placeholder="Enter Company Name"
        component={CustomInput}
        label="Company Name"
      />

      <Field
        name="businessCategory"
        placeholder="Business Category"
        component={CustomInput}
        label="Business Category"
      />

      <Field
        name="registration"
        type="date"
        placeholder="Company Registration"
        component={CustomInput}
        label="Company Registration"
      />

      <Field
        type="date"
        name="establishedYear"
        component={CustomInput}
        label="Established Year"
      />

      <Field
        type="number"
        name="staffCount"
        placeholder="Staff Count"
        component={CustomInput}
        label="Staff Count"
      />
    </div>
  );
};

export default CompanyDetails;
