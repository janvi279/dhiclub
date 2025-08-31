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



// import { ErrorMessage } from "formik";

// const CustomSelect = ({
//   field,
//   form: { touched, errors },
//   label,
//   required,
//   options = [],
//   placeholder,
//   ...props
// }) => {
//   const isInvalid = touched[field.name] && errors[field.name];

//   return (
//     <div className="w-full flex flex-col gap-1">
//       {label && (
//         <label className="text-sm font-medium text-gray-700">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//       )}

//       <select
//         {...field}
//         {...props}
//         className={`focus:outline-none border rounded-lg px-3 py-2 w-full
//           ${isInvalid ? "border-red-500" : "border-gray-300"} 
//         `}
//       >
//         {placeholder && <option value="">{placeholder}</option>}
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>

//       <ErrorMessage
//         name={field.name}
//         component="div"
//         className="text-red-500 text-sm sm:text-base mt-1"
//       />
//     </div>
//   );
// };

// export default CustomSelect;
