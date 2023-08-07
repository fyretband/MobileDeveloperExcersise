import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const StudentsScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from backend
    axios.get(`${BASE_URL}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleEditStudent = (student) => {
    navigation.navigate('EditStudent', { student });
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.dob}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditStudent(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.table}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddStudent')}
      >
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
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
});

export default StudentsScreen;
