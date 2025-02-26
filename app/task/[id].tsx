import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button} from 'react-native-paper'
import { BACKEND_ROUTES, BACKEND_URL } from '../../src/constant';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../../src/components/Header';

// interface TaskDetailsProps {
//   id: string;
// }

const TaskDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTask = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setLoading(true);
        try {
          const response = await axios.get(`${BACKEND_URL}${BACKEND_ROUTES.TASKS}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTask(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching task:', err);
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdateTask = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoading(true);
      try {
        const response = await axios.put(
          `${BACKEND_URL}${BACKEND_ROUTES.TASKS}/${id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTask(response.data);
        setIsEditing(false);
        setLoading(false);
      } catch (err) {
        console.error('Error updating task:', err);
        setLoading(false);
      }
    }
  };


  const onConfirmDeletion = () => {
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete it?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Deletion canceled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await handleDeleteTask()
            },
          },
        ],
        { cancelable: false }
      );
    };

  const handleDeleteTask = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoading(true);
      try {
        await axios.delete(`${BACKEND_URL}${BACKEND_ROUTES.TASKS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        router.replace('/home')
      } catch (err) {
        console.error('Error deleting task:', err);
        setLoading(false);
      }
    }
  };

  return (
    <>
       <Header title={title}/>
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
            editable={isEditing}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            editable={isEditing}
          />
          <Button
            mode="contained"
            onPress={handleUpdateTask}
            style={styles.button}
            disabled={!isEditing || loading}
          >
            Save Changes
          </Button>
          <Button
            mode="outlined"
            onPress={() => setIsEditing(true)}
            style={styles.button}
          >
            Edit Task
          </Button>
          <Button
            mode="contained"
            onPress={onConfirmDeletion}
            style={[styles.button, styles.deleteButton]}
          >
            Delete Task
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
    paddingBottom: 10,
    marginBottom:10
  },
  button: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default TaskDetailsScreen;
