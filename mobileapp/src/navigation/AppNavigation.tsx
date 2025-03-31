import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from "../screens/SplashScreen";
import UserSelection from "../screens/UserSelection";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FarmerHome from "../screens/HomePages/FarmerHome";
import AgentHome from "../screens/HomePages/VisitAgentHome";





const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="UserSelection" component={UserSelection} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="FarmerHome" component={FarmerHome} />
        <Stack.Screen name="AgentHome" component={AgentHome} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
