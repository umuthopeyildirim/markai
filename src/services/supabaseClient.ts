import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabaseClient = async (supabaseAccessToken: string | undefined)  => {

  const supabase = createClient(
    supabaseUrl as string,
    supabaseAnonKey as string,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  return supabase;
};

export {supabaseClient}