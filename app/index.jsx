import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { color, isDarkMode } = useTheme();
  const router = useRouter();

  const buttonColor = isDarkMode ? "#777777" : "#6200ee";

  const handlePress = () => {
    router.push("/about");
  };

  return (
    <ScrollView style={{ backgroundColor: color.background }} contentContainerStyle={styles.wrapper}>
      <StatusBar style="auto" />

      <Image
        source={require("../assets/image/worachot.jpg")}
        style={[styles.image, { borderColor: color.primary }]}
      />

      <Text style={[styles.topic, { color: color.text }]}>My Profile</Text>

      <View style={[styles.infoContainer, { backgroundColor: color.surface }]}>
        <Text style={[styles.infoText, { color: color.text }]}>ชื่อ: วรโชติ ทองเลิศ</Text>
        <Text style={[styles.infoText, { color: color.text }]}>รหัส: 653450299-0</Text>
        <Text style={[styles.infoText, { color: color.text }]}>วิทยาการคอมพิวเตอร์และสารสนเทศ</Text>
        <Text style={[styles.infoText, { color: color.text }]}>มหาวิทยาลัยขอนแก่น</Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: buttonColor }]}
          onPress={handlePress}>
          <Text style={styles.btnText}>About me</Text>
        </TouchableOpacity>
      </View>

      <Sidetopic />
    </ScrollView>
  );
}

/* -------------------- component ย่อย -------------------- */
function Sidetopic() {
  const { color } = useTheme();
  const series = [
    { value: 20, color: "#f94144", label: "HTML" },
    { value: 15, color: "#f3722c", label: "CSS" },
    { value: 25, color: "#f8961e", label: "JavaScript" },
    { value: 20, color: "#f9844a", label: "Go" },
    { value: 10, color: "#43aa8b", label: "Vue" },
    { value: 10, color: "#577590", label: "React" },
    { value: 10, color: "#277da1", label: "Flutter" },
    { value: 10, color: "#90be6d", label: "Python" },
  ];

  return (
    <View style={{ width: "90%" }}>
      <Text style={[styles.topic, { color: color.text }]}>My Skill</Text>

      {series.map((item, idx) => (
        <View key={idx} style={[styles.block, { backgroundColor: item.color }]}>
          <Text style={[styles.blockText, { color: color.text }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

/* -------------------- style -------------------- */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: "center",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#A0C4FF",
  },
  topic: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    letterSpacing: 1,
  },

  block: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  blockText: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoContainer: {
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    paddingVertical: 25,
    marginBottom: 40,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
