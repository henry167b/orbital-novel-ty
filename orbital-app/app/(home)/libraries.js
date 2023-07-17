import { FlatList, View, StyleSheet, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { Surface, Text, Card, Button, Appbar, Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useRef } from "react";
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
  const [selectedLibrary, setSelectedLibrary] = useState(null); // To keep track of the selected library
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getInfo();
    }, [])
  );

  const getInfo = () => {
    getLibraries().then((libraries) => {
      libraries.sort((a, b) => (a.books.length > b.books.length) ? -1 : ((b.books.length > a.books.length) ? 1 : 0));
      setLibraries(libraries);
    });
    getBooks().then((books) => setBooks(books));
  }

  const handleLibraryPress = (library) => {
    console.log("Library pressed:", library);
    setSelectedLibrary(library); // Set the selected library when it is pressed
  };

  const closeModal = () => {
    setSelectedLibrary(null); // Clear the selected library when closing the modal
  };

  return (
    <View style={styles.container}>
      <HomeBar />
      <FlatList
        style={styles.list}
        onRefresh={ () => { setRefresh(true); getInfo(); setRefresh(false); } }
        refreshing={refresh} 
        data={libraries}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLibraryPress(item)}>
            <Library lib={item} books={books.length} />
          </TouchableOpacity>
        )}
      />

    <Modal visible={selectedLibrary !== null} onDismiss={closeModal} style={{alignItems: 'center'}}>
            <View style={styles.modalContainer}>
              <Card.Title title={selectedLibrary?.name} />
              <FlatList
                style={styles.bookList}
                data={books}
                renderItem={({ item }) => <BookInLibrary book={item} extraData={selectedLibrary?.books} />}
                keyExtractor={(item, index) => index.toString()}
              />
              <Card.Actions>
                <Button onPress={closeModal}>Close</Button>
              </Card.Actions>
            </View>
          </Modal>
        </View>
  );
}

function BookInLibrary({ book, extraData }) {
  const [avail, setAvail] = useState(false);

  useEffect( () => {
    if (extraData?.some(b => b.title == book.title)) {
      setAvail(true);
    }
  }, [book, extraData]);

  return (
    <Text style={avail ? styles.bookAvail : styles.bookUnavail}>{book.title}</Text>
  )
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
    borderRadius: 5,
    width: '85%',
    height: '100%',
    backgroundColor: 'white',
    padding: 10
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '85%',
    height: '70%',
    margin: 20,
    padding: 20,
    borderRadius: 5,
  },
  bookList:{
    flex: 1,
  },
  scrollView: {
    maxHeight: 200,
  },
  bookAvail: {
    color: 'black',
    paddingVertical: 5
  },
  bookUnavail: {
    color: 'gray',
    paddingVertical: 5
  }
});
