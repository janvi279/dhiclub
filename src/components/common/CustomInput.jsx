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
    <div className='w-full'>
  
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        invalid={isInvalid ? 'true' : 'false'}
       className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full"
      />
      <ErrorMessage
        name={field.name}
        component='div'
        className='text-[#D34053] text-sm sm:text-base'
      />
    </div>
  )
}

export default CustomInput
