import { useEffect } from "react";
import {  StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, Text, Button } from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { storeDefaults } from "../../async_storage/storage";
import { WishlistScraperWebView } from "../../scrapers/wishlist_scraper";
import { EventScraperWebView } from "../../scrapers/events_scraper";

function HomeBar() {
  const { signOut } = useAuth();
  return (
    <Appbar.Header
      style={styles.bar}
      mode="center-aligned"
      statusBarHeight={60}
    >
      <Appbar.Content title="Novel-ty" />
      <Button
        mode="contained"
        onPress={() => signOut()}
        style={styles.signOutButton}
      >
        Sign out
      </Button>
    </Appbar.Header>
  );
}

function Content() {
  return (
    <View style={styles.content}>
      <Events />
    </View>
  );
}

function Events() {
  return (
    <View style={styles.events}>
      <Text variant="titleMedium" style={{ fontSize: 20, textAlign: "center" }}>
        Upcoming Events
      </Text>
    </View>
  );
}

export default function Home() {
  useEffect(() => {
    // if (!hasDefaults()) {

    storeDefaults();
    // }
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <HomeBar />
        <Content />
        <EventScraperWebView />
        <WishlistScraperWebView />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bar: {
    width: "100%",
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 35,
    paddingVertical: 15,
  },
  events: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 10,
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
    textAlign: "center",
  },
  signOutButton: {
    marginRight: 10,
  },
});
