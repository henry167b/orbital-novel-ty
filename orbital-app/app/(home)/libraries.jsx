import { FlatList, View, StyleSheet } from "react-native";
import { Surface, Text, Card, Button, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { storeDefaults, getLibraries, getBooks } from "../../async_storage/storage";
import { useFocusEffect } from "expo-router";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Libraries" />
    </Appbar.Header>
  );
}

export default function Libraries() {
  const [libraries, setLibraries] = useState([]);
  const [books, setBooks] = useState([]);

  useFocusEffect( 
    useCallback( () => {
      getLibraries().then(libraries => {
        libraries.sort((a, b) => (a.books.length > b.books.length) ? -1 : ((b.books.length > a.books.length) ? 1 : 0));
        setLibraries(libraries);
      });
      getBooks().then(books => setBooks(books));
    }, []));

  return (
    <View style={styles.container}>
      <HomeBar />
      <FlatList
      style={styles.list}
      data={ libraries }
      renderItem={({ item }) => <Library lib={ item } books={books.length}/>}
      />
      <Button onPress={() => console.log(libraries)}>Press me</Button>
    </View>
  );
}

function Library({ lib, books }) {
  return (
    <View style={styles.library}>
      <Card style={styles.surface} mode="elevated">
        <Text>{lib.name}</Text>
        <Text></Text>
        <Text>Address: {lib.location}</Text>
      </Card>
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name='book' size={20} />
        <Text>{lib.books.length} / {books}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "white",
    paddingHorizontal: 35
  },
  bar: {
    width: "100%",
    backgroundColor: 'white'
  },
  list: {
    width: '100%'
  },
  library: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 125,
    width: '100%',
    gap: 10,
    marginVertical: 10,
    marginLeft: 3
  },
  surface: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 10,
    width: '85%',
    height: '100%',
    backgroundColor: 'white',
    padding: 10
  }
})