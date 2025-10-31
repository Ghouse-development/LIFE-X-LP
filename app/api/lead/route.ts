import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const leadSchema = z.object({
  company: z.string().optional(),
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  prefecture: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  utm: z.record(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = leadSchema.parse(body);

    // Insert into Supabase
    const { data, error } = await supabase.from('fc_leads').insert([
      {
        company: validatedData.company || null,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        prefecture: validatedData.prefecture || null,
        message: validatedData.message || null,
        source: validatedData.source || 'website',
        utm: validatedData.utm || null,
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'データベースエラーが発生しました' }, { status: 500 });
    }

    return NextResponse.json(
      { message: '送信が完了しました', data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力内容に誤りがあります', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
