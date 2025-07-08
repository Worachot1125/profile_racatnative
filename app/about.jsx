import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "./context/ThemeContext";

export default function About() {
  const { color } = useTheme(); // ← ดึงสีจาก ThemeContext

  return (
    <ScrollView
      style={{ backgroundColor: color.background }}
      contentContainerStyle={styles.wrapper}
    >
      {/* กล่องข้อมูลเหมือน infoContainer ในหน้า index */}
      <View style={[styles.infoContainer, { backgroundColor: color.surface }]}>
        <Text style={[styles.title, { color: color.text }]}>About Us</Text>

        <Text
          style={[styles.text, { color: color.textSecondary, lineHeight: 24 }]}
        >
          รหัสวิชา: IN405109 | Version: 1{"\n\n"}
          ชื่อวิชา: การเขียนโปรแกรมบนอุปกรณ์เคลื่อนที่แบบไฮบริด{"\n\n"}
          คำอธิบายรายวิชา (ไทย):{"\n"}
          สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจำกัดของอุปกรณ์เคลื่อนที่{"\n"}
          เครื่องมือและภาษาที่ใช้สำหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม
          {"\n"}
          การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม
          {"\n"}
          กระบวนการพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม
          {"\n"}
          การใช้หน่วยความจำและส่วนเก็บบันทึกข้อมูล{"\n"}
          การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์ ส่วนติดต่อกับผู้ใช้{"\n"}
          การสื่อสารเครือข่ายกับภายนอก การเชื่อมโยงกับระบบเครื่องแม่ข่าย{"\n"}
          การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ระบบคอมพิวเตอร์{"\n"}
          ประเด็นด้านความมั่นคง การฝึกปฏิบัติ{"\n\n"}
          คำอธิบายรายวิชา (อังกฤษ):{"\n"}
          Hardware architecture, characteristics and limitations of mobile
          devices, tools and languages for cross platform mobile application
          development, cross platform language programming, cross platform
          application development process for mobile devices, how to use memory
          and data store, user permission and hardware access permission, user
          interface, communication with external systems, interfacing with
          server, mobile application testing using computer system simulation,
          security issues, hands-on practice.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingVertical: 60,
    alignItems: "center",
  },

  /* กล่องกรอบเหมือน infoContainer ใน index */
  infoContainer: {
    width: "90%",
    borderRadius: 14,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
