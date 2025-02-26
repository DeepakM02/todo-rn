// app/layout.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from '../src/redux/store';
import { SplashScreen, useRootNavigationState, useRouter } from 'expo-router';
import { Slot } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);


  useEffect(() => {
    const init = async() => {
      await SplashScreen.hideAsync();
    }
    init();
    if (!rootNavigationState?.key) return;
    if (isAuthenticated) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
    }, [isAuthenticated, router]);

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar backgroundColor='#6200EE' />
          <View style={styles.content}>
            <Slot />
          </View>
          </PersistGate>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Layout;
