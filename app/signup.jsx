import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Signup = () => {
  const navigation = useNavigation();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("⚠️", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.190:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();
      console.log("Signup response:", result);

      if (res.ok) {
        Alert.alert("✅", result.message || "สมัครสมาชิกสำเร็จ");
        navigation.replace("signin"); // ไปหน้า signin ถ้ามี
      } else {
        Alert.alert("❌", result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("❌", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สมัครสมาชิก</Text>

      <View style={styles.field}>
        <Text style={styles.label}>ชื่อ-นามสกุล</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setName}
          placeholder="ชื่อ-นามสกุล"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>อีเมล</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="อีเมล"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="รหัสผ่าน"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>สมัครสมาชิก</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#3D405B",
  },
  field: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#A0C4FF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});