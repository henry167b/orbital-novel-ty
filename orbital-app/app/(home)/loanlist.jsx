import { useRouter } from "expo-router";
import { Button, Appbar, Surface, Text, SegmentedButtons } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

function HomeBar() {
  return (
    <Appbar.Header style={styles.bar} mode="center-aligned" statusBarHeight={60}>
      <Appbar.Content title="Novel-ty" />
    </Appbar.Header>
  );
}

function ListTabs() {
  const [value, setValue] = useState('');

  return (
    <SegmentedButtons
      style={styles.listTabs}
      value={value}
      density="regular"
      theme={{fontSize: 16}}
      onValueChange={setValue}
      buttons={[
        {
          value: "wishlist",
          label: <Text style={{fontSize: 10}}>WISH LIST</Text>,
          style: {...styles.tab, borderRadius: 0, padding: 0}
        },
        {
          value: "loans",
          label: <Text style={{fontSize: 10}}>LOANS</Text>,
          style: {...styles.tab}
        },
        {
          value: "reservations",
          label: <Text style={{fontSize: 10}} >RESERVATIONS</Text>,
          style: {...styles.tab, borderRadius: 0}
        }
        
      ]} />
  );
}

export default function LoanList() {
  return (
    <View style={styles.container}>
      <HomeBar />
      <ListTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 35
  },
  bar : {
    width: "100%",
    backgroundColor: 'white'
  },
  content: {
    alignItems: "center",
    gap: 20
  },
  listTabs: {
    width: "100%",
  },
  tab: {
    borderRadius: 0,
  }
})
