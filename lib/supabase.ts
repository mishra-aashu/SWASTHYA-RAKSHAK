
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apckbdqmpsqhzehgtzzf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwY2tiZHFtcHNxaHplaGd0enpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NjYyNTgsImV4cCI6MjA4MTQ0MjI1OH0.z5GCqUvOtPETrKzFkGoXjQetRx8S8cVwNMCYbnWVWyo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to handle Google Auth
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  return { data, error };
};
