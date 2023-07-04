import { useEffect,useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Text, Button, Surface } from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { Link, Stack, useFocusEffect } from "expo-router";
import { storeDefaults } from "../../async_storage/storage";
import { WebView } from "react-native-webview";

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

function ScraperWebView() {
  const { user, password } = useAuth();
  const [injectParse, setInjectParse] = useState(false);

  const injectLoginScript = `
    document.getElementById('username').value="ibnu2651";
    document.getElementById('password').value="poohpanda26";
    document.getElementsByName('submit')[0].click();
    true;
  `;
// 
  const injectParseScript = `
    const result = Array.prototype.slice.call(document.getElementsByClassName('item-title-value')).map(e => e.href.split('BRN=').pop());
    window.ReactNativeWebView.postMessage(JSON.stringify(result));
    true;
  `;

  const handleWebViewLoad = () => {
    if (!injectParse) {
      this.webref.injectJavaScript(injectLoginScript);
      setInjectParse(true);
    } else {
      setTimeout( () => {
        this.webref.injectJavaScript(injectParseScript);
      }, 3000);
    }
    console.log('load end');
  }

  return (
    // delete style to hide
    <View style={{flex: 1}}>
      <WebView
        ref={(r) => (this.webref = r)}
        style={{flex: 1}} //change to 0 to hide
        source={{ uri: 'https://www.nlb.gov.sg/mylibrary/Bookmarks' }}
        onLoadEnd={handleWebViewLoad}
        onMessage={ (msg) => {
          console.log(JSON.parse(msg.nativeEvent.data));
        }}
      />
    </View> 
  );
}

export default function Home() {
  useEffect( () => {
    storeDefaults();
    
  }, );

  return (
    <View style={styles.container}>
      <HomeBar />
      <Content />
      <ScraperWebView />
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
