import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FarmerHome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>
      <Text style={styles.text}>Welcome, Farmer! Monitor your crops and detect diseases here.</Text>

      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DiseasePrediction")}
      >
        <Text style={styles.buttonText}>Start Disease Prediction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}>
        <Text style={styles.buttonText}>Profile Details</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20
  },

  button: {
    backgroundColor: "#3D8D7A",
    padding: 15,
    width: 200,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10
  },

  buttonText: {
    color: "white",
    fontSize: 18
  },
});

export default FarmerHome;
