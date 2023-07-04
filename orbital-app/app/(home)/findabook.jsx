import { useFocusEffect, useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, TextInput, Searchbar, Divider } from "react-native-paper";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAvailability, search , getTitleDetails} from "../../nlb_api/nlb";
import { addBook } from "../../async_storage/storage";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Animated } from "react-native";

function Search({ searchNLB }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder="Search keywords or ISBN"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchbar}
      onIconPress={() => searchNLB(searchQuery)}
      onSubmitEditing={() => searchNLB(searchQuery)}
      mode="bar"
    />
  );
}

function Bookbox({ book }) {
  const handleAddtoWishList = () => {
    addBook(book);
    console.log("ISBN:", book.isbn); // to be removed afterwards
  };

  return (
    <View style={styles.book}>
      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>ISBN: {book.isbn}</Text>
      {true && (
        <LogButton onPress={handleAddtoWishList} text="Add to Wish List" />
      )}
    </View>
  );
}

function Searchresults({ data }) {
  return (
    <View style={styles.searchResults}>
      <Text>RESULTS</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', marginVertical: 20 }}
        data={data}
        renderItem={({ item }) => <Bookbox book={item} />}
      />
    </View>
  );
}

function RecentSearches() {
  return (
    <View style={styles.recentSearches}>
      <Text>RECENT SEARCHES</Text>
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
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const searchNLB = (query) => {
    if ((query.length == 10 || query.length == 13) && /^\d+$/.test(query)) {
      getTitleDetails('', query).then(res => {
        setData(res);
        setShowSearch(true);
      })
    } else {
      search(query).then(res => {
        setData(res);
        setShowSearch(true);
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setShowSearch(false);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Search searchNLB={searchNLB} />
      <Divider style={{ width: '100%' }} />
      {showSearch && <Searchresults data={data} />}
      {!showSearch && <RecentSearches />}
      {!showSearch && <Recommended />}
    </SafeAreaView>
  );
}

function LogButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
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
    width: '80%',
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
    paddingTop: 20
  },
  recommended: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 20
  },
  searchResults: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 35,
    paddingTop: 20
  },
  book: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0,
    borderRadius: 5,
    margin: 10,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4, // for Android 
  },
  button: {
    backgroundColor: "#0D98C0",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 500,
    marginTop: 10,
    },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    }
});
