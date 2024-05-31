// MyChart.js
import React, { useState, useEffect } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Text } from "@gluestack-ui/themed";
import { fetchCategories } from "@/app/callsAPI";

export default function MyChart() {
  const colorScheme = useColorScheme();
  const labelColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchData();
  }, []);

  // Utiliser totalSpending de chaque catégorie pour les valeurs
  const pieData = categories.map((category) => ({
    x: category.name,
    y: category.totalSpending,
  }));

  const total = pieData.reduce((sum, category) => sum + category.y, 0);

  const pieDataWithPercentages = pieData.map((item) => ({
    ...item,
    percentage: ((item.y / total) * 100).toFixed(2),
  }));

  const colorScale = [
    "#556B2F",
    "#2C3E50",
    "#6A5ACD",
    "#8B5F65",
    "#708090",
    "#556B2F",
    "#6B4423",
  ];

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <VictoryPie
        innerRadius={100}
        data={pieDataWithPercentages}
        colorScale={colorScale}
        labels={({ datum }) => `${datum.percentage}%`}
        labelComponent={
          <VictoryLabel
            angle={({ datum }) => {
              const angle =
                datum.startAngle + (datum.endAngle - datum.startAngle) / 2;
              if (
                (120 < angle && angle < 180) ||
                (0 < angle && angle < 60) ||
                (240 < angle && angle < 300)
              ) {
                return angle;
              } else {
                return angle + 180;
              }
            }}
            textAnchor="middle"
            style={{ fill: "white", fontSize: 10, fontWeight: "bold" }}
            dy={({ datum }) => {
              const angle =
                datum.startAngle + (datum.endAngle - datum.startAngle) / 2;
              if (
                (120 < angle && angle < 180) ||
                (0 < angle && angle < 60) ||
                (240 < angle && angle < 300)
              ) {
                return 50;
              } else {
                return -50;
              }
            }}
          />
        }
      />
      <View style={styles.legend}>
        {pieDataWithPercentages.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: colorScale[index % colorScale.length] },
              ]}
            />
            <Text style={[styles.legendText, { color: labelColor }]}>
              {item.x} - {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
  },
});
