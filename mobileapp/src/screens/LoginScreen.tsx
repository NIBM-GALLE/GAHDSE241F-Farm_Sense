import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const LoginScreen = ({ navigation, route }: any) => {

  /*const onPressLogin = async (email: string, password: string) => {
    Alert.alert("Login", `Email: ${email}, Password: ${password}`);
  }*/


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = route?.params?.role || "User";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{role} Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (role === "Farmer") {
            navigation.replace("FarmerHome");
          } else {
            navigation.replace("AgentHome");
          }
        }}
        // onPress={() => {
        //   onPressLogin(email, password)
        
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.text}>
          Don't have an account?<Text style={styles.link}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    width: 200,
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },

  text: {
    marginTop: 10,
    color: "#333",
  },

  link: {
    marginTop: 10,
    color: "#007BFF",
  },
});

export default LoginScreen;
