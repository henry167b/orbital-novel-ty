import { FlatList, View, StyleSheet } from "react-native";
import { Surface, Text, Card, Button, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { storeDefaults } from "../../async_storage/storage";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Libraries" />
    </Appbar.Header>
  );
}

export default function Libraries() {
  const [data, setData] = useState([]);

  useEffect( () => {
    getLibraries();
  }, []);

  const getLibraries = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@libraries');
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        setData(parsedData);
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <HomeBar />
      <FlatList
      style={styles.list}
      data={ data }
      renderItem={({ item }) => <Library lib={ item } />}
      />
      <Button onPress={() => console.log(data)}>Press me</Button>
    </View>
  );
}

function Library({ lib }) {
  return (
    <View style={styles.library}>
      <Card style={styles.surface} mode="elevated">
        <Text>{lib.name}</Text>
        <Text></Text>
        <Text>Address: {lib.location}</Text>
      </Card>
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Feather name='book' size={20} />
        <Text>{lib.books.length} / 5</Text>
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