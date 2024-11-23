export interface DreamSymbol {
  symbol: string
  slug: string
  meaning: string
  categories: string[]
  relatedSymbols: string[]
  keywords: string[]
  seoTitle: string
  seoDescription: string
  longDescription: string
}

export const dreamSymbols: DreamSymbol[] = [
  {
    symbol: "Ayı",
    slug: "ruya-tabiri-ayi",
    meaning: "Güç, koruma ve içgüdüsel davranışları temsil eder. Ayı ile karşılaşmak, bastırılmış duygular veya içsel güçle yüzleşmeyi simgeler.",
    categories: ["Hayvanlar", "Güç"],
    relatedSymbols: ["Kurt", "Aslan", "Orman"],
    keywords: ["ayı görmek", "ayı ile karşılaşmak", "ayıdan kaçmak", "kahverengi ayı", "siyah ayı"],
    seoTitle: "Rüyada Ayı Görmek - Rüya Tabiri ve Anlamı | rūyaAI",
    seoDescription: "Rüyada ayı görmek ne anlama gelir? Ayı ile karşılaşmak, ayıdan kaçmak gibi rüyaların modern ve bilimsel yorumu. Uzman psikologlar ve yapay zeka destekli rüya analizi.",
    longDescription: `Rüyada ayı görmek, genellikle güç, koruma içgüdüsü ve doğal yeteneklerinizle ilişkilidir. Bu rüya sembolü, aşağıdaki durumlarda farklı anlamlar taşıyabilir:

1. Ayı ile Karşılaşmak:
- Bastırılmış duygularla yüzleşme
- İçsel gücünüzü keşfetme
- Korku ve endişelerle mücadele

2. Ayıdan Kaçmak:
- Sorunlardan kaçınma eğilimi
- Yüzleşmekten kaçındığınız durumlar
- Değişime direnç

3. Dostça Bir Ayı:
- İçsel huzur ve güvenle bağlantı
- Doğal içgüdülerinizle uyum
- Koruyucu bir figürün varlığı

4. Saldırgan Bir Ayı:
- Kontrol edilemeyen durumlar
- Bastırılmış öfke veya korkular
- Çözülmemiş çatışmalar

Bu rüya, genellikle kişinin içsel gücüyle olan ilişkisini ve yaşamdaki zorluklarla başa çıkma yeteneğini yansıtır.`
  },
  {
    symbol: "Yol",
    slug: "ruya-tabiri-yol",
    meaning: "Yaşam yolculuğu, kararlar ve geleceğe yönelik seçimleri temsil eder. Yolun durumu ve özellikleri, yaşam yolculuğunuzdaki mevcut durumu yansıtır.",
    categories: ["Yolculuk", "Seçimler"],
    relatedSymbols: ["Araba", "Köprü", "Kapı"],
    keywords: ["yolda yürümek", "yol ayrımı", "karanlık yol", "aydınlık yol", "yolda kaybolmak"],
    seoTitle: "Rüyada Yol Görmek - Rüya Tabiri ve Anlamı | rūyaAI",
    seoDescription: "Rüyada yol görmek ne anlama gelir? Yolda yürümek, yol ayrımı, kaybolmak gibi rüyaların modern ve bilimsel yorumu. Yapay zeka destekli rüya analizi.",
    longDescription: `Rüyada yol görmek, yaşam yolculuğunuz ve geleceğe yönelik seçimlerinizle ilgili önemli mesajlar taşır:

1. Yolun Durumu:
- Düz ve açık yol: Net hedefler ve kolay ilerleyiş
- Engebeli yol: Zorluklar ve engeller
- Karanlık yol: Belirsizlik ve endişeler

2. Yol Ayrımları:
- Önemli kararlar
- Hayat değiştiren seçimler
- Farklı olasılıklar

3. Yolda Yürümek:
- Kişisel gelişim süreci
- Yaşam yolculuğunda ilerleme
- Hedeflere doğru adımlar

4. Kaybolmak:
- Yön duygusunu kaybetme
- Kararsızlık ve belirsizlik
- Rehberlik ihtiyacı

Bu rüya sembolü, genellikle kişinin yaşam yolculuğundaki mevcut durumunu ve gelecek planlarını yansıtır.`
  }
]

export const findSymbolBySlug = (slug: string) => 
  dreamSymbols.find(symbol => symbol.slug === slug)

export const findRelatedSymbols = (symbol: DreamSymbol) =>
  dreamSymbols.filter(s => symbol.relatedSymbols.includes(s.symbol))