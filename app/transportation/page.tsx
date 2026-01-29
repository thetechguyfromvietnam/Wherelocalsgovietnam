'use client'

import { Header } from '@/components/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/lib/translations'

export default function TransportationPage() {
  const { language } = useLanguage()
  const t = (key: keyof typeof import('@/lib/translations').translations.en) => getTranslation(language, key)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-6 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {language === 'vi' ? 'Vận chuyển' : 'Transportation'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'vi' ? 'Dịch vụ vận chuyển' : 'Transportation services'}
            </p>
          </div>

          {/* Content Placeholder */}
          <div className="text-center py-20">
            <p className="text-gray-500">
              {language === 'vi' ? 'Nội dung đang được cập nhật...' : 'Content coming soon...'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
