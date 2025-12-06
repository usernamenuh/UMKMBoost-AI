"use client"

import { motion } from "framer-motion"
import { IconCoin, IconSparkles, IconChartBar, IconCheck } from "@tabler/icons-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: IconCoin,
      title: "Catat Modal & Pengeluaran",
      description: "Input modal awal dan biaya operasional bisnis kamu",
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border">
            <IconCoin className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700 flex-1">Modal Awal</span>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Rp 5.000.000</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border">
            <IconCoin className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-700 flex-1">Biaya Bahan</span>
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Rp 2.000.000</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-dashed opacity-60">
            <IconCoin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Tambah pengeluaran...</span>
          </div>
        </div>
      ),
    },
    {
      icon: IconSparkles,
      title: "AI Analisis Otomatis",
      description: "FinSight menghitung profit dan prediksi BEP",
      content: (
        <div className="space-y-2">
          {["Hitung Margin Profit", "Prediksi Balik Modal", "Analisis Tren"].map((tool, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border">
              <IconCheck className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700 flex-1">{tool}</span>
              <span className="text-xs text-gray-400">{["✓", "✓", "✓"][i]}</span>
            </div>
          ))}
          <motion.div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mt-3">
            <motion.div
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-full bg-blue-600 rounded-full"
            />
          </motion.div>
        </div>
      ),
    },
    {
      icon: IconChartBar,
      title: "Lihat Insight & Laporan",
      description: "Dapatkan insight keuangan dan laporan otomatis",
      content: (
        <div className="flex flex-col items-center justify-center h-full">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4"
          >
            <IconChartBar className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex gap-2">
            {["Harian", "Mingguan", "Bulanan"].map((format) => (
              <span key={format} className="px-3 py-1 bg-white border rounded-lg text-xs text-gray-600">
                {format}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-50"
    >
      {/* Floating gradient orbs - more subtle */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-15"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            3 Langkah Mudah Kelola Keuangan Bisnis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg leading-relaxed flex items-center"
          >
            Tidak perlu keahlian akuntansi. Catat modal, biarkan AI menghitung, dan lihat insight keuangan dalam
            hitungan detik.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col h-full"
            >
              <div className="flex-1 mb-4 min-h-[180px]">{step.content}</div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
