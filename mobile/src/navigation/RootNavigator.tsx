/**
 * Navigation shell -- Ch.11. Rule 11.2.1: tab bar (Home/Profile/Settings)
 * reachable at all times except mid-lesson. Rule 11.2.2: Lesson Player
 * pushes a full-screen, tab-bar-hidden route -- achieved here by nesting
 * the tab navigator as one screen inside the root stack, with
 * LessonPlayer/LessonComplete pushed on top of it (the standard React
 * Navigation idiom for this exact rule).
 */
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { color } from "../design/tokens";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { TrackDetailScreen } from "../screens/TrackDetailScreen";
import { LessonPlayerScreen } from "../screens/LessonPlayerScreen";
import { LessonCompleteScreen } from "../screens/LessonCompleteScreen";
import { CharacterProfileScreen } from "../screens/CharacterProfileScreen";
import { useAppStore } from "../state/useAppStore";
import type { RootStackParamList, TabParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.text.onLight.primary,
        tabBarInactiveTintColor: color.text.onLight.secondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <TabIcon emoji="🏠" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <TabIcon emoji="🏅" /> }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: () => <TabIcon emoji="⚙️" /> }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const hydrate = useAppStore((s) => s.hydrate);

  useEffect(() => {
    hydrate(); // Rule 30.4.1 / Rule 31.3.2: run on every app foreground
  }, [hydrate]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="TrackDetail" component={TrackDetailScreen} options={{ headerShown: true, title: "" }} />
        <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="LessonComplete" component={LessonCompleteScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CharacterProfile" component={CharacterProfileScreen} options={{ headerShown: true, title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
