import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// プレースホルダーまたは未設定の場合は警告を出す
const isConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder');

if (!isConfigured && typeof window !== 'undefined') {
  console.log('⚠️ Supabase is not configured. Using default data.');
}

// Supabaseクライアントの作成（未設定の場合はダミーURL）
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://example.supabase.co', 'dummy-key');

// 設定状態をエクスポート
export const isSupabaseConfigured = isConfigured;
