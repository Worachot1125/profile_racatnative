import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { getToken } from "./utils/auth";

const BookNew = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    price: "",
  });

  const handleCreate = async () => {
    const bookData = {
      ...form,
      year: parseInt(form.year),
      price: parseFloat(form.price),
      available: true,
    };

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("⚠️", "คุณยังไม่ได้เข้าสู่ระบบ");
        return;
      }

      const res = await fetch("http://192.168.0.190:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ แนบ token ที่นี่
        },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        Alert.alert("✅", "สร้างหนังสือเรียบร้อยแล้ว");
        router.replace("book"); // กลับไปหน้าหลัก
      } else {
        const error = await res.json();
        Alert.alert("❌", error.message || "เกิดข้อผิดพลาดในการสร้างหนังสือ");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      Alert.alert("❌", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  const fields = [
    { key: "title", label: "ชื่อหนังสือ" },
    { key: "author", label: "ผู้แต่ง" },
    { key: "genre", label: "ประเภท" },
    { key: "year", label: "ปีที่พิมพ์" },
    { key: "price", label: "ราคา" },
    { key: "description", label: "คำอธิบาย" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 สร้างหนังสือใหม่</Text>

      {fields.map(({ key, label }) => (
        <View key={key} style={styles.field}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={form[key]}
            onChangeText={(text) => setForm({ ...form, [key]: text })}
            placeholder={label}
            keyboardType={key === "year" || key === "price" ? "numeric" : "default"}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>✅ สร้างหนังสือ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookNew;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FAF8F1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3D405B",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4ECDC4",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});