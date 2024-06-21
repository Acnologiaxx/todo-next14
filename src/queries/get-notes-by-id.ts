import { createClient } from '@/utils/supabase/server';

  export async function getNotes(userId: string) {
    const supabase = createClient();
    return supabase.from("notes").select().eq('users_id', userId)
  }