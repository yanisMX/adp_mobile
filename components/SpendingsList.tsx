// SpendingsList.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import InputsForm from "./InputsForm";
import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import { fetchCategories } from "@/app/callsAPI";

const categoryColors = [
  "#556B2F",
  "#2C3E50",
  "#6A5ACD",
  "#8B5F65",
  "#708090",
  "#556B2F",
  "#6B4423",
];

export default function SpendingsList({ onListExpand, isListExpanded }) {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "#2e2d2d" : "white";
  const itemBackgroundColor = colorScheme === "dark" ? "#1e1e1e" : "#ffffff";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const categorizedColors = categoriesData.map((category, index) => ({
          ...category,
          color: categoryColors[index % categoryColors.length],
        }));
        // Tri des dépenses de chaque catégorie par date
        categorizedColors.forEach((category) => {
          category.spendings.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });
        setCategories(categorizedColors);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <TouchableOpacity style={styles.arrowContainer} onPress={onListExpand}>
        <Icon
          name={isListExpanded ? "arrow-down" : "arrow-up"}
          size={24}
          color={labelColor}
        />
      </TouchableOpacity>
      <Button
        style={styles.button}
        size="xs"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => setModalVisible(true)}
      >
        <ButtonText>New</ButtonText>
        <ButtonIcon as={AddIcon} />
      </Button>
      {categories.map((category) => (
        <View key={category.id}>
          {category.spendings.map((spending) => (
            <View
              key={spending.id}
              style={[
                styles.spendingItem,
                { backgroundColor: itemBackgroundColor },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.nameAndPriceContainer}>
                  <Text style={[styles.spendingText, { color: labelColor }]}>
                    {spending.name}
                  </Text>
                  <Text style={styles.spendingValue}>
                    - {spending.amount} €
                  </Text>
                </View>
                <View style={styles.dateAndCategoryContainer}>
                  <Text style={[styles.spendingDate, { color: labelColor }]}>
                    {new Date(spending.date).toLocaleDateString()}
                  </Text>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: category.color },
                    ]}
                  >
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <InputsForm onListExpand={undefined} isListExpanded={undefined} />
            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.buttonClose}
              >
                <ButtonText>Fermer</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  spendingItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  nameAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateAndCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  spendingText: {
    fontSize: 16,
  },
  spendingDate: {
    fontSize: 12,
  },
  spendingValue: {
    fontSize: 16,
    color: "#bf1a1a",
  },
  arrowContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
  },
  button: {
    width: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 300,
    backgroundColor: "white",
    height: 600,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 0,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
});
