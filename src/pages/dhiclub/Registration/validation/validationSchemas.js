import * as Yup from "yup";

export const step1Schema = Yup.object({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  businessDomain: Yup.string().required("Business Domain is required"),
  forum: Yup.string().required("Forum selection is required"),
});

export const step2Schema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .required("Mobile number is required"),
  otp: Yup.array()
    .of(Yup.string().length(1, "1 digit only"))
    .test("otpFilled", "OTP must be 6 digits", (arr) =>
      arr.every((digit) => digit !== "")
    ),
});
