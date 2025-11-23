import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from "expo-router";

interface EmployeeFormValues {
  fullName: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  role: string;
}

const employeeSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  employeeId: Yup.string().required('Employee ID is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  department: Yup.string().required('Department is required'),
  role: Yup.string().required('Role is required'),
});

const EmployeeForm = () => {
    const router = useRouter();

    const handleSubmitForm = (values, { resetForm }) => {
    console.log("Employee form submitted:", values);
    alert("Employee information submitted!");
    resetForm();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
           <View style={styles.headerRow}>
             <Ionicons name="person-circle" size={24} color="2563eb" />
                <Text style={styles.title}>Employee Information</Text>
           </View>

        <Formik<EmployeeFormValues>
      initialValues={{
        fullName: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        role: '',
      }}
      validationSchema={employeeSchema}
        onSubmit={handleSubmitForm}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter full name'
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (<Text style={styles.error}>{errors.fullName}</Text>)}

              <Text style={styles.label}>Employee ID</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. EMP123"
                onChangeText={handleChange("employeeId")}
                onBlur={handleBlur("employeeId")}
                value={values.employeeId}
              />
              {touched.employeeId && errors.employeeId && (
                <Text style={styles.error}>{errors.employeeId}</Text>
              )}

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.error}>{errors.phone}</Text>
              )}

              <Text style={styles.label}>Department</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. IT, HR"
                onChangeText={handleChange("department")}
                onBlur={handleBlur("department")}
                value={values.department}
              />
              {touched.department && errors.department && (
                <Text style={styles.error}>{errors.department}</Text>
              )}

              <Text style={styles.label}>Role</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Developer, Manager"
                onChangeText={handleChange("role")}
                onBlur={handleBlur("role")}
                value={values.role}
              />
              {touched.role && errors.role && (
                <Text style={styles.error}>{errors.role}</Text>
              )}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmit()}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.replace("/")}
                style={styles.backLinkWrapper}
              >
                <Text style={styles.backLinkText}>Go Back Home</Text>
              </TouchableOpacity>
            </>
        )}
      </Formik>
    </View>
    </ScrollView>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 4,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 2,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  backLinkWrapper: {
    marginTop: 16,
    alignItems: "center",
  },
  backLinkText: {
    color: "#2563eb",
    textDecorationLine: "underline",
  },
});