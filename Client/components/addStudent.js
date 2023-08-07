import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const AddStudentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleAddStudent = () => {
    if (name && dob) {
      // Send data to backend
      axios.post(`${BASE_URL}/students`, { name, dob })
        .then(response => {
          console.log('Student added:', response.data);
          navigation.goBack();
        })
        .catch(error => console.error('Error adding student:', error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>Date of Birth (DOB):</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={text => setDob(text)}
      />
      <Button
        title="Add Student"
        onPress={handleAddStudent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default AddStudentScreen;
