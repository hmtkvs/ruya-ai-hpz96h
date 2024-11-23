import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    text: "rūyaAI sayesinde tekrarlayan rüyalarımın anlamını keşfettim. Artık kendimi daha iyi anlıyorum.",
    author: "Ayşe K."
  },
  {
    text: "Yapay zeka yorumları gerçekten derinlikli ve anlamlı. Her detayı düşünüyorlar.",
    author: "Mehmet Y."
  },
  {
    text: "Premium üyelik aldıktan sonra rüyalarımdaki sembolleri çok daha iyi anlamaya başladım.",
    author: "Zeynep A."
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative min-h-[60vh] py-20">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function TestimonialCard({ text, author, index }: { text: string; author: string; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-neon hover:shadow-neon-hover
                transition-all duration-300 transform hover:scale-105"
    >
      <p className="text-purple-100 mb-4">{text}</p>
      <p className="text-purple-300 text-sm">{author}</p>
    </motion.div>
  )
}