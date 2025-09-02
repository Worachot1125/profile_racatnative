import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { router, Link } from "expo-router";

const Book = () => {
  const [data, setData] = useState([]);
  const { color } = useTheme();
  // function to fetch book data
  const bookData = async () => {
    try {
      fetch("http://192.168.0.190:3000/api/books")
        .then((response) => response.json())
        .then((data) => {
          console.log("Book data fetched successfully:", data.books);
          setData(data.books);
        })
        .catch((error) => {
          console.error("Error fetching book data:", error);
        });
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };
  useEffect(() => {
    console.log("Book component mounted");
    bookData();
  }, []);
  return (
    <View style={[style.container, { backgroundColor: color.background }]}>
      <Link href="/book_new" asChild>
        <TouchableOpacity style={style.createButton}>
          <Text style={style.createButtonText}>📚 สร้างหนังสือใหม่</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() =>
              router.push({
                pathname: "/book_detail",
                params: { id: item._id },
              })
            }
          >
            <Text style={style.title}>{item.title}</Text>
            <Text style={style.text}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default Book;
const style = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 20,
    alignItems: "center",
  },
  itemContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  title: {
    fontSize: 34,
  },
  text: {},
  createButton: {
  backgroundColor: '#4ECDC4',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 10,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},
createButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},

});
