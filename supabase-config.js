// supabase-config.js
const supabaseUrl = 'https://sylieszftvfjntxamixz.supabase.co';  // ← Paste your Project URL
const supabaseAnonKey = 'sb_publishable_MnIVB-yhRmWauhdWQQ8eAQ_Zd9KnYTy';  // ← Paste your anon public key

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

export default supabase;