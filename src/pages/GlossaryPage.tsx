import { useState, useMemo } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Mock data - will be replaced with real interpretations
const dreamSymbols = [
  {
    symbol: "Ağaç",
    meaning: "Hayat, büyüme ve kişisel gelişimi temsil eder. Ağacın durumu (canlı, kurumuş, meyve veren) ruhsal durumunuzu yansıtabilir.",
    categories: ["Doğa", "Büyüme"]
  },
  {
    symbol: "Ay",
    meaning: "Duygusal dünya, sezgiler ve bilinçaltını temsil eder. Dolunay önemli değişimlere, hilal yeni başlangıçlara işaret edebilir.",
    categories: ["Gök Cisimleri", "Duygular"]
  },
  {
    symbol: "Bebek",
    meaning: "Yeni başlangıçlar, masumiyet ve gelişim potansiyelini simgeler. Aynı zamanda sorumluluk ve büyüme ihtiyacını da gösterebilir.",
    categories: ["İnsan", "Başlangıçlar"]
  },
  {
    symbol: "Deniz",
    meaning: "Duygusal derinlik, bilinçaltı ve değişimi temsil eder. Denizin durumu (sakin, fırtınalı) duygusal durumunuzu yansıtabilir.",
    categories: ["Su", "Duygular"]
  },
  {
    symbol: "Ev",
    meaning: "Kendinizi, iç dünyanızı ve güvenlik ihtiyacınızı temsil eder. Evin durumu ve özellikleri ruhsal durumunuzu gösterir.",
    categories: ["Yapılar", "Güvenlik"]
  },
  {
    symbol: "Kapı",
    meaning: "Yeni fırsatlar, geçişler ve değişimi simgeler. Kilitli kapı engelleri, açık kapı fırsatları temsil eder.",
    categories: ["Yapılar", "Geçiş"]
  },
  {
    symbol: "Kuş",
    meaning: "Özgürlük, ruhsal yükseliş ve iletişimi temsil eder. Kuşun türü ve davranışı mesajın niteliğini belirler.",
    categories: ["Hayvanlar", "Özgürlük"]
  },
  {
    symbol: "Merdiven",
    meaning: "Kişisel gelişim, ilerleme ve hedeflere ulaşmayı temsil eder. Yukarı çıkmak gelişimi, inmek içe dönüşü simgeler.",
    categories: ["Yapılar", "Gelişim"]
  },
  {
    symbol: "Su",
    meaning: "Duygular, arınma ve yaşam enerjisini temsil eder. Suyun durumu (berrak, bulanık) duygusal durumu yansıtır.",
    categories: ["Doğa", "Duygular"]
  },
  {
    symbol: "Uçmak",
    meaning: "Özgürlük, başarı ve engelleri aşmayı temsil eder. Uçuş kalitesi özgüven düzeyini gösterir.",
    categories: ["Hareket", "Özgürlük"]
  },
  {
    symbol: "Yılan",
    meaning: "Dönüşüm, bilgelik ve yaşam enerjisini temsil eder. Yılanın davranışı değişimin niteliğini gösterir.",
    categories: ["Hayvanlar", "Dönüşüm"]
  },
  {
    symbol: "Yol",
    meaning: "Yaşam yolculuğu, seçimler ve kaderi temsil eder. Yolun durumu ve özellikleri yaşam yolculuğunuzu yansıtır.",
    categories: ["Yolculuk", "Seçimler"]
  }
] as const

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    dreamSymbols.forEach(symbol => {
      symbol.categories.forEach(category => uniqueCategories.add(category))
    })
    return Array.from(uniqueCategories).sort()
  }, [])

  const filteredSymbols = useMemo(() => {
    return dreamSymbols.filter(symbol => {
      const matchesSearch = symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          symbol.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || symbol.categories.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Rüya Sembolleri Sözlüğü</h1>
        <p className="text-purple-200 mb-6">
          Rüyalarınızdaki yaygın sembollerin anlamlarını keşfedin
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 
                   px-6 py-3 rounded-lg text-white hover:from-purple-500 hover:to-blue-500 
                   transition-all duration-300 transform hover:scale-105 shadow-neon hover:shadow-neon-hover"
        >
          <span>Rüyanızı Yapay Zeka ile Yorumlayın</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-300" />
          <input
            type="text"
            placeholder="Sembol veya anlam ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-white/10 pl-10 pr-4 py-3 text-white placeholder-purple-300 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm ${
              !selectedCategory
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            Tümü
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredSymbols.map((symbol, index) => (
          <motion.div
            key={symbol.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-lg bg-white/10 p-6 backdrop-blur-sm shadow-neon hover:shadow-neon-hover
                     transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{symbol.symbol}</h2>
            <p className="text-purple-100 mb-4">{symbol.meaning}</p>
            <div className="flex flex-wrap gap-2">
              {symbol.categories.map(category => (
                <span
                  key={category}
                  className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}