// api.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://adpapi.loca.lt";

export const fetchCategories = async () => {
  try {
    const cookie = await AsyncStorage.getItem("cookies");

    if (cookie) {
      let date = new Date().toISOString().split("T")[0];
      const response = await fetch(`${API_BASE_URL}/budget?date=${date}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(
          `Erreur lors de la récupération des catégories: ${response.status}`
        );
      }
    } else {
      throw new Error("Cookie non trouvé dans AsyncStorage");
    }
  } catch (error) {
    throw error;
  }
};

export const addSpending = async (
  selectedCategory: any,
  amount: any,
  name: any,
  recurrent: any
) => {
  try {
    const cookie = await AsyncStorage.getItem("cookies");

    if (cookie && selectedCategory) {
      const response = await fetch(
        `${API_BASE_URL}/budget/category/${selectedCategory}/spending`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            name,
            recurrent,
          }),
        }
      );

      if (response.ok) {
        console.log("Dépense ajoutée avec succès");
      } else {
        throw new Error(
          `Erreur lors de l'ajout de la dépense: ${response.status}`
        );
      }
    } else {
      throw new Error(
        "Cookie non trouvé dans AsyncStorage ou catégorie non sélectionnée"
      );
    }
  } catch (error) {
    throw error;
  }
};
