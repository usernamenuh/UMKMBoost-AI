"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextFlipAnimationProps {
  animatedWords?: string[]
  duration?: number
}

export const TextFlipAnimation = ({
  animatedWords = ["Profesional", "Berkualitas", "Menarik", "Terpercaya"],
  duration = 3000,
}: TextFlipAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedWords.length)
    }, duration)

    return () => clearInterval(interval)
  }, [duration, animatedWords.length])

  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.4 }}
          className="inline-block font-bold text-blue-600"
        >
          {animatedWords[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
