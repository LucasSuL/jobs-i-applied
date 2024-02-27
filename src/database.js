import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lfbqzqkubqyoemkmwxoj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmYnF6cWt1YnF5b2Vta213eG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwMDk1ODAsImV4cCI6MjAyNDU4NTU4MH0.5K0jJyKTe-YcjmGaB_YVHqazLa3UbpT0phTteuBpWmY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;