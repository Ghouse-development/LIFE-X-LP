'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { trackFormSubmit, getUTMParams } from '@/lib/events';

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  prefecture: string;
  message: string;
}

export function LeadForm() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    email: '',
    phone: '',
    prefecture: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const utm = getUTMParams();

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website',
          utm,
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      trackFormSubmit('lead', { prefecture: formData.prefecture });
      setShowThanks(true);

      // Reset form
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        prefecture: '',
        message: '',
      });
    } catch (err) {
      setError('送信中にエラーが発生しました。もう一度お試しください。');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThanks) {
    return (
      <section id="lead-form" className="py-24 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-12 rounded-lg shadow-lg"
          >
            <div className="text-6xl mb-6">✓</div>
            <h2 className="text-3xl font-bold mb-4">お問い合わせありがとうございます</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              1営業日以内に担当者よりご連絡いたします。
              <br />
              資料をメールでお送りしますので、ご確認ください。
            </p>
            <a
              href="/public/LIFEX_FC_Overview.pdf"
              download
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
            >
              資料をダウンロード（PDF）
            </a>
            <p className="text-sm text-gray-500">
              ※ダウンロードできない場合は、メールに添付してお送りします。
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="mt-8 text-blue-600 hover:underline text-sm"
            >
              フォームに戻る
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="lead-form" className="py-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">資料請求・お問い合わせ</h2>
          <p className="text-gray-600 text-lg">
            フォーム送信後、1営業日以内にご連絡いたします。
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              会社名・屋号
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-2">
              都道府県
            </label>
            <select
              id="prefecture"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">選択してください</option>
              <option value="北海道">北海道</option>
              <option value="東京都">東京都</option>
              <option value="大阪府">大阪府</option>
              <option value="愛知県">愛知県</option>
              <option value="福岡県">福岡県</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ご質問やご要望がございましたらご記入ください"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>

          <p className="text-xs text-gray-500 text-center leading-relaxed">
            ご入力いただいた個人情報は、お問い合わせ対応のみに使用し、
            <br className="hidden md:block" />
            第三者に提供することはございません。
          </p>
        </motion.form>
      </div>
    </section>
  );
}
