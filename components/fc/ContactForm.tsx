'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Section } from './Section'
import { CheckCircle2, Loader2 } from 'lucide-react'

// Zodスキーマ定義
const formSchema = z.object({
  // Step 1: 基本情報
  company: z.string().min(1, '会社名・屋号を入力してください'),
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().min(10, '電話番号を入力してください'),

  // Step 2: 希望内容
  prefecture: z.string().min(1, '都道府県を選択してください'),
  interest: z.string().min(1, '興味のある内容を選択してください'),
  message: z.string().optional(),

  // Step 3: 同意
  agreement: z.boolean().refine((val) => val === true, {
    message: 'プライバシーポリシーへの同意が必要です',
  }),
})

type FormData = z.infer<typeof formSchema>

const DRAFT_STORAGE_KEY = 'fc_contact_draft'

// GTM dataLayer type
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function ContactForm() {
  const [step, setStep] = useState(1)
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
      interest: '',
      message: '',
      agreement: false,
    },
    mode: 'onChange',
  })

  // Draft自動保存（localStorage）
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Draft読み込み
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft)
        form.reset(parsedDraft)
        toast({
          title: '下書きを復元しました',
          description: '前回の入力内容を読み込みました',
        })
      } catch (e) {
        console.error('Draft parse error:', e)
      }
    }
  }, [form, toast])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // フォーム送信（既存のAPIエンドポイントを使用）
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('送信に失敗しました')

      // 成功
      setIsSuccess(true)
      localStorage.removeItem(DRAFT_STORAGE_KEY)

      toast({
        title: '送信完了',
        description: 'お問い合わせありがとうございます。担当者より追ってご連絡いたします。',
      })

      // GTMイベント
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (step === 1) {
      fieldsToValidate = ['company', 'name', 'email', 'phone']
    } else if (step === 2) {
      fieldsToValidate = ['prefecture', 'interest']
    }

    const result = await form.trigger(fieldsToValidate)
    if (result) {
      setStep(step + 1)
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
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    s === step
                      ? 'bg-[var(--brand)] text-white'
                      : s < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1: 基本情報 */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-bold text-xl text-[var(--primary)] mb-6">基本情報</h3>

                <div className="grid gap-1">
                  <Label htmlFor="company" className="text-sm text-[var(--ink)]">
                    会社名・屋号<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <Input
                    id="company"
                    {...form.register('company')}
                    className="h-11 rounded-xl"
                  />
                  {form.formState.errors.company && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.company.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="name" className="text-sm text-[var(--ink)]">
                    お名前<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    className="h-11 rounded-xl"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="email" className="text-sm text-[var(--ink)]">
                    メールアドレス<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className="h-11 rounded-xl"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="phone" className="text-sm text-[var(--ink)]">
                    電話番号<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register('phone')}
                    className="h-11 rounded-xl"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  data-gtm="form_step1_next"
                >
                  次へ
                </Button>
              </div>
            )}

            {/* Step 2: 希望内容 */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-xl text-[var(--primary)] mb-6">希望内容</h3>

                <div className="grid gap-1">
                  <Label htmlFor="prefecture" className="text-sm text-[var(--ink)]">
                    都道府県<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <select
                    id="prefecture"
                    {...form.register('prefecture')}
                    className="w-full h-11 px-3 border rounded-xl"
                  >
                    <option value="">選択してください</option>
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
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.prefecture.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="interest" className="text-sm text-[var(--ink)]">
                    興味のある内容<span className="text-[var(--ink-muted)]"> *</span>
                  </Label>
                  <select
                    id="interest"
                    {...form.register('interest')}
                    className="w-full h-11 px-3 border rounded-xl"
                  >
                    <option value="">選択してください</option>
                    <option value="資料請求">資料請求</option>
                    <option value="個別相談">個別相談</option>
                    <option value="ウェビナー">ウェビナー参加</option>
                    <option value="その他">その他</option>
                  </select>
                  {form.formState.errors.interest && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.interest.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1">
                  <Label htmlFor="message" className="text-sm text-[var(--ink)]">
                    お問い合わせ内容（任意）
                  </Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    rows={4}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    戻る
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    data-gtm="form_step2_next"
                  >
                    次へ
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: 同意・送信 */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-bold text-xl text-[var(--primary)] mb-6">確認・送信</h3>

                <div className="bg-gray-50 p-6 rounded-lg space-y-3 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">会社名・屋号:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('company')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">お名前:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('name')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">メール:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('email')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">電話番号:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('phone')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">都道府県:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('prefecture')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-[var(--ink-muted)]">興味の内容:</span>
                    <span className="col-span-2 font-medium text-[var(--ink-strong)]">{form.watch('interest')}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    {...form.register('agreement')}
                    className="mt-1"
                  />
                  <Label htmlFor="agreement" className="text-sm text-[var(--ink)] cursor-pointer">
                    <a href="/privacy" className="text-[var(--link)] hover:underline">
                      プライバシーポリシー
                    </a>
                    に同意します *
                  </Label>
                </div>
                {form.formState.errors.agreement && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.agreement.message}
                  </p>
                )}

                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    戻る
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    data-gtm="form_submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 -mt-px" />
                        送信中...
                      </>
                    ) : (
                      '送信する'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </Section>
  )
}
