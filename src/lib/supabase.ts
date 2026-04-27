import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL  as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Fallback segur — evita crash si les env vars no estan configurades a Vercel
export const supabase = createClient(
  url  ?? 'https://placeholder.supabase.co',
  key  ?? 'placeholder-key',
);
