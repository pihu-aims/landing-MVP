"use client";

// components/ValueProps.jsx
import { motion } from '@/node_modules/framer-motion/dist/framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ValueProps() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const props = [
    {
      title: "99.5% Cost Disruption",
      desc: "Replace £10,000+ enterprise tool subscriptions with one £45/month platform.",
      metric: "£10K → £45"
    },
    {
      title: "10x Competitive Advantage",
      desc: "Months-long production cycles become weeks. First-mover advantage in AI workflows.",
      metric: "10x Market Leader"
    },
    {
      title: "Scalable Revenue Model",
      desc: "No-code platform democratizes creation. Massive addressable market with low CAC.",
      metric: "50M+ Target Users"
    },
    {
      title: "Enterprise-Ready Platform",
      desc: "Built-in IP protection, compliance features, and enterprise security ready for B2B sales.",
      metric: "Enterprise Revenue Ready"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-purple-900/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
        >
          Core Value Propositions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {props.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white/5 rounded-lg border border-purple-500/20 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{prop.title}</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{prop.desc}</p>
              <div className="bg-gradient-to-r from-purple-500/20 to-yellow-500/20 px-4 py-2 rounded-full text-yellow-400 font-semibold text-sm border border-yellow-500/30">
                {prop.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
