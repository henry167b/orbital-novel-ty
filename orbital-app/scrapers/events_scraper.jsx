import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export function EventScraperWebView() {
  const handleWebViewLoad = () => {
  };

  return (
    <View style={{flex: 1}}>
      <WebView 
        ref={(r) => (this.webref = r)}
        style={{ flex: 1 }} //change to 0 to hide
        source={{ uri: "https://www.nlb.gov.sg/main/whats-on/events#filterResult2" }} 
        onLoadEnd={handleWebViewLoad}
        onMessage={(msg) => {
          handleParsedBooks(JSON.parse(msg.nativeEvent.data));
        }}
        />
    </View>
  );
}

