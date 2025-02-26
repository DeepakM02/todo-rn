import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TextInput, Button} from 'react-native-paper';
import { BACKEND_ROUTES, BACKEND_URL } from '../src/constant';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';

const AddTaskScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const handleAddTask = async () => {
    if (!title || !description) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          BACKEND_URL + BACKEND_ROUTES.TASKS,
          { title, description, completed: false },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLoading(false);
        router.replace("/home")
        // Navigate back to Home screen after adding task
      } catch (err) {
        console.error('Error adding task:', err);
        setLoading(false);
      }
    }
  };

  return (
    <>
    <Header title='Add Task'/>
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddTask}
            style={styles.button}
            disabled={loading}
          >
            Add Task
          </Button>
        </>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddTaskScreen;
