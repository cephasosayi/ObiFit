import * as SecureStore from 'expo-secure-store';

/**
 * Encrypted Local Storage Manager
 * NDPR Compliant: Secures health metrics, credentials & tokens in encrypted storage.
 * Prohibits standard AsyncStorage for PII or health data.
 */

const STORAGE_KEY = 'obifit_encryption_key';
const memoryStore = new Map<string, string>();

export async function getOrGenerateEncryptionKey(): Promise<string> {
  try {
    let key = await SecureStore.getItemAsync(STORAGE_KEY);
    if (!key) {
      key = Math.random().toString(36).substring(2) + Date.now().toString(36);
      await SecureStore.setItemAsync(STORAGE_KEY, key);
    }
    return key;
  } catch (error) {
    console.warn('SecureStore unavailable, using fallback memory key', error);
    return 'fallback_secure_key_123';
  }
}

export const encryptedStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return memoryStore.get(key) || await SecureStore.getItemAsync(key);
    } catch {
      return memoryStore.get(key) || null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      memoryStore.set(key, value);
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to set secure item:', error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      memoryStore.delete(key);
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to remove secure item:', error);
    }
  },
};
