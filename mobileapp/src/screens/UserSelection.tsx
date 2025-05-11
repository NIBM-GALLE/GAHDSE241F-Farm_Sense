import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const UserSelection = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select User Type</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "Farmer" })}
      >
        <Text style={styles.buttonText}>Farmer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login", { role: "Visit Agent" })}
      >
        <Text style={styles.buttonText}>Visit Agent</Text>
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
    marginBottom: 20
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 10,
    width: 200,
    alignItems: "center",
    borderRadius: 8
  },

  buttonText: {
    color: "white",
    fontSize: 18
  },
});

export default UserSelection;
