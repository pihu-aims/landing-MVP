"use client";

// components/Hero.jsx
import { motion, useScroll, useTransform } from '@/node_modules/framer-motion/dist/framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      style={{ y, opacity }}
    >
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
          Reimagine Your Creative Process
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          No-code AI creativity platform
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold"
        >
          Join Beta Waitlist
        </motion.button>
      </div>
    </motion.section>
  )
}
