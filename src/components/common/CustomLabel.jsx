// components/common/CustomLabel.js
import { isFieldRequired } from "../../utils/isFieldRequired";

const CustomLabel = ({ name, label, validationSchema }) => {
  const required = isFieldRequired(validationSchema, name);

  return (
    <label className="block text-gray-700 font-medium mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default CustomLabel;
