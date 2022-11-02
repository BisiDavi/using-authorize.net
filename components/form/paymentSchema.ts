import * as yup from "yup";

export const paymentSchema = yup.object({
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("E-mail address is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
  country: yup.string().required("Country is required"),
  paymentStartDate: yup.string().required("Payment start date is required"),
});
