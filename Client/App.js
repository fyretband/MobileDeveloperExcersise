import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentsScreen from './components/Student';
import AddStudentScreen from './components/addStudent'; // Import AddStudentScreen

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Students" component={StudentsScreen} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} /> {/* Add this line */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
