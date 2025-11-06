export function StructuredData() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '初期費用はどのくらいかかりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '加盟金・研修費・初期マーケティング費用を含めて300万円〜が目安です。詳細は個別相談にて商圏や体制に応じてご説明します。',
        },
      },
      {
        '@type': 'Question',
        name: 'ロイヤリティはいくらですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '売上の一定比率をロイヤリティとしていただきます。具体的な料率は契約時に開示します。',
        },
      },
      {
        '@type': 'Question',
        name: '対応エリアは全国ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '現在は関東圏を中心に展開中です。今後、順次エリア拡大を予定しています。商圏の競合状況により加盟可否を判断します。',
        },
      },
      {
        '@type': 'Question',
        name: '必要な人員は何名ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '最小2名（営業1名+施工管理1名）から始められます。設計は外注または本部支援で対応可能です。',
        },
      },
      {
        '@type': 'Question',
        name: '研修はどのような内容ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '契約後、3日間の集合研修を実施。営業台本・標準仕様・施工要領・Web広告運用などを体系的に習得できます。',
        },
      },
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LIFE X',
    description: '高性能規格住宅フランチャイズ',
    url: 'https://life-x-lp.vercel.app/fc',
    logo: 'https://life-x-lp.vercel.app/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      availableLanguage: 'Japanese',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
