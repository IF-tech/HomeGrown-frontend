// app/(tabs)/farmList.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_FARMS } from "@/scripts/graphql/queries";

type Farm = {
  id: string;
  farmName: string;
  ownerName: string;
  address: string;
  latitude: number;
  longitude: number;
  pictures: string[];
  description: string;
  tags: string[];
  ratings: number;
  products: {
    id: string;
    name: string;
    availability: boolean;
    quantity: number;
    price: number;
    pictures: string[];
  }[];
};

const FarmListScreen = () => {
  const { data, loading, error } = useQuery(GET_ALL_FARMS);
  const [numColumns, setNumColumns] = useState(1); // Default to 1 column
  const [key, setKey] = useState(0); // Key to force re-render

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = Dimensions.get("window").width;
      let columns = 1; // Default for mobile
      if (screenWidth >= 768 && screenWidth < 1024) {
        columns = 2; // Tablet
      } else if (screenWidth >= 1024) {
        columns = 3; // Desktop
      }
      if (columns !== numColumns) {
        setNumColumns(columns);
        setKey((prevKey) => prevKey + 1); // Change the key to force re-render
      }
    };

    // Update columns on initial render and screen resize
    updateColumns();
    const subscription = Dimensions.addEventListener("change", updateColumns);

    // Cleanup listener on unmount
    return () => {
      subscription?.remove();
    };
  }, [numColumns]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Calculate card width based on the number of columns and container padding
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 32 - (numColumns - 1) * 16) / numColumns;

  const renderFarmCard = ({ item }: { item: Farm }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.pictures[0] }} style={styles.image} />
      <Text style={styles.farmName}>{item.farmName}</Text>
      <Text style={styles.ownerName}>Owner: {item.ownerName}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.ratings}>Rating: {item.ratings} ⭐</Text>
    </View>
  );

  return (
    <FlatList
      key={key} // Force re-render when key changes
      data={data?.getAllFarms || []}
      keyExtractor={(item) => item.id}
      renderItem={renderFarmCard}
      numColumns={numColumns} // Set the number of columns dynamically
      contentContainerStyle={styles.container}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null} // Add spacing between columns
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center", // Center cards horizontally
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 350
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  farmName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ratings: {
    fontSize: 14,
    color: "#ffa500",
    fontWeight: "bold",
  },
  columnWrapper: {
    justifyContent: "space-between", // Add spacing between columns
  },
});

export default FarmListScreen;