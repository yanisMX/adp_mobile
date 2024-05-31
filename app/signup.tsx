import React from "react";
import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import TitleComponent from "@/components/TitleComponent";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Tabs } from "expo-router";
import SignupForm from "@/components/SignUpForm";

export default function SignupScreen() {
  type RootStackParamList = {
    Home: undefined;
    Account: undefined;
    Signup: undefined;
  };
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >
        <Tabs.Screen options={{ headerTitle: "signup", headerShown: false }} />
        <TitleComponent text="COMPTE" />
        <SignupForm />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
