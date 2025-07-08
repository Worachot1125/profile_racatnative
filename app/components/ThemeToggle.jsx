import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Adjust the import path as necessary
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity style={styles.btn} onPress={toggleTheme}>
      {/* ★ กำหนดสีตัดพื้นหลังชัดเจน */}
      <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#000" }]}>
        {isDarkMode ? "Dark" : "Light"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { paddingHorizontal: 10, paddingVertical: 4 },
  label: { fontSize: 12, fontWeight: "600" },
});