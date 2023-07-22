import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#0D98C0',
    onPrimary: '#000000',
    secondary: '#FFDB47',
    

  }
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}/>
      </AuthProvider>
    </PaperProvider>
    
  );
}
