import { Link } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const SignInButton = () => {
  const { color } = useTheme();

  return (
    <TouchableOpacity style={{ marginRight: 12 }}>
      <Link href="/signin" asChild>
        <Text style={{ color: color.primary, fontWeight: "bold" }}>Sign In</Text>
      </Link>
    </TouchableOpacity>
  );
};

export default SignInButton;
