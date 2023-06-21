import { useRouter, useFocusEffect } from "expo-router";
import { Button, Appbar, Card, Text, SegmentedButtons } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeDefaults, getBooks } from "../../async_storage/storage";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Novel-ty" />
    </Appbar.Header>
  );
}

function Book({ book }) {
  return (
    <View style={styles.book}>
      <Text>ISBN: {book}</Text>
      <Text>Address: </Text>
    </View>
  );
}

function WishList() {
  const [data, setData] = useState([]);

  useFocusEffect( 
    useCallback( () => {
      getBooks().then(books => setData(books));
    }, []));

  return (
    <View>
      <FlatList
      style={{ width: '100%' }}
      data={ data }
      renderItem={({ item }) => <Book book={item}/>}
      />
      <Button mode='outlined' onPress={ () => console.log(data)}>print books</Button>
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
            style: {...styles.tab, borderRadius: 0}
          },
          {
            value: "loans",
            label: <Text style={{fontSize: 10}}>LOANS</Text>,
            style: {...styles.tab}
          },
          {
            value: "reservations",
            label: <Text style={{fontSize: 10}} >RESERVATIONS</Text>,
            style: {...styles.tab, borderRadius: 0}
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    marginTop: 10
  }
})