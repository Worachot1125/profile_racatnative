import { Stack } from "expo-router";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { View } from "react-native";

function StackLayout() {
  const { color, isDarkMode } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: color.background,
        },
        headerTintColor: color.text,
        headerTitleStyle: {
          color: color.text,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <View style={{ paddingRight: 12 }}>
              <ThemeToggle key={isDarkMode ? "dark" : "light"} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About us",
          headerRight: () => (
            <View style={{ paddingRight: 12 }}>
              <ThemeToggle key={isDarkMode ? "dark" : "light"} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <StackLayout />
    </ThemeProvider>
  );
}
