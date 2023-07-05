import { useRouter, useFocusEffect } from "expo-router";
import { Button, Appbar, Card, Text, SegmentedButtons } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeDefaults, getBooks, removeBook } from "../../async_storage/storage";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Novel-ty" />
    </Appbar.Header>
  );
}

function Book({ book, stateChanger }) {
  return (
    <View style={styles.book}>
      <View>
        <Text>Title: {book.title}</Text>
        <Text>Author: {book.author}</Text>
        <Text>ISBN: {book.isbn}</Text>
        <Text></Text>
      <Button mode='contained' onPress={() => { removeBook(book).then(e => stateChanger(true)) }}
      style = {styles.removeButton}
      buttonColor="#FF4A4A"
      >Remove</Button>
      </View>
    </View>
  );
}

function WishList() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useFocusEffect( 
    useCallback( () => {
      getBooks().then(books => setData(books));
    }, []));

  useEffect( () => {
    setReload(false);
    getBooks().then(books => setData(books));
  }, [reload]);

  return (
    <View>
      <FlatList
      style={{ width: '100%', marginBottom: 175 }}
      data={ data }
      renderItem={({ item }) => <Book book={item} stateChanger={setReload} />}
      />
    </View>
    
  );
}

export default function BookLists() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <HomeBar />
      <SegmentedButtons
        style={styles.listTabs}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "wishlist",
            label: <Text style={{fontSize: 10}}>WISH LIST</Text>,
            style: {...styles.tab, borderRadius: 5}
          },
          {
            value: "loans",
            label: <Text style={{fontSize: 10}}>LOANS</Text>,
            style: {...styles.tab}
          },
          {
            value: "reservations",
            label: <Text style={{fontSize: 10}} >RESERVATIONS</Text>,
            style: {...styles.tab, borderRadius: 5}
          }
        ]} />
      {value == 'wishlist' && <WishList />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 35
  },
  bar : {
    width: "100%",
    backgroundColor: 'white'
  },
  listTabs: {
    width: "100%"
  },
  tab: {
    borderRadius: 0,
  },
  book: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0,
    marginTop: 10,
    margin:10,
    borderRadius:5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4, // for Android 
  },
  removeButton: {
    width:100,
    height:40,
    marginTop:10,
    borderRadius:500,
  },
})