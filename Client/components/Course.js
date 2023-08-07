import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';

const CourseScreen = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isAddCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const [isEditCourseModalVisible, setEditCourseModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    // Fetch courses from backend
    axios.get(`${BASE_URL}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch students from backend
    axios.get(`${BASE_URL}/students`)
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setNewCourseName(course.name); // Set initial value for name
    setSelectedStudents(course.Students); // Set initial value for selected students
    setEditCourseModalVisible(true);
  };

  const handleCourseAdded = () => {
    // Reload courses after adding
    axios.get(`${BASE_URL}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
    setAddCourseModalVisible(false);
    setNewCourseName('');
    setSelectedStudents([]);
  };

  const handleCourseUpdated = () => {
    // Reload courses after updating
    axios.get(`${BASE_URL}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
    setEditCourseModalVisible(false);
    setSelectedCourse(null);
  };

  const handleCloseModals = () => {
    setAddCourseModalVisible(false);
    setEditCourseModalVisible(false);
    setSelectedCourse(null);
  };

  const handleAddCourse = () => {
    if (newCourseName && selectedStudents.length > 0) {
      // Send data to backend
      axios.post(`${BASE_URL}/courses`, { name: newCourseName, studentIds: selectedStudents.map(student => student.id) })
        .then(response => {
          console.log('Course added:', response.data);
          handleCourseAdded();
        })
        .catch(error => console.error('Error adding course:', error));
    }
  };

  const handleUpdateCourse = () => {
    if (selectedCourse && newCourseName && selectedStudents.length > 0) {
      // Send data to backend
      axios.put(`${BASE_URL}/courses/${selectedCourse.id}`, { name: newCourseName, studentIds: selectedStudents.map(student => student.id) })
        .then(response => {
          console.log('Course updated:', response.data);
          handleCourseUpdated();
        })
        .catch(error => console.error('Error updating course:', error));
    }
  };

  const handleToggleStudent = (student) => {
    const isSelected = selectedStudents.some(s => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.Students.length}</Text>
     
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditCourse(item)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddCourseButtonPress = () => {
    setNewCourseName('');
    setSelectedStudents([]);
    setAddCourseModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.centerText]}>Course Name</Text>
        <Text style={[styles.headerCell, styles.centerText]}>Student Count</Text>
     
        <Text style={styles.headerCell}></Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.table}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCourseButtonPress}
      >
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </View>
      </TouchableOpacity>


      {/* Add Course Modal */}
      <Modal visible={isAddCourseModalVisible} animationType="slide" onRequestClose={handleCloseModals}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={newCourseName}
            onChangeText={text => setNewCourseName(text)}
          />
          <Text style={styles.label}>Select Students:</Text>
          <FlatList
            data={students}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.studentCheckbox, selectedStudents.some(s => s.id === item.id) && styles.studentSelected]}
                onPress={() => handleToggleStudent(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Add Course" onPress={handleAddCourse} />
          <Button title="Cancel" onPress={handleCloseModals} color="red" />
        </View>
      </Modal>

      {/* Edit Course Modal */}
      {selectedCourse && (
        <Modal visible={isEditCourseModalVisible} animationType="slide" onRequestClose={handleCloseModals}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={newCourseName}
              onChangeText={text => setNewCourseName(text)}
            />
            <Text style={styles.label}>Select Students:</Text>
            <FlatList
              data={students}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.studentCheckbox, selectedStudents.some(s => s.id === item.id) && styles.studentSelected]}
                  onPress={() => handleToggleStudent(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Update Course" onPress={handleUpdateCourse} />
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
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
  studentNames: {
    flex: 2,
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
  studentCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentSelected: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
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

export default CourseScreen;
