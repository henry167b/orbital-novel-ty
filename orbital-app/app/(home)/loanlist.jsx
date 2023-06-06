import { useRouter } from "expo-router";
import { Button, Appbar, Surface, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function HomeBar() {
  const router = useRouter();
  return (
    <Appbar.Header style={styles.bar} elevated="true" mode="center-aligned">
      <Appbar.BackAction onPress={ () => router.back() }/>
      <Appbar.Content title="Novel-ty" />
      <Appbar.Action icon="bell" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

function List() {
  return (
    <Surface style={styles.list}>
      <View style={{
        backgroundColor: "#ECEDC6",
        borderBottomWidth: 0.5,
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center"}}>
        <Text variant="titleLarge">Loan List</Text>
      </View>
      <View style={{
        padding: 10
      }}>
      </View>
    </Surface>
  );
}

function Content() {
  return (
    <View style={styles.content}>
      <List />
    </View>
  );
}

export default function LoanList() {
  const router = useRouter();

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
  bar : {
    backgroundColor: "#DBE9FD",
    borderBottomWidth: 0.5,
    width: "100%"
  },
  content: {
    alignItems: "center",
    padding: 40,
    gap: 20
  },
  list: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#DBE9FD"
  }
})
