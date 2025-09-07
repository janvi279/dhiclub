import { ErrorMessage } from 'formik'

const CustomInput = ({
  field,
  form: { touched, errors },
  label,
  required,
  placeholder,
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name]

  return (
    <div className="w-full">
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={`focus:outline-none rounded-lg px-3 py-2 w-full 
          ${isInvalid ? 'border border-red-500' : 'border border-gray-300'}
         
        `}
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-[#D34053] text-sm sm:text-base mt-1"
      />
    </div>
  )
}

export default CustomInput
