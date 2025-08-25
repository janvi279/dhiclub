import { Field } from "formik";
import CustomInput from "../../../../../components/common/CustomInput";

const PersonalDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-5 max-w-5xl">
      <Field name="firstName" placeholder="Enter First Name" component={CustomInput} />
      <Field name="lastName" placeholder="Enter Last Name" component={CustomInput} />
      <Field type="email" name="email" placeholder="Enter Email" component={CustomInput} />
      <Field name="mobile" placeholder="Enter Mobile Number" component={CustomInput} />
      <Field type="password" name="password" placeholder="Password" component={CustomInput} />
      <Field type="password" name="confirmPassword" placeholder="Confirm Password" component={CustomInput} />
      <Field type="date" name="dob" placeholder="Date of Birth" component={CustomInput} />
    </div>
  );
};

export default PersonalDetails;
