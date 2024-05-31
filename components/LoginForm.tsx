import React, { useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import {
  Box,
  Center,
  Heading,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://adpapi.loca.lt/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 200) {
        const cookies = response.headers.get("Set-Cookie");
        await AsyncStorage.setItem("cookies", cookies || "");
        Alert.alert("Succès", "Connexion réussie !");
      } else {
        Alert.alert("Erreur", "Échec de la connexion");
        console.error("Échec de la connexion:", response.status);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se connecter au serveur");
    }
  };

  type RootStackParamList = {
    Home: undefined;
    Account: undefined;
    Signup: undefined;
  };

  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Box style={styles.box}>
      <Center>
        <Heading style={styles.heading}>Se connecter</Heading>
        <VStack style={styles.vStack}>
          <Text style={styles.text}>Email</Text>
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={styles.input}
          >
            <InputField
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              style={styles.inputField}
              color="white"
            />
          </Input>
        </VStack>
        <VStack style={styles.vStack}>
          <Text style={styles.text}>Mot de passe</Text>
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            style={styles.input}
          >
            <InputField
              placeholder="Mot de passe"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry
              style={styles.inputField}
              color="white"
            />
          </Input>
        </VStack>
        <Link style={styles.signupText} href={`/signup`}>
          Pas de compte ? Créez en un !
        </Link>
        <Button onPress={handleSubmit} style={styles.button}>
          <ButtonText>Se connecter</ButtonText>
        </Button>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  vStack: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 18,
    width: "100%",
  },
  inputField: {
    height: 50,
    fontSize: 18,
  },
  signupText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007bff",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
  },
});
