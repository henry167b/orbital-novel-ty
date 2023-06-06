import { useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, TextInput, Searchbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

function HomeBar() {
  const router = useRouter();
  return (
    <Appbar.Header style={styles.bar} elevated="true" mode="center-aligned">
      <Appbar.BackAction onPress={ () => router.back() }/>
      <Appbar.Content title="Novel-ty" />
      <Appbar.Action icon="bell" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder="Search a book"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
      mode="bar" />
  );
}

function Content() {
  return (
    <View style={styles.content}>
      <Search />
    </View>
  );
}

export default function FindABook() {
  return (
    <SafeAreaProvider style={styles.container}>
      <HomeBar />
      <Content />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BFBFBF",
  },
  bar: {
    backgroundColor: "#DBE9FD",
    borderBottomWidth: 0.5,
    width: "100%",
  },
  content: {
    alignItems: "center",
    padding: 40,
    gap: 20,
  },
  searchbar: {
    backgroundColor: "#ECEDC6",
  },
});
