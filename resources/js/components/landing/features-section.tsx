"use client"

import { motion } from "framer-motion"
import { IconCoin, IconSparkles, IconChartLine, IconMessageChatbot, IconReportAnalytics } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export function FeaturesSection() {
  const features = [
    {
      icon: IconCoin,
      title: "Tracking Modal",
      description: "Catat modal awal, biaya bahan, operasional, dan semua pengeluaran bisnis dengan rapi.",
    },
    {
      icon: IconChartLine,
      title: "Hitung Untung Bersih Otomatis",
      description: "Lihat keuntungan harian, mingguan, bulanan, margin profit, dan grafik pertumbuhan.",
    },
    {
      icon: IconReportAnalytics,
      title: "Prediksi Balik Modal (BEP)",
      description: "AI memprediksi berapa unit yang perlu dijual dan berapa hari sampai balik modal.",
    },
    {
      icon: IconMessageChatbot,
      title: "AI Advisor untuk UMKM",
      description: "Tanyakan apa saja seperti harga jual ideal, keamanan modal, atau cara meningkatkan profit.",
    },
  ]

  return (
    <section id="features" className="relative py-20 lg:py-10 overflow-hidden">
      {/* Background with grid pattern - matching hero section style */}
      <div className="absolute inset-0 bg-white">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-medium px-4 py-1.5 rounded-full text-sm mb-4">
            <IconSparkles className="w-4 h-4" />
            Kenapa FinSight?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Financial Insight untuk UMKM
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insight keuangan yang biasanya hanya dimiliki bisnis besar, sekarang bisa dinikmati UMKM dengan cara
            sederhana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Left accent border on hover */}
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-transparent group-hover:bg-blue-600 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with background */}
                <div className="mb-5 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <feature.icon
                    className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors"
                    stroke={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{feature.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
