import { Field } from "formik";
import CustomInput from "../../../../components/common/CustomInput";

const Step2 = ({ values, setFieldValue, otpRefs, handleOtpChange, setStep }) => {
  return (
    <>
      <div className="max-w-xl flex items-end gap-3">
        <div className="flex-1">
          <label className="block mb-2 text-primary-150 font-semibold">
            Mobile Number
          </label>
          <Field
            name="mobileNumber"
            component={CustomInput}
            type="text"
            placeholder="Enter Mobile Number"
          />
        </div>

        <div>
          <button
            type="button"
            className="bg-[#EDEBFF] text-primary-200 px-4 py-2 rounded-xl font-semibold"
          >
            Send OTP
          </button>
        </div>
      </div>

      <div className="mb-3 mt-8 max-w-xs">
        <label className="block mb-2 text-primary-150 font-semibold">
          Enter OTP
        </label>
        <div className="flex gap-2">
          {values.otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (otpRefs.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, idx, setFieldValue)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="border border-[#44C5FF] px-8 py-2 rounded-full text-primary-200 font-semibold"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-primary-200 text-white px-8 py-2 rounded-full font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Step2;
