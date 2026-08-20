import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sbvmobypcvhkfwkczejn.supabase.co";
const supabaseKey = "sb_publishable_ab0LpyityMe439nnSHjLiw_AVhOFwMN";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
