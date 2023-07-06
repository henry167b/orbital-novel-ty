import { useEffect, useState } from "react";
import { View } from "react-native";
import { getTitleDetails } from "../nlb_api/nlb";
import { WebView } from "react-native-webview";
import { useAuth } from "../contexts/auth"
import { addBook, addManyBooks } from "../async_storage/storage";

async function handleParsedBooks(data) {
  const BRNs = data.filter(Number);
  console.log(BRNs);

  Promise.all(
    BRNs.map( async b => {
      return await getTitleDetails(b, '').then(res => res[0] ); 
    })
  ).then(res => addManyBooks(res));
}

export function WishlistScraperWebView() {
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
    const loop = setInterval(function() {
      const curr = Array.prototype.slice.call(document.getElementsByClassName('item-title-value')).map(e => e.href.split('BRN=').pop());
      result.push(...curr);
      const next = document.getElementsByClassName('page-item')[3];
      if (next && !next.classList.contains('disabled')) {
        next.firstElementChild.click();
      } else {
        clearInterval(loop);
        window.ReactNativeWebView.postMessage(JSON.stringify(result));
      }
    }, 1500);
  
    true;
  `;

  const handleWebViewLoad = () => {
    if (!injectParse) {
      this.webref.injectJavaScript(injectLoginScript);
      setInjectParse(true);
    } else {
      setTimeout(() => {
        this.webref.injectJavaScript(injectParseScript);
      }, 2000);
    }
  };

  return (
    // delete style to hide
    <View style={{ flex: 1 }}>
      <WebView
        ref={(r) => (this.webref = r)}
        style={{ flex: 1 }} //change to 0 to hide
        source={{ uri: "https://www.nlb.gov.sg/mylibrary/Bookmarks" }}
        onLoadEnd={handleWebViewLoad}
        onMessage={(msg) => {
          handleParsedBooks(JSON.parse(msg.nativeEvent.data));
        }}
      />
    </View>
  );
}

export function AddToWishlist() {

}

export function RemoveFromWishlist({ BRN, setBrn }) {
  const { user, password } = useAuth();

  useEffect( () => {
    console.log(BRN);
  }, [BRN]);

  const injectLoginScript = `
    document.getElementById('username').value="` + user + `";
    document.getElementById('password').value="` + password + `";
    document.getElementsByName('submit')[0].click();
    true;
  `;

  const injectRemoveScript = `
    const loop = setInterval(function() {
      const del = document.getElementsByClassName('btn-deleteBookmarks')[0];
      const nodeList = document.querySelectorAll('li.clearfix');

      for (let i = 0; i < nodeList.length; i++) {
        const checkbox = nodeList[i].getElementsByClassName('chkItem')[0];
        const BRN = nodeList[i].getElementsByTagName('a')[0].href.split('BRN=')[1];
        if (BRN == ` + BRN + `) {
          checkbox.click();
          del.click();
          document.getElementsByClassName('modal-footer')[1].childNodes[3].click();
          clearInterval(loop);
          window.ReactNativeWebView.postMessage(JSON.stringify(true));
          break;
        }
      }
      
      const next = document.getElementsByClassName('page-item')[3];
      if (next && !next.classList.contains('disabled')) {
        next.firstElementChild.click();
      } else {
        clearInterval(loop);
        window.ReactNativeWebView.postMessage(true);
      }
    }, 1500);
  
    true;
  `;

  const handleWebViewLoad = () => {
    // if (!injectRemove) {
    //   this.webref.injectJavaScript(injectLoginScript);
    //   setInjectRemove(true);
    // } else {
      setTimeout(() => {
        this.webref.injectJavaScript(injectRemoveScript);
      }, 2000);
    // }
  };

  return (
    // delete style to hide
    <View style={{ height: 0 }}>
      { BRN && <WebView
        ref={(r) => (this.webref = r)}
        style={{ flex: 1 }} //change to 0 to hide
        source={{ uri: "https://www.nlb.gov.sg/mylibrary/Bookmarks" }}
        onLoadEnd={handleWebViewLoad}
        onMessage={(msg) => {
          setBrn(false);
        }}
      /> }
    </View>
  );
}
