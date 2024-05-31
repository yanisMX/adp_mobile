import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

interface TitleComponentProps {
  text: string;
}

export default function TitleComponent({ text }: TitleComponentProps) {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";

  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
