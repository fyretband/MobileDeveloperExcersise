import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';

const StudentsScreen = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [isAddStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [isEditStudentModalVisible, setEditStudentModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDob, setNewStudentDob] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('');

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const dobDate = new Date(dob);
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    if (currentDate.getMonth() < dobDate.getMonth() || (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())) {
      return age - 1;
    }

    return age;
  };

  useEffect(() => {
    // Fetch students from backend
    axios.get(`${BASE_URL}/students`)
      .then(response => {
        const studentsWithAge = response.data.map(student => ({
          ...student,
          age: calculateAge(student.dob),
        }));
        setStudents(studentsWithAge);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  useEffect(() => {
    if (newStudentDob) {
      // Calculate age based on DOB
      const dob = new Date(newStudentDob);
      const currentDate = new Date();
      const age = calculateAge(newStudentDob);
      setNewStudentAge(age.toString());
    }
  }, [newStudentDob]);

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setNewStudentName(student.name);
    setNewStudentDob(student.dob);
    setEditStudentModalVisible(true);
  };

  const handleStudentAdded = () => {
    // Reload students after adding
    axios.get(`${BASE_URL}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
    setAddStudentModalVisible(false);
    setNewStudentName('');
    setNewStudentDob('');
    setNewStudentAge('');
  };

  const handleStudentUpdated = () => {
    // Reload students after updating
    axios.get(`${BASE_URL}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
    setEditStudentModalVisible(false);
    setSelectedStudent(null);
  };

  const handleCloseModals = () => {
    setAddStudentModalVisible(false);
    setEditStudentModalVisible(false);
    setSelectedStudent(null);
  };

  const handleAddStudent = () => {
    if (newStudentName && newStudentDob && newStudentAge) {
      // Send data to backend
      axios.post(`${BASE_URL}/students`, { name: newStudentName, dob: newStudentDob })
        .then(response => {
          console.log('Student added:', response.data);
          handleStudentAdded();
        })
        .catch(error => console.error('Error adding student:', error));
    }
  };

  const handleUpdateStudent = () => {
    if (selectedStudent && newStudentName && newStudentDob && newStudentAge) {
      // Send data to backend
      axios.put(`${BASE_URL}/students/${selectedStudent.id}`, { name: newStudentName, dob: newStudentDob })
        .then(response => {
          console.log('Student updated:', response.data);
          handleStudentUpdated();
        })
        .catch(error => console.error('Error updating student:', error));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.age}</Text>
      <Text style={styles.tableCell}>{item.dob}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditStudent(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddStudentButtonPress = () => {
    setNewStudentName('');
    setNewStudentDob('');
    setNewStudentAge('');
    setAddStudentModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.centerText]}>Student Name</Text>
        <Text style={[styles.headerCell, styles.centerText]}>Age</Text>
        <Text style={[styles.headerCell, styles.centerText]}>Date Of Birth</Text>
        <Text style={styles.headerCell}></Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.table}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddStudentButtonPress}
      >
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </View>
      </TouchableOpacity>
      {/* Add Student Modal */}
      <Modal visible={isAddStudentModalVisible} animationType="slide" onRequestClose={handleCloseModals}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={newStudentName}
            onChangeText={text => setNewStudentName(text)}
          />
          <Text style={styles.label}>Date of Birth (DOB):</Text>
          <TextInput
            style={styles.input}
            value={newStudentDob}
            onChangeText={text => setNewStudentDob(text)}
            placeholder="YYYY-MM-DD"
          />
          <Button title="Add Student" onPress={handleAddStudent} />
          <Button title="Cancel" onPress={handleCloseModals} color="red" />
        </View>
      </Modal>
      {/* Edit Student Modal */}
      {selectedStudent && (
        <Modal visible={isEditStudentModalVisible} animationType="slide" onRequestClose={handleCloseModals}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={newStudentName}
              onChangeText={text => setNewStudentName(text)}
            />
            <Text style={styles.label}>Date of Birth (DOB):</Text>
            <TextInput
              style={styles.input}
              value={newStudentDob}
              onChangeText={text => setNewStudentDob(text)}
              placeholder="YYYY-MM-DD"
            />
            <Button title="Update Student" onPress={handleUpdateStudent} />
            <Button title="Cancel" onPress={handleCloseModals} color="red" />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  centerText: {
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
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
  plusButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StudentsScreen;
