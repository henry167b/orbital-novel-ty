import { useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, TextInput, Searchbar, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAvailability } from "../../nlb_api/nlb";
import { addBook } from "../../async_storage/storage";

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder="Search on Novel-ty"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
      onIconPress={ () => addBook(searchQuery)}
      mode="bar" />
  );
}

function RecentSearches() {
  return (
    <View style={styles.recentSearches}>
      <Text>RECENT SEARCHES</Text>
      <Button mode='outlined' onPress={ () => getAvailability('0571355064')}>add book</Button>
    </View>
  );
}

function Recommended() {
  return (
    <View style={styles.recommended}>
      <Text>RECOMMENDED FOR YOU</Text>
    </View>
  );
}

export default function FindABook() {
  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <Divider style={{width: '100%' }}/>
      <RecentSearches />
      <Recommended />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchbar: {
    backgroundColor: "#F3F6F8",
    borderRadius: 10,
    marginHorizontal: 35,
    marginVertical: 25,
    height: 50
  },
  recentSearches: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 35
  },
  recommended: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 35
  }
});
