import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Text, Button, Surface } from "react-native-paper";
import { useAuth } from "../../contexts/auth";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} elevated="true" mode="center-aligned">
      <Appbar.BackAction />
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
      <Functions />
      <Button mode="contained" onPress={() => signOut()}>Sign out</Button>
    </View>
  );
}

function Events() {
  return (
    <Surface style={styles.events}>
      <View style={{
        backgroundColor: "#ECEDC6",
        borderBottomWidth: 0.5,
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center"}}>
        <Text variant="titleLarge">Upcoming Events</Text>
      </View>
      <View style={{
        padding: 10
      }}>
        <Button buttonColor="#ECEDC6" textColor="black" mode="contained-tonal">View More</Button>
      </View>
    </Surface>
  );
}

function BookSeat() {
  return (
    <Pressable>
      <Surface style={styles.function}>
        <Text variant="titleMedium">Book a seat</Text>
      </Surface>
    </Pressable>
  );
}

function FindBook() {
  return (
    <Pressable>
      <Surface style={styles.function}>
        <Text variant="titleMedium">Find a book</Text>
      </Surface>
    </Pressable>
  );
}

function Functions() {
  return (
    <View style={styles.functionsContainer}>
      <BookSeat />
      <FindBook />
    </View>
  );
}

export default function Home() {
  
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
    width: "100%"
  },
  content: {
    alignItems: "center",
    padding: 50,
    gap: 20
  },
  events: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#DBE9FD"
  },
  functionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  function: {
    padding: 30,
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "#ECEDC6",
    borderRadius: 10
  }
});
