import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Alert } from 'react-native';
import { Card, Text, Button, IconButton, ActivityIndicator, List } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../src/redux/store';
import { useRouter } from 'expo-router';
import { BACKEND_ROUTES, BACKEND_URL } from '../src/constant';
import Header from '../src/components/Header';
import { logout } from '../src/reducers';

// const tempTask = [
//   { id: '1', title: 'Buy Groceries', description: 'Milk, Eggs, Bread' },
//   { id: '2', title: 'Walk the Dog', description: 'Take the dog for a walk in the park' },
//   { id: '3', title: 'Finish Project', description: 'Complete the React Native app' },
// ];

const HomeScreen = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('login'); // If not authenticated, redirect to login
    } else {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    if (!token) {
      Alert.alert('Error', 'No token available');
      return;
    }
    try {
      const response = await axios.get(BACKEND_URL + BACKEND_ROUTES.TASKS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log({task: response.data});
      
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  const onConfirmDeletetion = (id: string) => {
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
            await handleDeleteTask(id)
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handleDeleteTask = async (id: string) => {
    if (!token) return;

    try {
      await axios.delete(`${BACKEND_URL}${BACKEND_ROUTES.TASKS}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the task list after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(logout());
            router.replace("/login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const emptyContainer = () => {
    return <View style={styles.empty}><Text>There is no task</Text></View>
  }
  if(loading){
    return (
      <ActivityIndicator animating={true} size='small' />
    )
  }

  return (
    <View style={styles.container}>
       <Header title="Task List"/>
       {tasks?.length > 0 ? 
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.title}
              description={item.description}
              left={(props) => <List.Icon {...props} icon="checkbox-marked-circle-outline" />}
              right={(props) => (
                <View style={{
                  flexDirection: 'row'
                }}>
                <IconButton
                  icon="eye"
                  onPress={() => router.push(`/task/${item._id}`)}
                />
                <IconButton
                  icon="delete"
                  iconColor='red'
                  onPress={() => onConfirmDeletetion(item._id)}
                />
                </View>
              )}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> : emptyContainer()}
      <View
        style={styles.addButton}
      >
        <Button
          icon={'plus'}
          mode="contained"
          onPress={() => router.push('/add-task')}
        >
          Add Task
        </Button>
        <Button
          icon={'logout'}
          buttonColor='grey'
          mode="contained"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 15,
  },
  addButton: {
    flex:1,
    flexDirection:'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100,
    gap:10
  },
  empty: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
  }
});

export default HomeScreen;
