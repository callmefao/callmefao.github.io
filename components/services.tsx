"use client"

import { services } from "@/lib/portfolio-data"
import RevealOnView from "@/components/reveal-on-view"

export default function Services() {
  return (
    <section className="px-4 py-16 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <RevealOnView>
          <h2 className="text-3xl font-black text-center mb-12 text-white">My Services</h2>
        </RevealOnView>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <RevealOnView
              key={service.id}
              className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:bg-neutral-900/80 transition-colors"
              delay={idx * 0.1}
            >
              <div className="text-center">
                <div className="mb-4 text-3xl text-blue-400">
                  {/* You can replace this with proper icon component */}
                  <div className="w-12 h-12 mx-auto bg-blue-400/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold">💻</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
              </div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  )
}
