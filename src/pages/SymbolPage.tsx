import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { findSymbolBySlug, findRelatedSymbols } from '../data/dreamSymbols'
import SEOHead from '../components/SEOHead'

export default function SymbolPage() {
  const { slug } = useParams<{ slug: string }>()
  const symbol = findSymbolBySlug(slug || '')

  if (!symbol) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sembol Bulunamadı</h1>
          <Link
            to="/glossary"
            className="text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Sözlüğe Dön</span>
          </Link>
        </div>
      </div>
    )
  }

  const relatedSymbols = findRelatedSymbols(symbol)

  return (
    <>
      <SEOHead
        title={symbol.seoTitle}
        description={symbol.seoDescription}
        canonicalUrl={`https://ruyaai.com/ruya/${symbol.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <Link
              to="/glossary"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Sözlüğe Dön</span>
            </Link>
          </div>

          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-white mb-4">{symbol.symbol}</h1>
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: symbol.longDescription.replace(/\n/g, '<br/>') }} />
            </div>
          </div>

          {relatedSymbols.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">İlgili Semboller</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedSymbols.map(related => (
                  <Link
                    key={related.slug}
                    to={`/ruya/${related.slug}`}
                    className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300
                             flex items-center justify-between group"
                  >
                    <span className="text-purple-200 group-hover:text-white">
                      {related.symbol}
                    </span>
                    <ArrowRight className="h-4 w-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-purple-900/20 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-4">
              Rüyanızı Yapay Zeka ile Yorumlayın
            </h2>
            <p className="text-purple-200 mb-6">
              Daha detaylı ve kişiselleştirilmiş bir yorum için rüyanızı yapay zeka ile analiz edin.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 
                       px-6 py-3 rounded-lg text-white hover:from-purple-500 hover:to-blue-500 
                       transition-all duration-300"
            >
              <span>Rüyanızı Yorumlayın</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}