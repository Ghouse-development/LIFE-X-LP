import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { z } from 'zod';

const webinarSchema = z.object({
  company: z.string().optional(),
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  prefecture: z.string().optional(),
  desired_date: z.string().optional(),
  recording_ok: z.boolean().optional(),
  utm: z.record(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = webinarSchema.parse(body);

    // Insert into Supabase
    const { data, error } = await supabase.from('fc_webinar_regs').insert([
      {
        company: validatedData.company || null,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        prefecture: validatedData.prefecture || null,
        desired_date: validatedData.desired_date || null,
        recording_ok: validatedData.recording_ok || false,
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

    console.error('Webinar registration error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
