// // screens/EditStudentScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import axios from 'axios'
// const EditStudentScreen = ({ route, navigation }) => {
//   const { student } = route.params;
//   const [name, setName] = useState(student.name);
//   const [dob, setDob] = useState(student.dob);

//   const handleSaveStudent = () => {
//     const updatedStudent = {
//       id: student.id,
//       name: name,
//       dob: dob,
//     };

//     axios.put(`http://localhost:3000/students/${student.id}`, updatedStudent)
//       .then(response => {
//         // Handle success
//         navigation.goBack();
//       })
//       .catch(error => {
//         console.error('Error updating student:', error);
//       });
//   };

//   return (
//     <View>
//       <Text>Edit Student</Text>
//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={text => setName(text)}
//       />
//       <TextInput
//         placeholder="Date of Birth (YYYY-MM-DD)"
//         value={dob}
//         onChangeText={text => setDob(text)}
//       />
//       <Button title="Save" onPress={handleSaveStudent} />
//     </View>
//   );
// };

// export default EditStudentScreen;
