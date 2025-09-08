import Select from "react-select";
import { ErrorMessage } from "formik";

const CustomSelect = ({
  field,
  form: { setFieldValue, touched, errors },
  label,
  required,
  placeholder,
  options,
  ...props
}) => {
  const isInvalid = touched[field.name] && errors[field.name];

  // ✅ custom styles for react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E8F5FA" : "white", // light purple on hover
      color: state.isFocused ? "#44C5FF" : "", // light purple on hover
      cursor: "pointer",
    }),
    control: (provided) => ({
      ...provided,
      borderColor: isInvalid ? "red" : "#d1d5db",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: isInvalid ? "red" : "none",
      },
    }),
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        id={field.name}
        name={field.name}
        options={options}
        placeholder={placeholder}
        value={options.find((opt) => opt.value === field.value) || null}
        onChange={(option) => setFieldValue(field.name, option.value)}
        classNamePrefix="react-select"
        styles={customStyles}
        isSearchable={false}
        {...props}
      />

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm sm:text-base mt-1"
      />
    </div>
  );
};

export default CustomSelect;
