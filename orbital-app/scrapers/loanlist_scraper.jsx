import { useEffect, useState } from "react";
import { View } from "react-native";
import { getTitleDetails } from "../nlb_api/nlb";
import { WebView } from "react-native-webview";
import { useAuth } from "../contexts/auth"
import { addBook, addManyBooks } from "../async_storage/storage";

export function LoanlistScraperWebView({setData, setShowWebView }) {
  const { user, password } = useAuth();
  const [injectParse, setInjectParse] = useState(false);

  const injectLoginScript = `
    document.getElementById('username').value="` + user + `";
    document.getElementById('password').value="` + password + `";
    document.getElementsByName('submit')[0].click();
    true;
  `;

  const injectParseScript = `
    const result = [];
    const curr = document.getElementById('current-loans').children;

    for (let i = 0; i < curr.length; i++) {
        const name = curr[i].children[1].children[1].textContent;
        const duedate = curr[i].children[3].children[1].textContent;
        const book = {
            title: name,
            duedate: duedate
        }
        result.push(book)
    }
    window.ReactNativeWebView.postMessage(JSON.stringify(result));
  
    true;
  `;

  const handleWebViewLoad = () => {
    // if (!injectParse) {
    //   this.webref.injectJavaScript(injectLoginScript);
    //   setInjectParse(true);
    // } else {
      setTimeout(() => {
        this.webref.injectJavaScript(injectParseScript);
      }, 1500);
    // }
  };

  return (
    // delete style to hide
    <View style={{ height: 0 }}>
      <WebView
        ref={(r) => (this.webref = r)}
        style={{ flex: 1 }} //change to 0 to hide
        source={{ uri: "https://www.nlb.gov.sg/mylibrary/Loans" }}
        onLoadEnd={handleWebViewLoad}
        onMessage={(msg) => {
          setData(JSON.parse(msg.nativeEvent.data));
          setShowWebView(false);
        }}
      />
    </View>
  );
}