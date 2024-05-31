import React, { useEffect, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addSpending, fetchCategories } from "@/app/callsAPI";

export default function InputsForm() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [recurrent, setRecurrent] = useState(false);

  const handleCategoryChange = (itemValue: any, itemIndex: any) => {
    setSelectedCategory(itemValue);
  };

  const handleAddSpending = async () => {
    try {
      await addSpending(selectedCategory, amount, name, recurrent);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'ajout de la dépense:",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <VStack style={styles.container}>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="Montant"
          value={amount}
          onChangeText={(value) => setAmount(value)}
          keyboardType="numeric"
        />
      </Input>

      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        style={styles.input}
      >
        <InputField
          placeholder="Nom de la dépense"
          value={name}
          onChangeText={setName}
        />
      </Input>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
        style={styles.picker}
      >
        {categories.map((category: { id: string; name: string }) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id}
          />
        ))}
      </Picker>

      <Checkbox
        aria-label="boolRec"
        size="md"
        isInvalid={false}
        isDisabled={false}
        value={false}
        onChange={() => setRecurrent(!recurrent)}
      >
        <CheckboxIndicator mr="$2">
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>Récurent ?</CheckboxLabel>
      </Checkbox>

      <View style={styles.buttonContainer}>
        <Button aria-label="Add" onPress={handleAddSpending}>
          <ButtonText>Ajouter</ButtonText>
        </Button>
      </View>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderColor: "#ccc",
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    paddingVertical: 10,
    width: 150,
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
  },
  picker: {
    width: 200,
  },
});
