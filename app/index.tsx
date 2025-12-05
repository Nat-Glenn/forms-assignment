import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LandingPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to our App</Text>

      <TouchableOpacity
        onPress={() => router.push("/sign-in")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/sign-up")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/employee-form")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Employee Form</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/employee-list")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>View Employees</Text>
      </TouchableOpacity>
    </View>
  );
}
export default LandingPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})