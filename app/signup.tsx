import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_ROUTES, BACKEND_URL } from '../src/constant';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {

    if(!name || !email || !password) {
      Alert.alert('Error', 'Enpty Fields!');
      return;
    }
    
    try {
      const response = await axios.post(BACKEND_URL + BACKEND_ROUTES.SIGNUP, {
        username: name,
        email,
        password,
      });
      alert('Signup successfully!');
      await AsyncStorage.setItem('token', response.data.token);
      router.replace('/home');
    } catch (err) {
      console.log({err});     
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <Header title="Create an Account" showBack={false}/>
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
      <Text
        onPress={() => (router.push('/login'))}
        style={styles.link}>
        Already have an account? Login
      </Text>
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
    borderRadius:10
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SignupScreen;
