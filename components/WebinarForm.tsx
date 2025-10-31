'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackFormSubmit, getUTMParams } from '@/lib/events';
import webinarData from '@/content/webinar.json';

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  prefecture: string;
  desired_date: string;
  recording_ok: boolean;
}

export function WebinarForm() {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    email: '',
    phone: '',
    prefecture: '',
    desired_date: webinarData.nextDates[0] || '',
    recording_ok: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const utm = getUTMParams();

      const response = await fetch('/api/webinar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          utm,
        }),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      trackFormSubmit('webinar', { desired_date: formData.desired_date });
      setShowThanks(true);

      // Reset form
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        prefecture: '',
        desired_date: webinarData.nextDates[0] || '',
        recording_ok: false,
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
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-12 rounded-lg shadow-lg text-center"
        >
          <div className="text-6xl mb-6">✓</div>
          <h2 className="text-3xl font-bold mb-4">お申し込みありがとうございます</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ウェビナー開催日の前日までに、Zoomの参加URLをメールでお送りします。
            <br />
            ご確認ください。
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="text-sm text-gray-600 mb-2">開催日時</div>
            <div className="font-bold text-lg">
              {new Date(formData.desired_date || webinarData.nextDates[0]).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
          <button
            onClick={() => setShowThanks(false)}
            className="text-gray-600 hover:underline text-sm"
          >
            フォームに戻る
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="desired_date" className="block text-sm font-medium text-gray-700 mb-2">
            希望日時 <span className="text-red-500">*</span>
          </label>
          <select
            id="desired_date"
            name="desired_date"
            value={formData.desired_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            {webinarData.nextDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="recording_ok"
            name="recording_ok"
            checked={formData.recording_ok}
            onChange={handleChange}
            className="mt-1 mr-3 w-5 h-5"
          />
          <label htmlFor="recording_ok" className="text-sm text-gray-700">
            参加できない場合、録画視聴を希望する
          </label>
        </div>

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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gray-700 text-white font-bold text-lg rounded-full hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '送信中...' : '申し込む'}
        </button>

        <p className="text-xs text-gray-500 text-center leading-relaxed">
          ご入力いただいた個人情報は、ウェビナー運営のみに使用し、
          <br className="hidden md:block" />
          第三者に提供することはございません。
        </p>
      </form>
    </div>
  );
}
