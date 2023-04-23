import { useRef } from "react";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import emailjs from "@emailjs/browser";
import FormModal from "../FormModal/FormModal";

import { Field, Form, Formik } from "formik";
import { basicSchema } from "../schema";

export default function SignUp() {
  const formRef = useRef();

  const handleSubmit = (values) => {
    console.log(formRef.current);

    emailjs
      .sendForm(
        "default_service",
        "template_yio0uoq",
        formRef.current,
        "vl3h46kzDVeNgrXe5",
        {
          name: values.name,
          message: values.message,
          number: values.number,
          email: values.email,
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const initialValues = {
    name: "",
    email: "",
    number: "",
    message: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={basicSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }, 400);
      }}
    >
      {({ errors, touched }) => (
        <Form ref={formRef}>
          <Container component="main" maxWidth="xs">
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="standard"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="number"
                  label="Number"
                  variant="standard"
                  fullWidth
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="message"
                  label="Message"
                  variant="standard"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Field as={Checkbox} name="subscribe" color="primary" />
                  }
                  label="I want to receive information and updates of future trips via email."
                />
              </Grid>
            </Grid>
            <FormModal error={errors}/>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
