import { useEffect, useRef } from 'react'
import { useMotionValue, motion } from 'framer-motion'
import { useMouse } from 'react-use'

export default function InteractiveStars() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { elX, elY } = useMouse(containerRef)

  const backgroundStars = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 0.5
  }))

  const foregroundStars = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 0.5
  }))

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const moveX = (elX - centerX) * 0.02
    const moveY = (elY - centerY) * 0.02
    mouseX.set(moveX)
    mouseY.set(moveY)
  }, [elX, elY, mouseX, mouseY])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {backgroundStars.map((star, index) => (
        <motion.div
          key={`bg-${index}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0.3 + Math.random() * 0.3,
          }}
          animate={{
            x: mouseX,
            y: mouseY,
            scale: [1, 1.2, 1],
            transition: {
              x: { type: "spring", stiffness: 25, damping: 30, delay: star.delay },
              y: { type: "spring", stiffness: 25, damping: 30, delay: star.delay },
              scale: { duration: 4, repeat: Infinity, delay: star.delay }
            }
          }}
        />
      ))}

      {foregroundStars.map((star, index) => (
        <motion.div
          key={`fg-${index}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0.5 + Math.random() * 0.4,
          }}
          animate={{
            x: mouseX,
            y: mouseY,
            scale: [1, 1.3, 1],
            transition: {
              x: { type: "spring", stiffness: 35, damping: 30, delay: star.delay },
              y: { type: "spring", stiffness: 35, damping: 30, delay: star.delay },
              scale: { duration: 3, repeat: Infinity, delay: star.delay }
            }
          }}
        />
      ))}
    </div>
  )
}