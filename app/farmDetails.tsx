import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_FARM_BY_ID } from "@/scripts/graphql/queries";
import { Farm } from "@/constants/types"



const FarmDetailsScreen = () => {
   const { id } = useLocalSearchParams<{ id: string }>();
   const { data, loading, error } = useQuery(GET_FARM_BY_ID, {
      variables: { id },
   });

   if (loading) return <Text>Loading...</Text>;
   if (error) return <Text>Error: {error.message}</Text>;
   if (!data?.getFarm) return <Text>Farm not found</Text>;

   const farm: Farm = data.getFarm;

   // Ensure products is an array
   const products = farm.products || [];

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <Image source={{ uri: farm.pictures[0] }} style={styles.image} />
         <Text style={styles.farmName}>{farm.farmName}</Text>
         <Text style={styles.ownerName}>Owner: {farm.ownerName}</Text>
         <Text style={styles.address}>{farm.address}</Text>
         <Text style={styles.ratings}>Rating: {farm.ratings} ⭐</Text>
         <Text style={styles.description}>{farm.description}</Text>

         <Text style={styles.sectionTitle}>Products</Text>
         {products.length > 0 ? (
            products.map((product) => (
               <View key={product.id} style={styles.productCard}>
                  <Image
                     source={{ uri: product.pictures[0] }}
                     style={styles.productImage}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>Price: ${product.price}</Text>
                  <Text style={styles.productAvailability}>
                     {product.availability ? "Available" : "Out of Stock"}
                  </Text>
               </View>
            ))
         ) : (
            <Text style={styles.noProductsText}>No products available.</Text>
         )}

         <Text style={styles.sectionTitle}>Comments</Text>
         {/* Add a comments section here */}
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      padding: 16,
   },
   image: {
      width: 350,
      height: 200,
      borderRadius: 8,
      marginBottom: 16,
   },
   farmName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
   },
   ownerName: {
      fontSize: 16,
      color: "#666",
      marginBottom: 8,
   },
   address: {
      fontSize: 16,
      color: "#666",
      marginBottom: 8,
   },
   ratings: {
      fontSize: 16,
      color: "#ffa500",
      fontWeight: "bold",
      marginBottom: 16,
   },
   description: {
      fontSize: 16,
      marginBottom: 24,
   },
   sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
   },
   productCard: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   productImage: {
      width: 300,
      height: 150,
      borderRadius: 8,
      marginBottom: 8,
   },
   productName: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
   },
   productPrice: {
      fontSize: 16,
      color: "#666",
      marginBottom: 4,
   },
   productAvailability: {
      fontSize: 16,
      color: "#666",
   },
   noProductsText: {
      fontSize: 16,
      color: "#999",
      textAlign: "center",
      marginTop: 16,
   },
});

export default FarmDetailsScreen; 
