import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Storage adapter que funciona tanto no cliente quanto no servidor
const isClient = typeof window !== 'undefined' || Platform.OS !== 'web';

// Mock storage para SSR
const mockStorage = {
  async getItem() {
    return null;
  },
  async setItem() {
    return;
  },
  async removeItem() {
    return;
  }
};

export const storageAdapter = isClient ? AsyncStorage : mockStorage;
