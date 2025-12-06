"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  IconArrowRight,
  IconPlayerPlay,
  IconSparkles,
  IconCheck,
  IconRocket,
  IconChartBar,
  IconCoin,
  IconBolt,
  IconCalculator,
  IconTrendingUp,
  IconReportMoney,
} from "@tabler/icons-react"

export function HeroSection() {
  const words = ["Lebih Pintar", "Lebih Cepat", "Lebih Jelas", "Lebih Aman"]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % words.length), 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Financial Insight for Smarter UMKM Decisions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Kelola Keuangan{" "}
              <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block text-blue-600"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              dengan AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              FinSight membantu kamu memahami alur modal, menghitung keuntungan, dan memprediksi kapan modal akan
              kembali. Dengan dukungan AI yang ringan dan gratis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-xl font-semibold">
                Mulai Gratis
                <IconArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-xl font-semibold border-2 bg-transparent"
              >
                <IconPlayerPlay className="w-4 h-4 mr-2" />
                Lihat Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600"
            >
              {["Tanpa Kartu Kredit", "AI Insight Gratis", "Bahasa Indonesia"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <IconCheck className="w-4 h-4 text-blue-600" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            {/* Decorative Floating Feature Cards */}
            {/* Top Right Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="absolute -top-8 -right-16 hidden lg:flex bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-4 border border-orange-100 cursor-pointer z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                  <IconBolt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Auto Insight</p>
                  <p className="text-xs text-gray-500">Analisis otomatis</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, x: 5 }}
              className="absolute top-1/3 -right-20 hidden lg:flex bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-4 border border-green-100 cursor-pointer z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <IconCalculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Hitung BEP</p>
                  <p className="text-xs text-gray-500">Prediksi balik modal</p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="absolute -bottom-6 -right-12 hidden lg:flex bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-lg p-4 border border-teal-100 cursor-pointer z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <IconReportMoney className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Laporan Otomatis</p>
                  <p className="text-xs text-gray-500">Grafik & ringkasan</p>
                </div>
              </div>
            </motion.div>

            {/* Left Side Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, x: -5 }}
              className="absolute top-1/2 -left-20 hidden lg:flex bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-lg p-4 border border-rose-100 cursor-pointer z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                  <IconTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Monitor Profit</p>
                  <p className="text-xs text-gray-500">Pantau keuntungan</p>
                </div>
              </div>
            </motion.div>

            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-500 text-center border">
                    finsight.id/dashboard
                  </div>
                </div>
              </div>

              {/* App Content */}
              <div className="p-6">
                <div className="flex gap-2 mb-5">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <IconChartBar className="w-3.5 h-3.5" />
                    Dashboard
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <IconCoin className="w-3.5 h-3.5" />
                    Tracking Modal
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <IconSparkles className="w-3.5 h-3.5" />
                    AI Advisor
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 p-4 border border-green-200"
                  >
                    <p className="text-xs text-green-600 mb-1">Keuntungan Bulan Ini</p>
                    <p className="text-2xl font-bold text-green-700">Rp 4.2jt</p>
                    <p className="text-xs text-green-500 mt-1">+12% dari bulan lalu</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-4 border border-blue-200"
                  >
                    <p className="text-xs text-blue-600 mb-1">Prediksi Balik Modal</p>
                    <p className="text-2xl font-bold text-blue-700">17 Hari</p>
                    <p className="text-xs text-blue-500 mt-1">Berdasarkan tren penjualan</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 bg-gray-50 rounded-xl p-4 border"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconSparkles className="w-3.5 h-3.5 text-blue-500" />
                    <p className="text-xs text-gray-500">AI Insight</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    "Keuntungan minggu ini naik 12% 🎉 Modal diprediksi kembali dalam 17 hari. Pertahankan momentum
                    penjualan!"
                  </p>
                </motion.div>
              </div>
            </div>

            {/* 1000+ UMKM Badge - Bottom Left of Browser */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{ scale: 1.08, y: 5 }}
              className="absolute -bottom-14 left-8 bg-white rounded-xl shadow-xl p-3 border-2 border-blue-100 cursor-pointer z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                  <IconRocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">1000+ UMKM</p>
                  <p className="text-xs text-gray-500">Sudah menggunakan</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
