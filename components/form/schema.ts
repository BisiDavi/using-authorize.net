import * as yup from "yup";

export const paymentSchema = yup.object({
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("E-mail address is required"),
  firstName: yup.string().min(6).required("Password is required"),
  lastName: yup.string().min(6).required("Password is required"),
  address: yup.string().min(6).required("Password is required"),
  city: yup.string().min(6).required("Password is required"),
  state: yup.string().min(6).required("Password is required"),
  zip: yup.string().min(6).required("Password is required"),
  country: yup.string().min(6).required("Password is required"),
  paymentStartDate: yup.string().min(6).required("Password is required"),
});
