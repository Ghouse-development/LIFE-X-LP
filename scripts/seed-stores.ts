import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase環境変数が設定されていません。');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Store {
  name: string;
  prefecture: string;
  city: string;
  address: string;
  full_address: string;
  latitude: number;
  longitude: number;
  joined_date: string;
}

const stores: Store[] = [
  {
    name: 'コンチネンタルホーム株式会社',
    prefecture: '栃木県',
    city: '佐野市',
    address: '大町2979-1',
    full_address: '栃木県佐野市大町2979-1',
    latitude: 36.314,
    longitude: 139.571,
    joined_date: '2025-10-31',
  },
];

async function seedStores() {
  console.log('🌱 加盟店データをSeeding中...\n');

  for (const store of stores) {
    console.log(`📍 ${store.name} を追加中...`);

    // 既に存在するか確認
    const { data: existing, error: checkError } = await supabase
      .from('stores')
      .select('id')
      .eq('name', store.name)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error(`  ❌ エラー: ${checkError.message}`);
      continue;
    }

    if (existing) {
      console.log(`  ⏭️  既に存在します (ID: ${existing.id})`);
      continue;
    }

    // 新規追加
    const { data, error } = await supabase
      .from('stores')
      .insert([store])
      .select();

    if (error) {
      console.error(`  ❌ エラー: ${error.message}`);
    } else {
      console.log(`  ✅ 追加成功! (ID: ${data[0].id})`);
    }
  }

  console.log('\n✨ Seeding完了!');
}

seedStores().catch(console.error);
