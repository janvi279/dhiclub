import { ErrorMessage } from "formik";

const CustomSelect = ({
  field,
  form: { touched, errors },
  label,
  required,
  children,
  placeholder,
  ...props
}) => {
  const isInvalid = touched[field.name] && errors[field.name];

  return (
    <div className="w-full flex flex-col gap-1">
      
      <select
        {...field}
        {...props}
        className={`focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full
          ${isInvalid ? "border-red-500" : "border-gray-300"} 
        `}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm sm:text-base mt-1"
      />
    </div>
  );
};

export default CustomSelect;
