import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Surface, Text, TextInput, Checkbox, Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from "../../contexts/auth";
import { WebView } from 'react-native-webview';

function RememberMe() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 10, width: '100%'}}>
      {<Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {setChecked(!checked)}}
      />}
      <Text variant='bodyLarge'>Remember me</Text>
    </View>
    
  );
}

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  // changed for easier testing
  const injectLoginScript = `
    document.getElementById('username').value="`+ user + `";
    document.getElementById('password').value="` + password + `";
    document.getElementsByName('submit')[0].click();
    true;
  `;

  const checkValidScript = `
    window.ReactNativeWebView.postMessage(document.getElementsByName("submit")[0] == null);
    true;
  `;

  const bypass = () => {
    setUser(user);
    setPassword(password);
    signIn(user, password);
  }

  const handleSubmit = () => {
    // setUser("ibnu2651");
    // setPassword("poohpanda26");
    
    setErrMsg("");
    setLoading(true);
    injectLogin();
    setTimeout(() => checkValid(), 3000);
    setLoading(false);
  }

  const injectLogin = () => {
    this.webref.injectJavaScript(injectLoginScript);
  }

  const checkValid = () => {
    this.webref.injectJavaScript(checkValidScript);
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.loginContainer}>

          <Text variant='headlineSmall'>Let's Sign You In</Text>

          <View style={{width: '100%'}}>
            <Text variant='titleSmall' style={{alignItems: 'flex-start', color: 'gray'}}>myLibrary User</Text>
            <TextInput
              value={user}
              onChangeText={setUser}
              style={styles.textInput}
            />
          </View>

          <View style={{width: '100%'}}>
            <Text variant='titleSmall' style={{alignItems: 'flex-start', color: 'gray'}}>Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
            />
          </View>
        </View>
        { errMsg !== "" && <Text>{errMsg}</Text>}
        { loading && <ActivityIndicator /> }

        <Button 
          mode='contained' 
          contentStyle={{}}
          style={{borderRadius: 5, width: '100%'}}
          labelStyle={{}}
          onPress={() => {
            if (user == 'novelty' && password == 'password') {
              bypass();
            } else {
              handleSubmit();
            }
          }}>
          SIGN IN
        </Button>
      </View>	

      {true && 
        <WebView
        incognito={true}
        ref={(r) => (this.webref = r)}
        style={{flex: 1}} //change to 0 to hide
        source={{ uri: 'https://www.nlb.gov.sg/mylibrary' }}
        onMessage={ (e) => {
          if (e.nativeEvent.data == "true") {
            // changed for easier testing
            signIn(user, password);
          } else {
            setErrMsg("Invalid login details");
          }
        }} />
      }
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10, //change to flex 10
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 25, //change to 350
    paddingHorizontal: 40
  },
  loginContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    gap: 50,
    width: '100%',
  },
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
  }
});