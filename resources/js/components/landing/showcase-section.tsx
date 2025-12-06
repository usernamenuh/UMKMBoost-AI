"use client"

import { motion } from "framer-motion"
import { IconArrowRight, IconSparkles, IconChartBar, IconTrendingUp, IconReportMoney } from "@tabler/icons-react"

export function ShowcaseSection() {
  const showcaseItems = [
    {
      type: "insight",
      title: "AI Insight Otomatis",
      description: "FinSight memberikan insight keuangan secara real-time",
      insights: [
        { text: "Keuntungan minggu ini naik 12% 🎉", type: "success" },
        { text: "Modal diprediksi kembali dalam 17 hari", type: "info" },
        { text: "Pengeluaran operasional tinggi, pertimbangkan optimasi", type: "warning" },
      ],
    },
    {
      type: "advisor",
      title: "AI Advisor untuk UMKM",
      description: "Tanyakan apa saja tentang keuangan bisnis kamu",
      questions: ["Harga jual ideal berapa ya?", "Modal saya aman nggak?", "Cara ningkatin profit?"],
    },
  ]

  const financialReports = [
    {
      title: "Laporan Keuntungan Harian",
      icon: IconChartBar,
      value: "Rp 850.000",
      change: "+15%",
    },
    {
      title: "Margin Profit",
      icon: IconTrendingUp,
      value: "35%",
      change: "+5%",
    },
    {
      title: "Prediksi BEP",
      icon: IconReportMoney,
      value: "17 Hari",
      change: "-3 hari",
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
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-100/20 rounded-full blur-3xl"
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
            Fitur Utama FinSight
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Insight Keuangan yang Powerful
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat bagaimana FinSight membantu kamu mengambil keputusan bisnis lebih pintar
          </p>
        </motion.div>

        {/* AI Insights & Advisor */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-900 mb-8 text-center"
          >
            Insight Otomatis & AI Advisor
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
                {item.type === "insight" ? (
                  <div className="space-y-3">
                    {item.insights?.map((insight, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-xl ${
                          insight.type === "success"
                            ? "bg-green-50 border border-green-100"
                            : insight.type === "warning"
                              ? "bg-orange-50 border border-orange-100"
                              : "bg-blue-50 border border-blue-100"
                        }`}
                      >
                        <IconSparkles
                          className={`w-5 h-5 mt-0.5 ${
                            insight.type === "success"
                              ? "text-green-600"
                              : insight.type === "warning"
                                ? "text-orange-600"
                                : "text-blue-600"
                          }`}
                        />
                        <p className="text-sm text-gray-700">{insight.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {item.questions?.map((question, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">?</span>
                        </div>
                        <p className="text-sm text-gray-700">"{question}"</p>
                        <IconArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financial Reports */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-900 mb-8 text-center"
          >
            Laporan Keuangan Otomatis
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {financialReports.map((report, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 group-hover:shadow-xl group-hover:shadow-blue-100/50 transition-all duration-300 bg-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <report.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{report.title}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-900">{report.value}</p>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {report.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
