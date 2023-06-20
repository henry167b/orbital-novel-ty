import { useEffect,useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Text, Button, Surface } from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { Link, Stack, useFocusEffect } from "expo-router";
import { storeDefaults } from "../../async_storage/storage";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Novel-ty" />
      <Appbar.Action icon="bell" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

function Content() {
  const { signOut } = useAuth();
  return (
    <View style={styles.content}>
      <Events />
      <Button mode="contained" onPress={() => signOut()}>Sign out</Button>
    </View>
  );
}

function Events() {
  return (
    <View style={styles.events}>
      <Text variant="titleMedium">Upcoming Events</Text>
    </View>
  );
}

export default function Home() {
  useFocusEffect( 
    useCallback( () => {
      storeDefaults();
    }, []));

  return (
    <View style={styles.container}>
      <HomeBar />
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: 'white'
  },
  bar: {
    width: "100%",
    backgroundColor: 'white'
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 35,
    paddingTop: 20,
    gap: 20
  },
  events: {
    alignItems: 'flex-start',
    justifyContent: "space-evenly",
    width: "100%",
    gap: 10
  },
  functionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  function: {
    width: 150,
    padding: 25,
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "#ECEDC6",
    borderRadius: 10,
  },
  functionText: {
    textAlign: "center"
  }
});
