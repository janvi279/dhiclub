import * as Yup from "yup";

export const personalSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile")
    .required("Mobile number is required"),
  password: Yup.string().min(6, "Min 6 chars required").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password required"),
  dob: Yup.date().required("DOB is required"),
});

export const companySchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  businessCategory: Yup.string().required("Business category required"),
  registration: Yup.string().required("Registration number required"),
  establishedYear: Yup.date().required("Established year is required"),
  staffCount: Yup.number().required("Staff count required"),
});

export const addressSchema = Yup.object({
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().matches(/^[0-9]{6}$/, "Enter valid pincode").required("Pincode required"),
});
