// navigators/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import StudentsScreen from '../components/Student';
import AddStudentScreen from '../components/addStudent';
// import EditStudentScreen from '../components/editStudent';
// import CourseScreen from '../components/Course';
// import AddCourseScreen from '../components/addCourse';
// import EditCourseScreen from '../components/editCourse';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Students" component={StudentsScreen} />
          <Tab.Screen name="AddStudent" component={AddStudentScreen} />
          {/* <Tab.Screen name="EditStudent" component={EditStudentScreen} /> */}
          {/* <Tab.Screen name="Courses" component={CourseScreen} /> */}
          {/* <Tab.Screen name="AddCourse" component={AddCourseScreen} />
          <Tab.Screen name="EditCourse" component={EditCourseScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MainNavigator;
