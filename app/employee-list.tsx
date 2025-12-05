import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

interface EmployeeRecord {
  id: string;
  fullName: string;
  employeeId: string;
  email: string;
  department: string;
  role: string;
}

const EmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadEmployees = async () => {
    try {
      const q = query(collection(db, "employees"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data: EmployeeRecord[] = snapshot.docs.map((doc) => {
        const docData = doc.data() as any;
        return {
          id: doc.id,
          fullName: docData.fullName,
          employeeId: docData.employeeId,
          email: docData.email,
          department: docData.department,
          role: docData.role,
        };
      });

      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading employees...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons name="people-outline" size={24} color="#2563eb" />
        <Text style={styles.title}>Employees</Text>
      </View>

      {employees.length === 0 ? (
        <View style={styles.center}>
          <Text>No employees found.</Text>
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.detail}>ID: {item.employeeId}</Text>
              <Text style={styles.detail}>Email: {item.email}</Text>
              <Text style={styles.detail}>Dept: {item.department}</Text>
              <Text style={styles.detail}>Role: {item.role}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.backButtonText}>← Back to Landing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  detail: {
    fontSize: 14,
    color: "#4B5563",
  },
  backButton: {
    marginTop: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#2563eb",
    fontWeight: "500",
  },
});
