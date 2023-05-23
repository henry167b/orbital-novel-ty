import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text, TextInput, Checkbox, Button } from 'react-native-paper';
import { useAuth } from "../../contexts/auth";

function UsernameEntry() {
  const [text, setText] = useState("");

  return (
    <View style={{width: '100%'}}>
      <Text variant='titleMedium' style={{alignItems: 'flex-start'}}>myLibrary User</Text>
      <TextInput
        mode='outlined'
        value={text}
        onChangeText={setText}
        style={styles.textInput}
      />
    </View>
  );
}

function PasswordEntry() {
  const [text, setText] = useState("");

  return (
    <View style={{width: '100%'}}>
      <Text variant='titleMedium' style={{alignItems: 'flex-start'}}>Password</Text>
      <TextInput
        secureTextEntry
        mode='outlined'
        value={text}
        onChangeText={setText}
        style={styles.textInput}
      />
    </View>
  );
}

function LoginButton() {
  const { signIn } = useAuth();

  return (
    <Button 
      mode='contained' 
      contentStyle={styles.loginButton}
      onPress={() => signIn()}
    >
      Sign In
    </Button>
    
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

function LoginContainer() {

  return (
    <Surface style={styles.loginContainer} elevation={3}>
      <Text variant='headlineSmall' style={{paddingVertical: 10}}>Welcome Back!</Text>
      <UsernameEntry />
      <PasswordEntry />
      <LoginButton />
      <RememberMe />
    </Surface>
  );
}

export default function Login() {
  return (
    <SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Text variant='displayMedium' style={{padding: 50}}>Novel-ty</Text>
				<LoginContainer />
			</SafeAreaView>
	</SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    alignItems: 'center',
    justifyContent: 'ce',
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