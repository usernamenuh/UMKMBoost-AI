"use client"

import { motion } from "framer-motion"
import { IconArrowRight, IconSparkles } from "@tabler/icons-react"

export function ShowcaseSection() {
  const showcaseItems = [
    {
      type: "before-after",
      title: "Photo Enhancement",
      description: "Tingkatkan kualitas foto produk secara otomatis",
      before: "/assets/snack.jpg",
      after: "/assets/snak.jpg",
    },
    {
      type: "before-after",
      title: "Background Removal",
      description: "Hapus background dan ganti dengan latar profesional",
      before: "/assets/seblak.jpeg",
      after: "/assets/seblakr.png",
    },
  ]

  const generatedPosters = [
    {
      title: "Poster Promo Lebaran",
      image: "/assets/poste.jpg",
    },
    {
      title: "Flash Sale Banner",
      image: "/assets/flash.jpg",
    },
    {
      title: "New Product Launch",
      image: "/assets/new.jpg",
    },
  ]

  return (
    <section id="showcase" className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating gradient orbs - more subtle and matching */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 15, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-100/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-4 border border-blue-200/50"
          >
            <IconSparkles className="w-4 h-4" />
            Hasil Nyata
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Lihat Transformasi yang Menakjubkan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bandingkan hasil sebelum dan sesudah menggunakan AI tools kami
          </p>
        </motion.div>

        {/* Before-After Comparisons */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-900 mb-8 text-center"
          >
            Before & After Photo Enhancement
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showcaseItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-blue-100/50 transition-shadow duration-300"
              >
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative group">
                      <span className="absolute top-2 left-2 z-10 bg-gray-800/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        Before
                      </span>
                      <img
                        src={item.before || "/placeholder.svg"}
                        alt={`Before ${item.title}`}
                        className="w-full aspect-square object-cover rounded-xl ring-1 ring-gray-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
                    >
                      <IconArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="relative group">
                      <span className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        After
                      </span>
                      <img
                        src={item.after || "/placeholder.svg"}
                        alt={`After ${item.title}`}
                        className="w-full aspect-square object-cover rounded-xl ring-1 ring-blue-200"
                      />
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Generated Posters */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-900 mb-8 text-center"
          >
            AI-Generated Posters
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {generatedPosters.map((poster, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 group-hover:shadow-xl group-hover:shadow-blue-100/50 transition-all duration-300">
                  <img
                    src={poster.image || "/placeholder.svg"}
                    alt={poster.title}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-medium">{poster.title}</p>
                    <p className="text-white/70 text-sm flex items-center gap-1">
                      <IconSparkles className="w-3 h-3" />
                      Generated by AI
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="font-medium text-gray-900">{poster.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
