// // screens/EditCourseScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList } from 'react-native';
// import { Checkbox } from 'react-native-paper';

// const EditCourseScreen = ({ route, navigation }) => {
//   const { course } = route.params;
//   const [courseName, setCourseName] = useState(course.name);
//   const [students, setStudents] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   useEffect(() => {
//     // Fetch students from backend
//     axios.get('http://localhost:3000/students')
//       .then(response => setStudents(response.data))
//       .catch(error => console.error('Error fetching students:', error));

//     // Set selected students based on course's students
//     setSelectedStudents(course.students);
//   }, []);

//   const handleSaveCourse = () => {
//     const studentIds = selectedStudents.map(student => student.id);

//     const updatedCourse = {
//       id: course.id,
//       name: courseName,
//       studentIds: studentIds,
//     };

//     axios.put(`http://localhost:3000/courses/${course.id}`, updatedCourse)
//       .then(response => {
//         // Handle success
//         navigation.goBack();
//       })
//       .catch(error => {
//         console.error('Error updating course:', error);
//       });
//   };

//   const toggleStudentSelection = (student) => {
//     const isSelected = selectedStudents.includes(student);
//     if (isSelected) {
//       setSelectedStudents(selectedStudents.filter(s => s !== student));
//     } else {
//       setSelectedStudents([...selectedStudents, student]);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <Checkbox
//         status={selectedStudents.includes(item) ? 'checked' : 'unchecked'}
//         onPress={() => toggleStudentSelection(item)}
//       />
//       <Text>{item.name}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <Text>Edit Course</Text>
//       <TextInput
//         placeholder="Course Name"
//         value={courseName}
//         onChangeText={text => setCourseName(text)}
//       />
//       <FlatList
//         data={students}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//       <Button title="Save" onPress={handleSaveCourse} />
//     </View>
//   );
// };

// export default EditCourseScreen;
