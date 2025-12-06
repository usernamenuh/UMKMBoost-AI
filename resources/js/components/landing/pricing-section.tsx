"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "Gratis",
    description: "Cocok untuk UMKM yang mau coba dulu",
    icon: Zap,
    features: [
      "Tracking modal & pengeluaran dasar",
      "Hitung keuntungan harian",
      "AI Insight sederhana (3x/hari)",
      "Laporan keuangan mingguan",
      "1 bisnis/akun",
    ],
    highlighted: false,
    buttonText: "Mulai Gratis",
    buttonVariant: "outline" as const,
  },
  {
    name: "Basic",
    price: "Rp 99k",
    period: "/bulan",
    description: "Cocok untuk UMKM yang mulai serius kelola keuangan",
    icon: Sparkles,
    features: [
      "Semua fitur Free",
      "Tracking modal tanpa batas",
      "Prediksi Balik Modal (BEP) otomatis",
      "AI Advisor unlimited",
      "Grafik pertumbuhan profit",
      "Laporan harian, mingguan, bulanan",
      "Export laporan PDF",
      "3 bisnis/akun",
    ],
    highlighted: true,
    badge: "Paling Populer",
    buttonText: "Pilih Basic",
    buttonVariant: "primary" as const,
  },
  {
    name: "Premium",
    price: "Rp 249k",
    period: "/bulan",
    description: "Cocok untuk UMKM besar atau multi-bisnis",
    icon: Crown,
    features: [
      "Semua fitur Basic",
      "Analisis margin profit detail",
      "Prediksi penjualan AI",
      "Perbandingan antar periode",
      "Insight optimasi biaya",
      "Multi-user (tim bisnis)",
      "Unlimited bisnis/akun",
      "Akses prioritas fitur baru",
      "Support WhatsApp bisnis",
    ],
    highlighted: false,
    buttonText: "Pilih Premium",
    buttonVariant: "dark" as const,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-medium px-4 py-1.5 rounded-full text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Harga Spesial
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 text-balance">Pilih Paket yang Tepat</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Harga transparan tanpa biaya tersembunyi. Upgrade atau downgrade kapan saja.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, idx) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative flex flex-col h-full rounded-3xl transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 scale-[1.02] lg:scale-105 z-10"
                    : "bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xl"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${
                        plan.highlighted ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-neutral-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-neutral-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                          plan.highlighted ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span
                          className={`text-base font-medium ${plan.highlighted ? "text-blue-200" : "text-neutral-500"}`}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            plan.highlighted ? "bg-white/20" : "bg-green-100"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${plan.highlighted ? "text-white" : "text-green-600"}`}
                            strokeWidth={3}
                          />
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            plan.highlighted ? "text-blue-50" : "text-neutral-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                      plan.buttonVariant === "primary"
                        ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-900/20"
                        : plan.buttonVariant === "dark"
                          ? "bg-neutral-900 text-white hover:bg-neutral-800"
                          : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-500 text-sm mb-4">Dipercaya oleh 10,000+ UMKM di Indonesia</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-neutral-600">Pembayaran Aman</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-neutral-600">Batal Kapan Saja</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-neutral-600">Support 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
