// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native"; // Import Text
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider
import client from "@/scripts/apolloClient"; // Import your Apollo Client instance



export default function TabLayout() {
   const colorScheme = useColorScheme();

   return (
      <ApolloProvider client={client}>
         {/* Wrap the Tabs with ApolloProvider */}
         <Tabs
            screenOptions={{
               tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
               headerShown: false,
               tabBarButton: HapticTab,
               tabBarBackground: TabBarBackground,
               tabBarStyle: Platform.select({
                  ios: {
                     // Use a transparent background on iOS to show the blur effect
                     position: "absolute",
                  },
                  default: {},
               }),
            }}
         >
            <Tabs.Screen
               name="index"
               options={{
                  title: "Home",
                  tabBarIcon: ({ color }) => (
                     <IconSymbol size={28} name="map" color={color} />
                  ),
               }}
            />
            <Tabs.Screen
               name="farmList"
               options={{
                  title: "Farms",
                  tabBarIcon: ({ color }) => (
                     <IconSymbol
                        size={28}
                        name="search"
                        color={color}
                     />
                  ),
               }}
            />
            <Tabs.Screen
               name="create"
               options={{
                  title: "Create Farm",
                  tabBarIcon: ({ color }) => (
                     <IconSymbol
                        size={28}
                        name="add"
                        color={color}
                     />
                  ),
               }}
            />
         </Tabs>
      </ApolloProvider>
   );
}
