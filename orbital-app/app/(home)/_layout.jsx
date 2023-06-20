import { Tabs } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Home() {
  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen name="index" options={{ title: "Home"}} />
      <Tabs.Screen name="findabook" options={{ title: "Search" }} />
      <Tabs.Screen name="booklists" options={{ title: "Book List" }} />
      <Tabs.Screen name="libraries" options={{ title: "Libraries" }} />
    </Tabs>
  );
}
