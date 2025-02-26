import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../src/reducers'; // Import the login action
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { BACKEND_ROUTES, BACKEND_URL } from '../src/constant';
import Header from '../src/components/Header';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(BACKEND_URL + BACKEND_ROUTES.LOGIN, { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      alert('Logged in successfully!');
      dispatch(login({ token, user }));
      router.replace('home');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the sign up screen
  };

  return (
    <>
      <Header title="Login" showBack={false}/>
      <View style={styles.container}>
        <TextInput
        mode='outlined'
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          mode='outlined'
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Login
        </Button>

        {/* Sign Up Button */}
        <Button
          mode="text"
          onPress={handleSignUp}
          style={styles.signUpButton}
        >
          Don’t have an account? Sign Up
        </Button>
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
    paddingVertical:2,
    borderRadius:10
  },
  buttonText: {
    textAlignVertical:'center',
    fontSize: 18,
  },
  signUpButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default LoginScreen;
