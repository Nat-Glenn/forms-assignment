import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  jobTitle: Yup.string().required("Job title is required"),
});

const EmployeeForm = () => {
  const router = useRouter();

  const handleSubmitForm = (values: any) => {
    console.log("Employee Form Submitted:", values);
    alert("Employee information saved!");
    router.replace("/dashboard");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Employee Information Form</Text>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          jobTitle: "",
        }}
        validationSchema={EmployeeSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            {/* First Name */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            {/* Last Name */}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
