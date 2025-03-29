import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useQuery } from '@apollo/client';
import { GET_ALL_FARMS } from '@/scripts/graphql/queries';
import { Farm } from '@/constants/types';
import Collapsible from '@/components/Collapsible';
import { Link } from 'expo-router';

const HomeScreen = () => {
  const { data, loading, error } = useQuery(GET_ALL_FARMS);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default location or get from user
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Update region when farms load (use first farm as center for demo)
  useEffect(() => {
    if (data?.getAllFarms?.length > 0) {
      const firstFarm = data.getAllFarms[0];
      setRegion({
        latitude: firstFarm.latitude,
        longitude: firstFarm.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const farms = data?.getAllFarms || [];

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {farms.map((farm: Farm) => (
          <Marker
            key={farm.id}
            coordinate={{ latitude: farm.latitude, longitude: farm.longitude }}
            onPress={() => setSelectedFarm(farm)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>📍</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Selected Farm Card */}
      {selectedFarm && (
        <View style={styles.farmCard}>
          <Text style={styles.farmName}>{selectedFarm.farmName}</Text>
          <Text>{selectedFarm.address}</Text>
          <Text>Rating: {selectedFarm.ratings} ⭐</Text>
          <Link href={`/farmDetails?id=${selectedFarm.id}`} asChild>
            <Pressable style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </Pressable>
          </Link>
        </View>
      )}

      {/* Collapsible Farm List */}
      <Collapsible 
        title="Nearby Farms" 
        collapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      >
        <ScrollView style={styles.farmList}>
          {farms.map((farm: Farm) => (
            <Pressable 
              key={farm.id} 
              style={styles.listItem}
              onPress={() => {
                setSelectedFarm(farm);
                setRegion({
                  latitude: farm.latitude,
                  longitude: farm.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }}
            >
              {/* <Image 
                source={{ uri: farm.pictures[0] }} 
                style={styles.listImage} 
              /> */}
              <View style={styles.listTextContainer}>
                <Text style={styles.listFarmName}>{farm.farmName}</Text>
                <Text style={styles.listAddress}>{farm.address}</Text>
                <Text style={styles.listRating}>⭐ {farm.ratings}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '60%',
  },
  marker: {
    padding: 5,
  },
  markerText: {
    fontSize: 24,
  },
  farmCard: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  farmName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  farmList: {
    maxHeight: Dimensions.get('window').height * 0.4,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  listTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listFarmName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  listAddress: {
    color: '#666',
    fontSize: 14,
  },
  listRating: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
});

export default HomeScreen;