// screens/CourseScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios'
const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:3000/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEditCourse = (course) => {
    navigation.navigate('EditCourse', { course });
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>Student Count: {item.students.length}</Text>
      <IconButton icon="pencil" onPress={() => handleEditCourse(item)} />
    </View>
  );

  return (
    <View>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Add Course"
        onPress={() => navigation.navigate('AddCourse')}
      />
    </View>
  );
};

export default CourseScreen;
