/**
 * Navigation shell -- Ch.11. Rule 11.2.1: tab bar (Home/Profile/Settings)
 * reachable at all times except mid-lesson. Rule 11.2.2: Lesson Player
 * pushes a full-screen, tab-bar-hidden route -- achieved here by nesting
 * the tab navigator as one screen inside the root stack, with
 * LessonPlayer/LessonComplete pushed on top of it (the standard React
 * Navigation idiom for this exact rule).
 *
 * Ch.12: the pre-app flow (Splash -> Onboarding -> Sign Up/Log In) gates
 * the main Tabs stack, using the standard React Navigation "conditional
 * screens" auth pattern -- which screens exist in the Navigator changes
 * based on hasSeenOnboarding/sessionActive, rather than an imperative
 * navigate() call, so there's no back-swipe path from Tabs into Splash.
 */
import React, { useEffect, useState } from "react";
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
import { SplashScreen } from "../screens/SplashScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { LogInScreen } from "../screens/LogInScreen";
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

const SPLASH_MIN_MS = 800; // Ch.12.1's hard minimum display time

export function RootNavigator() {
  const hydrate = useAppStore((s) => s.hydrate);
  const hasSeenOnboarding = useAppStore((s) => s.hasSeenOnboarding);
  const sessionActive = useAppStore((s) => s.sessionActive);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    hydrate(); // Rule 30.4.1 / Rule 31.3.2: run on every app foreground
    const t = setTimeout(() => setSplashDone(true), SPLASH_MIN_MS);
    return () => clearTimeout(t);
  }, [hydrate]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!splashDone ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !hasSeenOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !sessionActive ? (
          <>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="TrackDetail" component={TrackDetailScreen} options={{ headerShown: true, title: "" }} />
            <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="LessonComplete" component={LessonCompleteScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="CharacterProfile" component={CharacterProfileScreen} options={{ headerShown: true, title: "" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
