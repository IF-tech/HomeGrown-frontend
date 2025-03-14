// app/(tabs)/create.tsx
import React from "react";
import { View, ScrollView, Text } from "react-native"; // Import Text here
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native-paper";
import { CREATE_FARM } from "@/scripts/graphql/mutations";
import { useRouter } from "expo-router";

const CreateFarmScreen = () => {
   const router = useRouter();
   const [createFarm] = useMutation(CREATE_FARM, {
      onCompleted: () => router.push("/(tabs)"), // Navigate back to the home tab after creation
   });

   const initialValues = {
      farmName: "",
      ownerName: "",
      address: "",
      latitude: "",
      longitude: "",
      description: "",
      ratings: "",
      tags: "",
      pictures: "",
      products: [],
   };

   const validationSchema = Yup.object().shape({
      farmName: Yup.string().required("Farm name is required"),
      ownerName: Yup.string().required("Owner name is required"),
      address: Yup.string().required("Address is required"),
      latitude: Yup.number().required("Latitude is required"),
      longitude: Yup.number().required("Longitude is required"),
   });

   return (
      <ScrollView>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
               createFarm({ variables: { input: values } });
            }}
         >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               values,
               errors,
               touched,
            }) => (
               <View style={{ padding: 16 }}>
                  <TextInput
                     label="Farm Name"
                     value={values.farmName}
                     onChangeText={handleChange("farmName")}
                     onBlur={handleBlur("farmName")}
                     style={{ marginBottom: 16 }}
                  />
                  {touched.farmName && errors.farmName && (
                     <Text style={{ color: "red" }}>{errors.farmName}</Text>
                  )}

                  <TextInput
                     label="Owner Name"
                     value={values.ownerName}
                     onChangeText={handleChange("ownerName")}
                     onBlur={handleBlur("ownerName")}
                     style={{ marginBottom: 16 }}
                  />
                  {touched.ownerName && errors.ownerName && (
                     <Text style={{ color: "red" }}>{errors.ownerName}</Text>
                  )}

                  <TextInput
                     label="Address"
                     value={values.address}
                     onChangeText={handleChange("address")}
                     onBlur={handleBlur("address")}
                     style={{ marginBottom: 16 }}
                  />
                  {touched.address && errors.address && (
                     <Text style={{ color: "red" }}>{errors.address}</Text>
                  )}

                  <TextInput
                     label="Latitude"
                     value={values.latitude}
                     onChangeText={handleChange("latitude")}
                     onBlur={handleBlur("latitude")}
                     keyboardType="numeric"
                     style={{ marginBottom: 16 }}
                  />
                  {touched.latitude && errors.latitude && (
                     <Text style={{ color: "red" }}>{errors.latitude}</Text>
                  )}

                  <TextInput
                     label="Longitude"
                     value={values.longitude}
                     onChangeText={handleChange("longitude")}
                     onBlur={handleBlur("longitude")}
                     keyboardType="numeric"
                     style={{ marginBottom: 16 }}
                  />
                  {touched.longitude && errors.longitude && (
                     <Text style={{ color: "red" }}>{errors.longitude}</Text>
                  )}

                  <Button
                     mode="contained"
                     onPress={() => handleSubmit()} // Wrap handleSubmit in a function
                     style={{ marginTop: 16 }}
                  >
                     Create Farm
                  </Button>
               </View>
            )}
         </Formik>
      </ScrollView>
   );
};

export default CreateFarmScreen;
