import { WebinarForm } from '@/components/WebinarForm';
import { generateMetadata } from '@/lib/seo';
import webinarData from '@/content/webinar.json';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'LIFE X 事業化ウェビナー申込',
  description: '毎月開催。オンラインで30分、事業概要と収益モデルを解説します。',
  path: '/webinar',
});

export default function WebinarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6">
            <Image
              src="/icons/calendar-video.svg"
              alt="ウェビナー"
              width={80}
              height={80}
              className="filter invert"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{webinarData.title}</h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
            {webinarData.description}
          </p>
        </div>
      </section>

      {/* Schedule Info */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold text-lg mb-3">開催スケジュール</h3>
              <p className="text-gray-700 mb-2">
                <strong>頻度：</strong>{webinarData.schedule.frequency}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>時間：</strong>{webinarData.schedule.time}
              </p>
              <p className="text-gray-700">
                <strong>形式：</strong>{webinarData.schedule.platform}
              </p>
              <p className="text-sm text-gray-600 mt-4">{webinarData.schedule.note}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">ウェビナーで得られること</h3>
              <ul className="space-y-2">
                {webinarData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2 font-bold">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">プログラム（全30分）</h2>

          <div className="space-y-4">
            {webinarData.agenda.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">ウェビナー申込フォーム</h2>
          <p className="text-gray-600">
            参加希望日を選択し、必要事項を入力してください。
            <br />
            開催日の前日までにZoom URLをメールでお送りします。
          </p>
        </div>
        <WebinarForm />
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-gray-900 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">個別相談をご希望の方</h3>
        <p className="text-gray-300 mb-6">
          ウェビナー以外に、個別での面談も随時受け付けております。
        </p>
        <Link
          href="/#lead-form"
          className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          個別相談を申し込む
        </Link>
      </section>
    </main>
  );
}
