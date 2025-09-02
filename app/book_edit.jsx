import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { getToken } from "./utils/auth";

export default function BookEdit() {
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert("⚠️", "กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูล");
          router.replace("/signin");
          return;
        }

        const res = await fetch(`http://192.168.0.190:3000/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const book = data.book;
        setForm({
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year.toString(),
          price: book.price.toString(),
          description: book.description,
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        Alert.alert("❌", "ไม่สามารถโหลดข้อมูลหนังสือ");
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("⚠️", "กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูล");
        router.replace("/signin");
        return;
      }

      const res = await fetch(`http://192.168.0.190:3000/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ แนบ token ที่นี่
        },
        body: JSON.stringify({
          ...form,
          year: parseInt(form.year),
          price: parseFloat(form.price),
        }),
      });

      if (res.ok) {
        Alert.alert("✅", "บันทึกข้อมูลเรียบร้อย");
        router.replace(`/book_detail?id=${id}`);
      } else {
        const error = await res.json();
        Alert.alert("❌", error.message || "เกิดข้อผิดพลาดในการบันทึก");
        console.log("Error response:", error);
      }
    } catch (error) {
      console.error("Update error:", error);
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
      <Text style={styles.title}>✏️ แก้ไขหนังสือ</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>💾 บันทึก</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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