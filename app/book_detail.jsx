import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getToken } from "./utils/auth";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://192.168.0.190:3000/api/books/${id}`);
      const data = await res.json();
      setBook(data.book);
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert("⚠️ ยืนยัน", "คุณต้องการลบหนังสือเล่มนี้ใช่หรือไม่?", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ลบ",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await getToken();
            if (!token) {
              Alert.alert("⚠️", "กรุณาเข้าสู่ระบบก่อนลบข้อมูล");
              router.replace("/signin");
              return;
            }

            const res = await fetch(`http://192.168.0.190:3000/api/books/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              Alert.alert("✅", "ลบหนังสือเรียบร้อยแล้ว");
              router.replace("/book"); // ✅ กลับไปหน้ารายการหนังสือ
            } else {
              const error = await res.json();
              Alert.alert("❌", error.message || error.error || "เกิดข้อผิดพลาดในการลบ");
            }
          } catch (error) {
            console.error("Delete error:", error);
            Alert.alert("❌", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 {book?.title}</Text>
      <Text>ผู้แต่ง: {book?.author}</Text>
      <Text>ประเภท: {book?.genre}</Text>
      <Text>ปีที่พิมพ์: {book?.year}</Text>
      <Text>ราคา: ฿{book?.price}</Text>
      <Text>คำอธิบาย: {book?.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push({ pathname: "/book_edit", params: { id } })}
      >
        <Text style={styles.buttonText}>✏️ แก้ไขข้อมูล</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>🗑️ ลบหนังสือ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  button: {
    backgroundColor: "#4ECDC4",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});