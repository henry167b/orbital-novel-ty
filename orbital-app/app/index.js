import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Surface, Text, TextInput, Checkbox, Button, PaperProvider } from 'react-native-paper';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

export default function App() {
  return (
      <Home />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFBFBF',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: 25,
    paddingBottom: 25
  }
});