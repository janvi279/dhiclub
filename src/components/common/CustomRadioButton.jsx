import { ErrorMessage } from "formik";

const CustomRadioButton = ({
  field,
  form: { touched, errors },
  label,
  required,
  value,
  ...props
}) => {
  const isInvalid = touched[field.name] && errors[field.name];

  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id={`${field.name}_${value}`}
        {...field}
        {...props}
        value={value}
        checked={field.value === value}
        className="h-4 w-4 text-primary-200 border-gray-300 focus:ring-primary-200"
      />
      {label && (
        <label
          htmlFor={`${field.name}_${value}`}
          className="text-gray-700 text-sm"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {isInvalid && (
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-[#D34053] text-sm"
        />
      )}
    </div>
  );
};

export default CustomRadioButton;
