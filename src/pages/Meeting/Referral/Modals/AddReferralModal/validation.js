import * as Yup from "yup";
import { REFERRAL_TYPES, REFERRAL_STATUSES } from "./constants";

export const referralSchema = Yup.object().shape({
  referralTo: Yup.string().trim().min(2, "Name must be at least 2 characters").required("Referral To is required"),
  referralType: Yup.string().oneOf(REFERRAL_TYPES).required("Referral Type is required"),
  referralStatus: Yup.string().oneOf(REFERRAL_STATUSES).required("Referral Status is required"),
  hotness: Yup.number().min(1, "Please select hotness level").max(5).required("Please rate referral hotness"),
});

export const contactSchema = Yup.object().shape({
  mobileNumber: Yup.string().trim().matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number").required("Mobile Number is required"),
  emailId: Yup.string().trim().email("Please enter a valid email address").required("Email is required"),
});

export const validationSchema = Yup.object().shape({
  ...referralSchema.fields,
  ...contactSchema.fields,
});
