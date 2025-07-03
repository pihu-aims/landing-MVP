"use client";

// components/DemoSection.jsx
import { motion } from '@/node_modules/framer-motion/dist/framer-motion'
import { useState } from 'react'

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-20 bg-black/20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-cyan-400">
          See Studio 1 Transform Workflows
        </h2>
        <motion.div
          className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-yellow-500/10 rounded-2xl p-8 border-2 border-cyan-500/20 cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <div className="flex items-center justify-center h-96">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <div className="text-white text-2xl ml-1">▶</div>
            </motion.div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Watch Platform Demo
              </h3>
              <p className="text-gray-300">
                See how one platform replaces £10K+ in tools and delivers professional results 10x faster
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">99.5%</div>
            <div className="text-sm text-gray-400">Cost Savings</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">£45</div>
            <div className="text-sm text-gray-400">Monthly Revenue/User</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">10x</div>
            <div className="text-sm text-gray-400">Faster Than Competitors</div>
          </div>
        </div>
      </div>
    </section>
  )
}
