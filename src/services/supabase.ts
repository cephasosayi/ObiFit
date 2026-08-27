import { createClient } from '@supabase/supabase-js';
import { encryptedStorage } from './mmkvStorage';

/**
 * Supabase Client Instance
 * Enforces Row Level Security (RLS) on database queries.
 * Leverages Encrypted SecureStore for JWT session persistence.
 */

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: encryptedStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
