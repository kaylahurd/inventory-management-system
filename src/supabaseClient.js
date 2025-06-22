import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zbwveqwdppvffwiyzsuh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid3ZlcXdkcHB2ZmZ3aXl6c3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTIxNTIsImV4cCI6MjA2NTU4ODE1Mn0.ipV2aHIUwFLigFRa3cUegpyO6ak7ay4DN7SZ0j3pfWo"; // replace with your full anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
