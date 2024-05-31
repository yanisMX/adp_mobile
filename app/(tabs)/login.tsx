import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleComponent from "@/components/TitleComponent";
import LoginForm from "@/components/LoginForm";
import { Tabs } from "expo-router";
import { Button, ButtonText } from "@gluestack-ui/themed";

export default function LoginScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const cookies = await AsyncStorage.getItem("cookies");
    setIsLoggedIn(!!cookies);
  };
  const handleSubmit = async () => {
    try {
      AsyncStorage.removeItem("cookies");
      Alert.alert("Succès", "cookies supp !");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se connecter au serveur");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text>Test</Text>
          <Button onPress={handleSubmit} style={styles.button}>
            <ButtonText>Se déconnecter</ButtonText>
          </Button>
        </>
      ) : (
        <>
          <Tabs.Screen options={{ headerTitle: "Login", headerShown: false }} />
          <TitleComponent text="COMPTE" />
          <LoginForm />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
  },
});
