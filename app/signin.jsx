import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Signin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert("⚠️", "กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      const res = await fetch("http://192.168.0.190:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      console.log("Signin response:", result);

      if (res.ok && result.token) {
        await AsyncStorage.setItem("token", result.token);
        Alert.alert("✅", "เข้าสู่ระบบสำเร็จ");
        navigation.replace("index");
      } else {
        Alert.alert("❌", result.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Signin error:", error);
      Alert.alert("❌", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={styles.linkText}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signin;

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
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#3D405B",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});