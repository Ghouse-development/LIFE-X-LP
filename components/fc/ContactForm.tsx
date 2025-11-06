'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Section } from './Section'
import { CheckCircle2, Loader2 } from 'lucide-react'

// Simplified schema - only 6 essential fields
const formSchema = z.object({
  company: z.string().min(1, '会社名を入力してください'),
  name: z.string().min(1, '担当者名を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().min(10, '電話番号を入力してください'),
  prefecture: z.string().min(1, 'エリアを選択してください'),
  timing: z.string().min(1, '導入希望時期を選択してください'),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'プライバシーポリシーへの同意が必要です',
  }),
})

type FormData = z.infer<typeof formSchema>

// GTM dataLayer type
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      prefecture: '',
      timing: '',
      agreement: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Form submission
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('送信に失敗しました')

      // Success
      setIsSuccess(true)

      toast({
        title: '送信完了',
        description: 'お問い合わせありがとうございます。担当者より追ってご連絡いたします。',
      })

      // GTM event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submitted',
        })
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error)
      toast({
        title: '送信エラー',
        description: '送信に失敗しました。もう一度お試しください。',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Section
        id="contact"
        variant="light"
        spacing="2xl"
        title="資料請求・個別相談"
        subtitle="まずは30分で概要をご説明します。お気軽にお問い合わせください。"
      >
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardContent>
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h3 className="font-serif text-2xl font-bold text-[var(--primary)] mb-4">送信完了</h3>
            <p className="text-[var(--ink-muted)] mb-6">
              お問い合わせありがとうございます。<br />
              担当者より追ってご連絡いたします。
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              トップに戻る
            </Button>
          </CardContent>
        </Card>
      </Section>
    )
  }

  return (
    <Section
      id="contact"
      variant="light"
      spacing="2xl"
      title="資料請求・個別相談"
      subtitle="まずは30分で概要をご説明します。お気軽にお問い合わせください。"
    >
      <Card className="max-w-[680px] mx-auto leading-relaxed shadow-xl">
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Company */}
              <div className="grid gap-2">
                <Label htmlFor="company" className="text-sm text-[var(--ink)]">
                  会社名<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="company"
                  {...form.register('company')}
                  className="h-11 rounded-xl"
                  placeholder="株式会社〇〇工務店"
                />
                {form.formState.errors.company && (
                  <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
                )}
              </div>

              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm text-[var(--ink)]">
                  担当者名<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  className="h-11 rounded-xl"
                  placeholder="山田 太郎"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm text-[var(--ink)]">
                  メールアドレス<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  className="h-11 rounded-xl"
                  placeholder="example@company.co.jp"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-sm text-[var(--ink)]">
                  電話番号<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register('phone')}
                  className="h-11 rounded-xl"
                  placeholder="090-1234-5678"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* Prefecture */}
              <div className="grid gap-2">
                <Label htmlFor="prefecture" className="text-sm text-[var(--ink)]">
                  対応エリア<span className="text-red-500 ml-1">*</span>
                </Label>
                <select
                  id="prefecture"
                  {...form.register('prefecture')}
                  className="h-11 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">都道府県を選択</option>
                  <option value="北海道">北海道</option>
                  <option value="東北">東北</option>
                  <option value="関東">関東</option>
                  <option value="中部">中部</option>
                  <option value="関西">関西</option>
                  <option value="中国">中国</option>
                  <option value="四国">四国</option>
                  <option value="九州">九州</option>
                </select>
                {form.formState.errors.prefecture && (
                  <p className="text-sm text-red-500">{form.formState.errors.prefecture.message}</p>
                )}
              </div>

              {/* Implementation Timing */}
              <div className="grid gap-2">
                <Label htmlFor="timing" className="text-sm text-[var(--ink)]">
                  導入希望時期<span className="text-red-500 ml-1">*</span>
                </Label>
                <select
                  id="timing"
                  {...form.register('timing')}
                  className="h-11 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">導入希望時期を選択</option>
                  <option value="すぐに">すぐに</option>
                  <option value="1〜3ヶ月以内">1〜3ヶ月以内</option>
                  <option value="3〜6ヶ月以内">3〜6ヶ月以内</option>
                  <option value="6ヶ月〜1年以内">6ヶ月〜1年以内</option>
                  <option value="1年以降">1年以降</option>
                  <option value="未定">未定</option>
                </select>
                {form.formState.errors.timing && (
                  <p className="text-sm text-red-500">{form.formState.errors.timing.message}</p>
                )}
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  type="checkbox"
                  id="agreement"
                  {...form.register('agreement')}
                  className="mt-1 w-4 h-4"
                />
                <Label htmlFor="agreement" className="text-sm text-[var(--ink-muted)] leading-relaxed cursor-pointer">
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--brand)] underline">
                    プライバシーポリシー
                  </a>
                  に同意します
                  {form.formState.errors.agreement && (
                    <span className="block text-red-500 mt-1">{form.formState.errors.agreement.message}</span>
                  )}
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#1f2b46] text-white hover:bg-slate-900 font-medium shadow-lg mt-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    送信中...
                  </>
                ) : (
                  '資料請求・個別相談を申し込む'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  )
}
