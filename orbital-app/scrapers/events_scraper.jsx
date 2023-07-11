import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export function EventScraperWebView() {
  const handleWebViewLoad = () => {
  };
  
  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://www.nlb.gov.sg/main/whats-on/events#filterResult2" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
