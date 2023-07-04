import { Tabs } from "expo-router";
import { Image } from "react-native";


const HomeIcon = require("../../assets/home_4991416.png");
const BookIcon = require("../../assets/notebook_3311424.png");
const SearchIcon = require("../../assets/search_5186446.png");
const LibrariesIcon = require("../../assets/placeholder_684809.png")

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Home() {
  return (
    <Tabs screenOptions={{ headerShown: false }} >
      <Tabs.Screen name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={{ tintColor: color, width: size, height: size}}
            />
          ),
        }}
      />
      <Tabs.Screen name="findabook" 
        options={{ 
          title: "Search",
          tabBarIcon: ({color,size}) => (
            <Image
              source={SearchIcon}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
        }}
      />

      <Tabs.Screen name="booklists" 
        options={{ 
          title: "Book List",
          tabBarIcon: ({color,size}) => (
            <Image
              source={BookIcon}
              style={{tintColor: color, width: size, height: size}}
          />
          ),
        }}
      />
      <Tabs.Screen name="libraries" 
        options={{ 
          title: "Libraries",
          tabBarIcon: ({color,size}) => (
            <Image
              source={LibrariesIcon}
              style={{tintColor: color, width: size, height: size}}
          />
          ),
        }}
      />
    </Tabs>
  );
}

