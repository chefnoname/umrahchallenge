import * as yup from "yup";

export const basicSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email("Please enter a valid email").required("Required"),
  number: yup.number().min(1000000000, 'Must be a valid phone number').required("Required"),
  message: yup.string().min(50, "Please add more detail").required("Required"),
});
