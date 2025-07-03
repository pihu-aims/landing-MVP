"use client";

// components/SocialProof.jsx
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function SocialProof() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  const stats = [
    { number: "2.3M+", label: "Videos Created", desc: "Monthly content produced" },
    { number: "850+", label: "Companies Using", desc: "From startups to Fortune 500" },
    { number: "125K+", label: "Active Creators", desc: "Growing 40% month-over-month" },
    { number: "£120B", label: "Market Size", desc: "Creative AI tools by 2027" }
  ]

  return (
    <section className="py-20 bg-black/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`text-4xl font-bold text-center mb-16 text-cyan-400 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          Proven traction across industries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 bg-white/5 rounded-lg border border-cyan-500/20 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-cyan-400 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
