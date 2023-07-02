import { useFocusEffect, useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, TextInput, Searchbar, Divider } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAvailability, search } from "../../nlb_api/nlb";
import { addBook } from "../../async_storage/storage";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Animated } from "react-native";

function Search({ searchNLB }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Searchbar
      placeholder="Search on Novel-ty"
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
  const translateX = new Animated.Value(0);
  const panGestureHandler = Animated.event([{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: true,
  });

  const handlePanStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX < -80) {
        Animated.timing(translateX, {
          toValue: -80,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      }
    } else if (event.nativeEvent.translationX > 0) {
      translateX.setValue(0);
    }
  };
  
  
  return (
    <PanGestureHandler
      onGestureEvent={panGestureHandler}
      onHandlerStateChange={handlePanStateChange}
    >
      <Animated.View
        style={[
          styles.book,
          {
            transform: [{ translateX: translateX }],
          },
        ]}
      >
        <Text>Title: {book.title}</Text>
        <Text>Author: {book.author}</Text>
        <Text>ISBN: {book.isbn}</Text>
      </Animated.View>
    </PanGestureHandler>
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
    search(query).then((res) => {
      setData(res);
      setShowSearch(true);
    });
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
    borderRadius: 8,
    margin: 10,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4, // for Android 
  }
});
