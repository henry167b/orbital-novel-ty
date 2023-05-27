import { useState, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text, TextInput, Checkbox, Button } from 'react-native-paper';
import { useAuth } from "../../contexts/auth";
import { WebView } from 'react-native-webview';

function LoginContainer() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const handleSubmit = () => {

    signIn(user, password);
    
  }

  return (
    <Surface style={styles.loginContainer} elevation={3}>
      <Text variant='headlineSmall' style={{paddingVertical: 10}}>Welcome Back!</Text>
        <View style={{width: '100%'}}>
        <Text variant='titleMedium' style={{alignItems: 'flex-start'}}>myLibrary User</Text>
        <TextInput
          mode='outlined'
          value={user}
          onChangeText={setUser}
          style={styles.textInput}
        />
      </View>
      <View style={{width: '100%'}}>
        <Text variant='titleMedium' style={{alignItems: 'flex-start'}}>Password</Text>
        <TextInput
          secureTextEntry
          mode='outlined'
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>
      <Button 
        mode='contained' 
        contentStyle={styles.loginButton}
        onPress={handleSubmit}
      >
        Sign In
      </Button>
      <RememberMe />
    </Surface>
  );
}

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

function NLBLogin() {
  const injectedLogin = `
    document.getElementById('username').value="ibnu265";
    document.getElementById('password').value="poohpanda26";
    document.getElementsByName('submit')[0].click();
    true;
  `;
  return (
    <WebView
      source={{ uri: 'https://www.nlb.gov.sg/mylibrary' }}
      injectedJavaScript={injectedLogin} />
  );
}

export default function Login() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text variant='displayMedium' style={{padding: 50}}>Novel-ty</Text>
				<LoginContainer />
      </View>	
      <NLBLogin style={{flex: 0}} />
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 30,
    gap: 20,
    width: '75%',
    borderRadius: 10
  },
  textInput: {
    height: 30,
    width: '100%'
  },
  loginButton: {
    width: '100%'
  }
});