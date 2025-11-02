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
              className="inline-block px-6 py-3 bg-gray-700 text-white rounded-pg-pill hover:bg-gray-600 transition-colors mb-4"
            >
              資料をダウンロード（PDF）
            </a>
            <p className="text-sm text-gray-500">
              ※ダウンロードできない場合は、メールに添付してお送りします。
            </p>
            <button
              onClick={() => setShowThanks(false)}
              className="mt-8 text-gray-600 hover:underline text-sm"
            >
              フォームに戻る
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="lead-form" className="py-40 px-4 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">無料資料請求・相談申込</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            まずは30分の概要相談から始めませんか
          </p>

          {/* ベネフィット表示 - 競合分析から */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm font-medium">詳細資料</p>
              <p className="text-xs text-gray-400 mt-1">収益モデル・初期費用</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-sm font-medium">30分相談</p>
              <p className="text-xs text-gray-400 mt-1">オンライン・電話OK</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-3xl mb-2">📍</div>
              <p className="text-sm font-medium">エリア確認</p>
              <p className="text-xs text-gray-400 mt-1">希望エリアの可否即答</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            1営業日以内にご連絡 / 資料はメール送付
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl space-y-6 border border-gray-700"
        >
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              会社名・屋号
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-pg-pill focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-pg-pill focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-pg-pill focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-pg-pill focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="prefecture" className="block text-sm font-medium text-gray-300 mb-2">
              都道府県
            </label>
            <select
              id="prefecture"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-pg-pill focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
            className="w-full px-6 py-4 md:px-8 md:py-5 bg-revenue-orange text-white font-bold text-lg md:text-xl rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-xl hover:scale-105"
          >
            {isSubmitting ? '送信中...' : '無料で資料請求・相談する'}
          </button>
          <p className="text-center text-sm text-gray-400 mt-2">
            ※営業時間外のお問い合わせは翌営業日に対応いたします
          </p>

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
