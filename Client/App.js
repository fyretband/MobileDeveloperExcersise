import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StudentsScreen from './components/Student'; 
import CourseScreen from "./components/Course";


const Tab = createBottomTabNavigator();






function App() {
  return (
   
   <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Student") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Course") {
              iconName = focused ? "book" : "book-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? "blue" : "gray"}
              />
            );
          },
        })}
        tabOptions={{
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            display: "flex",
          },
        }}
      >
        <Tab.Screen name="Student" component={StudentsScreen} />
        <Tab.Screen name="Course" component={CourseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  
  );
}

export default App;
